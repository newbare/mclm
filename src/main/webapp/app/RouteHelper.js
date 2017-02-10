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
		
		
		loadRoute : function( route ) {
	    	var features = new ol.format.GeoJSON().readFeatures( route , {
	    	    featureProjection: 'EPSG:3857'
	    	});	
	    	
	    	for (var i = 0; i < features.length; i++) {
	    		//console.log( features[i] );
	    		this.vectorSource.addFeature( features[i] );
	    	}
	    	
	    	this.dirty = true;
	    	this.swapped = false;
		},
		
		init : function() {
			var me = this;
			
			this.dirty = false;
			this.vectorSource = new ol.source.Vector();
			
	    	var routeStyle = new ol.style.Style({
	    		stroke: new ol.style.Stroke({
	    			color: 'red',
	    			width: 3
	    		})
	    	});
			
			this.activeRouteLayer = new ol.layer.Vector({
				source: this.vectorSource,
				style: routeStyle
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