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
var openSeaMapLayer = null;

var mainConfig = null;
var geoserverUrl = '';

// Interactions
var dragRotateAndZoomInteraction = null;
var dragPanInteraction = null;
var mouseWheelZoomInteraction = null;

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
	
	// Atualiza sempre que arrasta ou muda o zoom, mas gasta muito acesso a rede e deixa mais lento.
	// Optei por deixar o usuario atualizar pelo botao "atualizar" no painel de camadas ativas.
	//mountImagePreview();
}

/* loadMap()
 * ---------
 * Cria o mapa no painel central baseado nas configuracoes recebidas pelo ajax do arquivo index.html.
 */
function loadMap(container, config ) {
	mainConfig = config;

	geoserverUrl = config.geoserverUrl;
	baseLayer = config.baseLayer;
	mapZoom = config.mapZoom; 
	mapCenter = config.mapCenter;

	arrayMapCenter = JSON.parse("[" + mapCenter + "]");

	openSeaMapLayer = new ol.layer.Tile({
		  source: new ol.source.OSM({
		    crossOrigin: null,
		    url: 'http://t1.openseamap.org/seamark/{z}/{x}/{y}.png'
		})
	});
	openSeaMapLayer.set('name', 'OpenSeaMap');
	openSeaMapLayer.set('alias', 'OpenSeaMap');
	openSeaMapLayer.set('serverUrl', '' );
	openSeaMapLayer.set('serialId', 'mclm_openseamap_cmoa');
	openSeaMapLayer.set('ready', true);
	
	// O Layer-base
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
	landLayer.set('name', baseLayer );
	landLayer.set('alias', 'Camada Base' );
	landLayer.set('serverUrl', geoserverUrl );
	landLayer.set('serialId', 'mclm_landlayer_cmoa');
	landLayer.set('ready', false);
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
		view: theView
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
	
	// Algumas vezes o OpenLayers nao dispara o evento "tileloadend" e o icone "loading" fica 
	// na tela ate mexer no mapa denovo. Isso ira remover todos os icones "loading"
	// apos 15 segundos. 
	// setInterval( function(){ $(".alert-icon").css("display","none"); }, 15000);
}

function bindTileEvent( layer ) {
	var serialId =  layer.get('serialId');
	if ( serialId ) {
		
		layer.getSource().on('tileloadstart', function(event) {
			console.log("tile '"+serialId+"' load start");
			$("#alert_" + serialId).css("display","block");
			$("#error_" + serialId).css("display","none");
			layer.set('ready', false);
			showMainLoader();
		});
	
		// Tile Carregado. Temos ao menos alguma coisa da camada.
		// Oculta os icones de alerta e loading. 
		layer.getSource().on('tileloadend', function(event) {
			console.log("tile '"+serialId+"' load end");
			$("#alert_" + serialId).css("display","none");
			$("#error_" + serialId).css("display","none");
			layer.set('ready', true);
			hideMainLoader();
		});
		
		layer.getSource().on('tileloaderror', function(event) {
			console.log("tile '"+serialId+"' load error");
			$("#alert_" + serialId).css("display","none");
			$("#error_" + serialId).css("display","block");
			layer.set('ready', false);
			hideMainLoader();
		});
	}

}

function showMainLoader() {
	
}

function hideMainLoader() {
	
}


function removeInvalidIdChar( value ) {
	var res = value.split(':').join('_');
	return res;
}

// Adiciona uma nova camada no mapa
function addLayer( serverUrl, serverLayers, layerName, serialId ) {
	var newLayer = new ol.layer.Tile({
	    source: new ol.source.TileWMS({
	        url: serverUrl,
	        isBaseLayer : false,
	        params: {
	        	tiled: true,
	            'layers': serverLayers,
	            'VERSION': '1.3.0',
	            'format': 'image/png'
	        },
	        projection: ol.proj.get('EPSG:4326')
	    })
	});	
	newLayer.set('alias', layerName);
	newLayer.set('name', serverLayers);
	newLayer.set('serverUrl', serverUrl);
	newLayer.set('serialId', serialId);
	newLayer.set('ready', false);
	
	bindTileEvent( newLayer );
	map.addLayer( newLayer );

	return newLayer;
}

