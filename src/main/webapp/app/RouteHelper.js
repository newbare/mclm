Ext.define('MCLM.RouteHelper', {
	
	statics: {
		activeRouteLayer: null,
		dirty : false,
		vectorSource : null,
		vectorSourceMarker : null,
		vectorLayerMarker : null,
		startIcon : null,
		endIcon : null,
		lastEndPosition : null,
		swapped : false,
		routeAsWKT : null,
		
		clear : function() {
			MCLM.Map.removeLayerByName('routeLayer');
			MCLM.Map.removeLayerByName('routeMarker');
			this.activeRouteLayer = null;
			this.dirty = false;
			this.vectorSource = null;
			this.vectorSourceMarker = null;
			this.vectorLayerMarker = null;
			this.startIcon = null;
			this.endIcon = null;
			this.lastEndPosition = null;
			this.swapped = false;
			
			var routeResultStore = Ext.data.StoreManager.lookup('store.RouteResult');
			routeResultStore.load( [] );	
			
			MCLM.Map.bindMapToGetSourceAddress();
			
 		   $("#sourceAddrText").text( "Selecione o endereço de origem" );
		   $("#sourceValue").val( "0" );
		   $("#targetAddrText").text( "Selecione o endereço de destino" );
		   $("#targetValue").val( "0" );			
		},
		
	
		putStartIcon : function( center ) {
			if ( this.dirty ) return true;
			
			if ( this.startIcon ) this.vectorSourceMarker.removeFeature( this.startIcon );
			
			this.startIcon = new ol.Feature({
				geometry: new ol.geom.Point( center )
			});
			
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({
					anchor: [0.5, 35],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 0.75,
					src: 'img/start.png'
				}))
			});	
			
			this.startIcon.setStyle( iconStyle );
			this.vectorSourceMarker.addFeature(  this.startIcon );
			
		},

		putMiddleIcon : function( center ) {
			
			var middleIcon = new ol.Feature({
				geometry: new ol.geom.Point( center )
			});
			
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({
					anchor: [0.5, 35],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 0.75,
					src: 'img/middle.png'
				}))
			});	
			
			middleIcon.setStyle( iconStyle );
			this.vectorSourceMarker.addFeature( middleIcon );
			this.swapped = true;
		},
		
		
		putEndIcon : function( center ) {
			if ( this.endIcon ) this.vectorSourceMarker.removeFeature( this.endIcon );
			
			if ( !this.swapped ) {
				// Ja tem uma rota calculada e o usuario quer um novo destino.
				// Coloca o destino anterior como origem.
				if( this.dirty ) {
					MCLM.Map.getNearestRoads( this.lastEndPosition, 'S' );
					this.putMiddleIcon( this.lastEndPosition );
				}
			}
			this.lastEndPosition = center;
			
			this.endIcon = new ol.Feature({
				geometry: new ol.geom.Point( center )
			});
			
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({
					anchor: [0.5, 35],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 0.75,
					src: 'img/end.png'
				}))
			});	
			
			this.endIcon.setStyle( iconStyle );
			this.vectorSourceMarker.addFeature( this.endIcon );
		},
		
		
		loadRoute : function( route, completeGeometry ) {
			var myMls = new ol.geom.MultiLineString( completeGeometry.coordinates );
			var format =  new ol.format.WKT();
			this.routeAsWKT = format.writeGeometry ( myMls );

	    	var features = new ol.format.GeoJSON().readFeatures( route , {
	    	    featureProjection: 'EPSG:3857'
	    	});	
	    	
	    	for (var i = 0; i < features.length; i++) {
	    		this.vectorSource.addFeature( features[i] );
	    	}
	    	
	    	this.dirty = true;
	    	this.swapped = false;
		},
		
		init : function() {
			var me = this;
			
			this.dirty = false;
			this.vectorSource = new ol.source.Vector();
			
	    	
			var customStyleFunction = function( feature, resolution ) {
				
				var featureGeomType = feature.getGeometry().getType();
				var props = feature.getProperties();
				var resultStyles = [];

				
		    	var routeStyle = new ol.style.Style({
		    		stroke: new ol.style.Stroke({
		    			color: 'red',
		    			width: 3
		    		})
		    	});	
		    	resultStyles.push( routeStyle );
		    	
		    	var pointStyle = new ol.style.Style({
					image: new ol.style.Icon(({
						scale : 0.6,
						anchor: [0.5, 35],
						anchorXUnits: 'fraction',
						anchorYUnits: 'pixels',
						opacity: 0.75,
						src: 'img/police-pin.png'
					}))
		    	});	    	
		    	resultStyles.push( pointStyle );
				
				return resultStyles;
			};
			
			this.activeRouteLayer = new ol.layer.Vector({
				source: this.vectorSource,
				style: customStyleFunction
			});			
			
			
			this.activeRouteLayer.set('name', 'routeLayer');
			this.activeRouteLayer.set('alias', 'routeLayer');
			this.activeRouteLayer.set('serialId', 'routeLayer');
			this.activeRouteLayer.set('baseLayer', false);
			this.activeRouteLayer.set('ready', true);
			
			MCLM.Map.removeLayerByName('routeLayer');
			MCLM.Map.map.addLayer( this.activeRouteLayer );
			
			
			// Camada para os marcadores
			this.vectorSourceMarker = new ol.source.Vector({});
			this.vectorLayerMarker = new ol.layer.Vector({
	            source : this.vectorSourceMarker
	        });
			this.vectorLayerMarker.set('name', 'routeMarker' );
			this.vectorLayerMarker.set('alias', 'routeMarker' );
			this.vectorLayerMarker.set('serialId', 'routeMarker' );
			this.vectorLayerMarker.set('baseLayer', false );
			this.vectorLayerMarker.set('ready', true );
			MCLM.Map.map.addLayer( this.vectorLayerMarker );			
		    				
		},
		
	    locatePois : function( button ) {
	    	var me = MCLM.RouteHelper;
	    	var featureId = button.id;
	    	
	    	if ( !button.pressed ) {
	    		// remove camada
	    	} else {
	    		
	    		if ( !me.routeAsWKT ) return true;
	    		
	    		Ext.Ajax.request({
	    		       url: 'getPointsNearRoute',
	    		       params: {
	    		           'route': me.routeAsWKT,
	    		       },       
	    		       success: function(response, opts) {
	    		    	   var respText = Ext.decode(response.responseText);
	    		    	   
	    		    	   var features = new ol.format.GeoJSON().readFeatures( respText , {
	    			    	    featureProjection: 'EPSG:3857'
	    		    	   });	
	    			    	
	    		    	   for (var i = 0; i < features.length; i++) {
	    		    		   features[i].set("featureId", featureId );
	    		    		   me.vectorSource.addFeature( features[i] );
	    		    	   }	    		    	   
	    		    	   
	    		       },
	    		       failure: function(response, opts) {
	    		    	   Ext.Msg.alert('Erro','Erro ao calcular a rota.' );
	    		       }
	    		});	    		
	    		
	    	}
	    },		

		getAsJson : function() {
			var geojson  = new ol.format.GeoJSON();
		    var features = this.vectorSource.getFeatures();
		    var jsonData = geojson.writeFeatures( features,{
                featureProjection: ol.proj.get('EPSG:3857'),
                dataProjection: ol.proj.get('EPSG:4326')
            });
		    return jsonData;
		}

		
	}

});