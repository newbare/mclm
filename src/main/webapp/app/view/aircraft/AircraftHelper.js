Ext.define("MCLM.view.aircraft.AircraftHelper", {
    xtype: 'aircraftHelper',
    id: 'aircraftHelper',
    
    mapLayerGeoCode: null,
    vectorSourceMarker: null,
    vectorLayerMarker: null,
    getAircraftsUrl: 'getAircraftsInBBOX',
    vectorSource : null,
    activeAircraftLayer : null,

    stringDivider : function( str, width, spaceReplacer ) {
        if (str.length > width) {
            var p = width;
            while (p > 0 && (str[p] != ' ' && str[p] != '-')) {
              p--;
            }
            if (p > 0) {
              var left;
              if (str.substring(p, p + 1) == '-') {
                left = str.substring(0, p + 1);
              } else {
                left = str.substring(0, p);
              }
              var right = str.substring(p + 1);
              return left + spaceReplacer + this.stringDivider(right, width, spaceReplacer);
            }
          }
          return str;    	
    },
    
    init: function () {
    	
    	this.vectorSource = new ol.source.Vector();
    	var me = this;
    	
    	var customStyleFunction = function( feature, resolution ) {
    		var props = feature.getProperties();
    		var bearing = props.bearing * 0.01745329251 ;
    		var callSign = props.callSign;
    		var flightNumber = props.flightNumber;
    		var resultStyles = [];
    		
    		var fData = me.stringDivider(callSign + " " + flightNumber, 7, '\n');
    		
        	var aircraftStyle = new ol.style.Style({
    			image: new ol.style.Icon(({
    				scale : 1,
    				anchor: [0.5, 0.5],
    				rotation : bearing,
    				anchorXUnits: 'fraction',
    				anchorYUnits: 'fraction',
    				opacity: 1.0,
    				src: 'img/aeroplane.png'
    			})),
			      text: new ol.style.Text({
			          font: '10px Calibri,sans-serif',
			          textAlign: 'center',
			          offsetX: 0,
			          offsetY: 25,
			          textBaseline: 'middle',
			          fill: new ol.style.Fill({ color: '#f20b07' }),
			          stroke: new ol.style.Stroke({
			            color: '#FFFFFF', width: 7
			          }),
			          text: fData,
			        })    			
        	});	 
        	
        	
        	
        	resultStyles.push( aircraftStyle );
        	return resultStyles;
    	}
    	
	    	
    	
    	this.activeAircraftLayer = new ol.layer.Vector({
			source: this.vectorSource,
			style: customStyleFunction
		});			
		
    	this.activeAircraftLayer.set('name', 'aircraftLayer');
    	this.activeAircraftLayer.set('alias', 'aircraftLayer');
    	this.activeAircraftLayer.set('serialId', 'aircraftLayer');
    	this.activeAircraftLayer.set('baseLayer', false);
    	this.activeAircraftLayer.set('ready', true);  
		
		MCLM.Map.removeLayerByName('aircraftLayer');
		MCLM.Map.map.addLayer( this.activeAircraftLayer );			

    },

    showAircraftDetails : function( aircraft ) {
    	var aircraftDataWindow = Ext.getCmp('aircraftDataWindow');
    	if ( !aircraftDataWindow ) {
    		aircraftDataWindow = Ext.create('MCLM.view.aircraft.AircraftDataWindow');
    	}
    	aircraftDataWindow.show();
    	
    	var acId = aircraft.id;
    	var acCallSign = aircraft.callSign;
    	
    	aircraftDataWindow.setTitle("Dados da Aeronave " + acCallSign);
    	
    	aircraftDataWindow.update( acId + " " + acCallSign );
    	console.log( aircraft );
    },
    
	inspectFeature : function( pixel ) {
        var features = [];
        MCLM.Map.map.forEachFeatureAtPixel( pixel, function(feature, layer) {
        	features.push(feature);
        });
        
        console.log( features );
        
        if( features.length > 0 ) {
        	
        }
        
	},
	
    deleteAircrafts : function() {
    	var features = this.vectorSource.getFeatures();
    	for ( x=0; x < features.length; x++ ) {
    		var feature = features[x];
   			this.vectorSource.removeFeature( feature );
    	}
    },	
	
	getAircraftsBbox : function() {
		var me = this;
		
		var bbox = MCLM.Map.getMapCurrentBbox();
		var coord = bbox.split(",");
		
		var maxlon = coord[3];
		var minlon = coord[1];

		var minlat = coord[2];
		var maxlat = coord[0];			
		
        Ext.Ajax.request({
            url: 'getAircraftsInBBOX',
            params: {
                'minlon': minlon,
                'minlat': minlat,
                'maxlon': maxlon,
                'maxlat': maxlat,
            },
            failure: function (response, opts) {
            	me.deleteAircrafts();
            },
            success: function (response, opts) {
            	var respObj = Ext.decode(response.responseText);
            	
            	var feicao = {};
            	feicao["type"] = "FeatureCollection";
            	var features = [];
            	
            	for( var key in respObj ) {
            		var properties = {};
            		var feature = {};
            		var coordinates = [];
            		
            		var obj = respObj[key];
            		if ( Array.isArray( obj ) ) {
            			coordinates[0] = obj[ 2 ]; // -45 
            			coordinates[1] = obj[ 1 ]; // -20
            			
            			properties["id"] = key;
            			properties["bearing"] = obj[3];
            			
            			properties["flightNumber"] = obj[13];
            			properties["callSign"] = obj[16];

                		var geometry = {};
                		geometry["type"] = "Point";
                		geometry["coordinates"] = coordinates;
                		
                		feature["geometry"] = geometry;
                		feature["type"] = "Feature";
                		feature["properties"] = properties;            			
            			
            			features.push( feature );
            		}

            	}
            	
            	feicao["features"] = features;
            	
            	//console.log( feicao );
				var features = new ol.format.GeoJSON().readFeatures( feicao , {
					featureProjection: 'EPSG:3857'
				});
				
				me.deleteAircrafts();
				
				for (var i = 0; i < features.length; i++) {
					me.vectorSource.addFeature( features[i] );
				}
		    	   
            	/*	
				var point = new ol.geom.Point( center );
				var feature = new ol.Feature({
					geometry: point,
				});
				   
				props.geometry = feature.getProperties().geometry;
				feature.setProperties( props );
				feature.set("featureId", "P_" + featureId );
				   
				this.poiSource.addFeature( feature );	            	
				*/
            	
            }
        });
		
		
	} 


});