function isLayerEnabled( layerName ) {
	// lyr.U.name || lyr.U.alias || lyr.U.serverUrl
	var achou = false;
	map.getLayers().forEach(function (lyr) {
		if( lyr.U.name == layerName ) {
			achou = true;
		}
	});
	return achou;
}

function toggleMapGrid() {
	if ( graticuleEnabled ) {
		graticule.setMap( null );
		graticuleEnabled = false;
	} else {
		graticule.setMap( map );
		graticuleEnabled = true;
	}	
}

function removeLayer( layerAlias ) {
	map.getLayers().forEach(function (lyr) {
		if( lyr.U.alias == layerAlias ) {
			map.removeLayer( lyr );	
			return;
		}
	});
}

function removeBlanks( value ) {
	var res = value.split(' ').join('_');
	return res;
}

// Liga/ Desliga o mapa do OpenSeaMap
function toggleSeaMapLayer() {
	if ( isLayerEnabled('OpenSeaMap') ) {
		removeLayer( 'OpenSeaMap' );
	} else {
		map.addLayer( openSeaMapLayer );	
	}
}


// Busca o indice de uma camada no mapa dado o seu nome
function indexOf(layers, layer) {
	var length = layers.getLength();
	for (var i = 0; i < length; i++) {
		var testLayer = layers.item( i );
		
		if ( layer === testLayer ) {
			return i;
		}
	}
	return -1;
}

// Retorna uma camada do mapa dado o seu nome
function findByName(name) {
	var layers = map.getLayers();
	var length = layers.getLength();
	for (var i = 0; i < length; i++) {
		var layerName = layers.item(i).get('name');
		if (name === layerName) {
			return layers.item(i);
		}
	}
	return null;
}

function selectLayer( layerName ) {
	selectedLayer = findByName( layerName );
}

function getSelectedLayerOpacity() {
	if ( selectedLayer ) {
		return selectedLayer.getOpacity();
	} else {
		return 0;
	}
}

function setSelectedLayerOpacity( opacity ) {
	if ( selectedLayer ) {
		selectedLayer.setOpacity( opacity );
	} 
}

function setNewIndex( layerName , newIndex ) {
	var layer = findByName( layerName );
	var layers = map.getLayers();
	var length = layers.getLength();
	var index = indexOf(layers, layer);
	//newIndex = length - newIndex;
    var layer = map.getLayers().removeAt( index );
    map.getLayers().insertAt( newIndex, layer );	
}

// Retorna o bounding box atual do mapa
function getMapCurrentBbox() {
	var extent = map.getView().calculateExtent( map.getSize() );
	
    var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft( extent ),
    	      'EPSG:3857', 'EPSG:4326');
    var topRight = ol.proj.transform(ol.extent.getTopRight( extent ),
    	      'EPSG:3857', 'EPSG:4326');
	return bottomLeft + "," + topRight;
}

// Retorna a URL para pegar a imagem PNG de uma camada 'layerName' do servidor 'serviceUrl'
// Usa o BBOX atual da viewport do mapa
function getLayerImagePreview( layerName, serviceUrl) {
	var	bbox = getMapCurrentBbox();
	var thumImg = serviceUrl + "/?service=WMS&srs=EPSG:4326&width=238&height=150&version=1.3&transparent=true&request=GetMap&layers="+layerName+"&format=image/png&bbox="+bbox;
	return thumImg;
}

//Retorna a URL para pegar a imagem PNG da legenda de uma camada 'layerName' do servidor 'serviceUrl'
function getLayerLegendImage( layerName, serviceUrl ) {
	var url = serviceUrl + "/?service=WMS&version=1.3&request=GetLegendGraphic&format=image/png&layer=" + layerName;
	return url;
}

function getCurrentLayersInMap() {
	listLayers();
	return map.getLayers();
}


// Apenas para debug. Apagar assim que possível.
function listLayers() {
	var layers = map.getLayers();
	var length = layers.getLength();
	console.log("CAMADAS EXISTENTES NO MAPA: -----------------------");
	for (var i = 0; i < length; i++) {
		var layerName = layers.item(i).get('name');
		var serverUrl = layers.item(i).get('serverUrl');
		var serialId = layers.item(i).get('serialId');
		console.log("   > [" + i + "] " + layerName + "   " + serverUrl + "   " + serialId);
	}
	console.log("---------------------------------------------------");
}



