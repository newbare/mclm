var map = null;
var mousePosition = null;
var radius = 75;
var selectedLayer = null;
var lupaLayer = null;
var theView = null;
var theMiniView = null;
var onClickBindKey = null;
var startPoint = new ol.Feature();
var destPoint = new ol.Feature();
var mapPreviewLayer = null;
var graticuleEnabled = false;
var arrayMapCenter = null;
var mapZoom = 5;
var mapCenterLat = 0;
var mapCenterLong = 0;	


// Interactions
var dragRotateAndZoomInteraction = null;
var dragPanInteraction = null;
var mouseWheelZoomInteraction = null;

// Controls
var overviewMap = new ol.control.OverviewMap({collapsed: true});

var graticule = new ol.Graticule({
	strokeStyle: new ol.style.Stroke({
		color: 'rgba(255,120,0,0.9)',
		width: 1.5,
		lineDash: [0.5, 4]
	})
});


var params = {
		LAYERS: 'osm:pgrouting',
		FORMAT: 'image/png'
};

var geoserverUrl = '';

function panTo( lat, lon ) {
	// panTo(-0.12755, 51.507222); ( Londres )
	var coordinate = ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
	var pan = ol.animation.pan({
		duration: 2000,
		source: ( theView.getCenter() )
	});
	map.beforeRender(pan);
	theView.setCenter( coordinate );	
}


function unbindMapClick() {
	if ( onClickBindKey ) {
		clearRoutingLayer();
		removeMapillaryLayer();
		map.unByKey( onClickBindKey );
		$("#clearRouting").css("display","none");
	}
}

function updateMapCenter() {
	var center = map.getView().getCenter();
	var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
	
	mapCenterLong = center2[0];
	mapCenterLat = center2[1];
	
	mapZoom = map.getView().getZoom();
}

function loadMap(container, geoserver, baseLayer, theMapZoom, mapCenter, graticuleStatus ) {
	geoserverUrl = geoserver;
	mapZoom = theMapZoom;
	
	arrayMapCenter = JSON.parse("[" + mapCenter + "]");

	// *********************************************
	var landLayer = new ol.layer.Tile({
	    source: new ol.source.TileWMS({
	        url: geoserverUrl,
	        isBaseLayer : true,
	        params: {
	            'LAYERS': baseLayer,
	            'FORMAT': 'image/png'
	        }
	    })
	});	
	
	console.log(landLayer);
	
	bindTileEvent( landLayer );

	//***********************************************
	
	var routesLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [startPoint, destPoint]
		})
	});
	
	
	
	//************************************************
    
	theView = new ol.View({
		center: ol.proj.transform(arrayMapCenter, 'EPSG:4326', 'EPSG:3857'),
		zoom: mapZoom
	})
	
	map = new ol.Map({
		layers: [ landLayer, routesLayer ],
		target: container,
		renderer: 'canvas',
	    loadTilesWhileAnimating: true,
	    loadTilesWhileInteracting: true,	
		controls: ol.control.defaults().extend([
		   new ol.control.ScaleLine(),
		   new ol.control.ZoomSlider(),
           new ol.control.MousePosition({
               undefinedHTML: '',
               projection: 'EPSG:4326',
               coordinateFormat: function(coordinate) {
            	   var coord = ol.coordinate.toStringHDMS( coordinate );
            	   $("#pointerCoordinates").text( coord );
            	   return coord;
                   //return ol.coordinate.format(coordinate, '{y}, {x}', 4);
               }
           })
        
		]),
		view: theView
	});
	
	
	/*
	map.getView().on('propertychange', function(e) {
		switch (e.key) {  
			case 'center':
				updateMapCenter();
				break;
			case 'resolution':  
				updateMapCenter();
				updateMapillary();
				break;  
		}
	});	
	
	if ( graticuleStatus == 'true' ) {
		graticule.setMap( map );
		graticuleEnabled = true;
	} else {
		graticule.setMap( null );
		graticuleEnabled = false;
	}
	
	//map.addControl( overviewMap );
	*/
	
}

function bindTileEvent( layer ) {
	var layerName =  layer.get('name');
	if ( layerName ) {
		var layerId = removeBlanks( layerName );
		
		layer.getSource().on('tileloadstart', function(event) {
			//console.log("tile '"+layerName+"' load start");
			$("#" + layerId).css("display","block");
			$("#" + layerId + "2").css("display","none");
			showMainLoader();
		});
	
		layer.getSource().on('tileloadend', function(event) {
			//console.log("tile '"+layerName+"' load end");
			$("#" + layerId).css("display","none");
			$("#" + layerId + "2").css("display","none");
			hideMainLoader();
		});
		
		layer.getSource().on('tileloaderror', function(event) {
			$("#" + layerId).css("display","none");
			$("#" + layerId + "2").css("display","block");
			hideMainLoader();
		});
	}

}

function showMainLoader() {
	
}

function hideMainLoader() {
	
}


function addLayer( serverUrl, serverLayers, layerName ) {
	
	var newLayer = new ol.layer.Tile({
	    source: new ol.source.TileWMS({
	        url: serverUrl,
	        isBaseLayer : false,
	        params: {
	            'layers': serverLayers,
	            'format': 'image/png'
	        },
	        projection: ol.proj.get('EPSG:4326')
	    })
	});	
	newLayer.set('name', layerName);
		
	bindTileEvent( newLayer );
	map.addLayer( newLayer );

	//Ext.Msg.alert('Acionar Camada', 'Camada "' + layerName + '" adicionada ao mapa.' );	
	
	return newLayer;
}

function removeLayer( layerName ) {
	var achou = false;
	map.getLayers().forEach(function (lyr) {
		if( lyr.U.name == layerName ) {
			map.removeLayer( lyr );	
		}
	});
	
	//Ext.Msg.alert('Acionar Camada', 'Camada "' + layerName + '" removida do mapa.' );
}


function removeBlanks( value ) {
	var res = value.split(' ').join('_');
	return res;
}

