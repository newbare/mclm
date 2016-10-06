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
var landLayer = null;

var mainConfig = null;

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

/*
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
*/


function unbindMapClick() {
	if ( onClickBindKey ) {
		map.unByKey( onClickBindKey );
	}
}

function updateMapCenter() {
	var center = map.getView().getCenter();
	var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
	mapCenterLong = center2[0];
	mapCenterLat = center2[1];
	mapZoom = map.getView().getZoom();
}

/* 
 * Cria o mapa no painel central baseado nas configuracoes recebidas pelo ajax do arquivo index.html.
 * 
 * {	
 * 		"baseLayer":"osm:AA_OpenStreetMap","proxyPassword":"senha","useProxy":true,"externalWorkspaceName":"external",
 * 		"proxyHost":"proxy-i2a.mb","proxyPort":6060,"nonProxyHosts":"localhost|127.0.0.1|10.5.115.22|172.21.81.43|10.5.115.122",
 * 		"idConfig":1,"geoserverPassword":"senha","externalLayersToLocalServer":false,"proxyUser":"user",
 * 		"geoserverUrl":"http://10.5.115.122/geoserver","geoserverUser":"admin"
 * }
 *  
 */

function loadMap(container, config ) {
	mainConfig = config;

	geoserverUrl = config.geoserverUrl;
	baseLayer = config.baseLayer;
	
	// Deveria vir pelo cenario ativo do usuário...
	mapZoom = 4; 
	mapCenter = "-24.9609375,-20.303417518489297";
	graticuleStatus = false;
	// =======================================

	
	arrayMapCenter = JSON.parse("[" + mapCenter + "]");

	landLayer = new ol.layer.Tile({
	    source: new ol.source.TileWMS({
	        url: geoserverUrl,
	        isBaseLayer : true,
	        params: {
	            'LAYERS': baseLayer,
	            'FORMAT': 'image/png'
	        }
	    })
	});	
	
	bindTileEvent( landLayer );

	theView = new ol.View({
		center: ol.proj.transform(arrayMapCenter, 'EPSG:4326', 'EPSG:3857'),
		zoom: mapZoom
	})
	
	map = new ol.Map({
		layers: [ landLayer ],
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
               }
           })
        
		]),
		view: theView,
		crossOrigin: ''
	});
	
	map.getView().on('propertychange', function(e) {
		switch (e.key) {  
			case 'center':
				updateMapCenter();
				break;
			case 'resolution':  
				updateMapCenter();
				break;  
		}
	});	
	
	/*
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
			//$("#" + layerId).css("display","block");
			//$("#" + layerId + "2").css("display","none");
			showMainLoader();
		});
	
		layer.getSource().on('tileloadend', function(event) {
			//console.log("tile '"+layerName+"' load end");
			//$("#" + layerId).css("display","none");
			//$("#" + layerId + "2").css("display","none");
			hideMainLoader();
		});
		
		layer.getSource().on('tileloaderror', function(event) {
			//$("#" + layerId).css("display","none");
			//$("#" + layerId + "2").css("display","block");
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

