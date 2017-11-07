Ext.define("MCLM.view.ships.ShipsHelper", {
    xtype: 'shipsHelper',
    id: 'shipsHelper',
    
    mapLayerGeoCode: null,
    vectorSourceMarker: null,
    vectorLayerMarker: null,
    vectorSource : null,
    activeShipsLayer : null,

    init: function () {
    	
    	this.vectorSource = new ol.source.Vector();
    	var me = this;
    	
    	var customStyleFunction = function( feature, resolution ) {
    		var props = feature.getProperties();
    		
    		var bearing = props.direcao;//props.course;
    		//var shipName = props.shipName;
    		//var speed = props.speed;
    		//var imo = props.imo;
    		var resultStyles = [];
    		
        	var shipsStyle = new ol.style.Style({
    			image: new ol.style.Icon(({
    				scale : 0.6,
    				anchor: [0.5, 0.5],
    				rotation : bearing * 0.01745329251,
    				anchorXUnits: 'fraction',
    				anchorYUnits: 'fraction',
    				opacity: 1.0,
    				src: 'img/ship.png'
    			}))/*,
			      text: new ol.style.Text({
			          font: '10px Consolas',
			          textAlign: 'center',
			          scale : 0.8,
			          offsetX: 0,
			          offsetY: 15,
			          textBaseline: 'middle',
			          fill: new ol.style.Fill({ color: '#000' }),
			          stroke: new ol.style.Stroke({
			            color: '#FFFFFF', width: 1
			          }),
			          text: shipName,
			        })*/    			
        	});	 
        	
        	resultStyles.push( shipsStyle );
        	return resultStyles;
    	}
    	
	    	
    	
    	this.activeShipsLayer = new ol.layer.Vector({
			source: this.vectorSource,
			style: customStyleFunction
		});			
		
    	this.activeShipsLayer.set('name', 'shipsLayer');
    	this.activeShipsLayer.set('alias', 'shipsLayer');
    	this.activeShipsLayer.set('layerType', 'FEI');
    	this.activeShipsLayer.set('serialId', 'shipsLayer');
    	this.activeShipsLayer.set('baseLayer', false);
    	this.activeShipsLayer.set('ready', true);  
		
		MCLM.Map.removeLayerByName('shipsLayer');
		MCLM.Map.map.addLayer( this.activeShipsLayer );			

    },

    deleteShips : function() {
    	var features = this.vectorSource.getFeatures();
    	for ( x=0; x < features.length; x++ ) {
    		var feature = features[x];
   			this.vectorSource.removeFeature( feature );
    	}
    },	
	
	getShips : function() {
		var me = this;
		
		Ext.Ajax.request({
            //url: 'aisGetShips',
            url: 'getVessel',
            failure: function (response, opts) {
            	//me.deleteShips();
            	
            },
            success: function (response, opts) {
            	var result = Ext.decode(response.responseText);
            	
            	/* 
            		COLOCADO PARA MINHA SIMULACAO
            	*/
            	var feicao = {};
            	feicao["type"] = "FeatureCollection";
            	var features = [];
            	
        		var properties = {};
        		var feature = {};
        		var coordinates = [];
        		
       			properties["latitude"] = result.latitude;
       			properties["longitude"] = result.longitude;
       			properties["velocidade"] = result.speed;
       			properties["direcao"] = result.heading;        		
       			properties["targetAzimuth"] = result.targetAzimuth;
       			properties["rudder"] = result.rudder;

       			
       			$("#imgCompass").css('transform','rotate(' + result.heading + 'deg)');
       			var position = [result.latitude, result.longitude];
       			var coord = ol.coordinate.toStringHDMS( position );
       			$("#shipPosition").text( coord );
       			
       			$("#shipRudder").text( "Leme: " + result.rudder + " º" );
       			
       			
    			coordinates[1] = result.latitude; 
    			coordinates[0] = result.longitude;
       			
        		var geometry = {};
        		geometry["type"] = "Point";
        		geometry["coordinates"] = coordinates;       			
       			
        		feature["geometry"] = geometry;
        		feature["type"] = "Feature";
        		feature["properties"] = properties;            			
    			
    			features.push( feature );       			
       			
    			feicao["features"] = features;
    			
            	var respObj = feicao;
            	// =========================================
            	
            	//var respObj = result;
            	
            	console.log( respObj );
            	
				var features = new ol.format.GeoJSON().readFeatures( respObj , {
					//featureProjection: 'EPSG:3857'
				});
				
				me.deleteShips();
				
				for (var i = 0; i < features.length; i++) {
					me.vectorSource.addFeature( features[i] );
				}
				
		    	   
            }
        });
		
		
	} 


});