Ext.define('MCLM.view.addlayer.wms.CapabilitiesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.capabilities',
    	
    listen : {
        controller : {
            '*' : { createMap : 'createMap' }
        }
    },     
    
    // ---------------------------------------------------------------------------------------------------------------
    createMap : function ( record ) {
    	
    	var layerPreviewMap = Ext.getCmp('layerPreviewMap');
    	var container = layerPreviewMap.body.dom.id;

    	var config = MCLM.Globals.config;
		var geoserverUrl = config.geoserverUrl;
		var baseLayerName = config.baseLayer;    	
    	
    	
    	var previewView = new ol.View({
            center: ol.proj.transform([-55.37109375,-17.39257927105777], 'EPSG:4326', 'EPSG:3857'),
            zoom: 3
        })	
    	
    	var previewLandLayer = new ol.layer.Tile({
    	    source: new ol.source.TileWMS({
    	        url: geoserverUrl,
    	        params: {
    	            'LAYERS': baseLayerName, 
    	            'FORMAT': 'image/png'
    	        }
    	    })
    	});			
    	
    	mapLayerPreview = new ol.Map({
    	    target: 'previewLayerMap',
    	    layers: [ previewLandLayer ],
    	    view: previewView
    	    
    	});	
    },
    // ---------------------------------------------------------------------------------------------------------------
    // Adiciona a camada selecionada no mapa na tela de preview
    addLayerToPreviewPanel : function ( serverUrl, serverLayers ) {
    	removeLayerFromPreviewPanel();
    	
    	var newLayer = new ol.layer.Tile({
    	    source: new ol.source.TileWMS({
    	        url: serverUrl,
    	        isBaseLayer : false,
    	        params: {
    	        	tiled: true,
    	            'layers': serverLayers,
    	            'VERSION': '1.1.1', 
    	            'format': 'image/png'
    	        },
    	        projection: ol.proj.get('EPSG:4326')
    	    })
    	});	
    	newLayer.set('name', 'preview_layer');
    	
    	mapLayerPreview.addLayer( newLayer );
    },
    // ---------------------------------------------------------------------------------------------------------------
    // remove a camada do mapa na tela de preview
    removeLayerFromPreviewPanel : function () {
    	mapLayerPreview.getLayers().forEach(function (lyr) {
    		if( lyr.U.name ==  'preview_layer') {
    			mapLayerPreview.removeLayer( lyr );	
    			return;
    		}
    	});
    },
    // ---------------------------------------------------------------------------------------------------------------
    // Solicita o getCapabilities ao sistema do servidor selecionado
    // e preenche a lista atraves do store.
    requestCapabilities : function ( node ) {
    	var version = node.version;
    	var url = node.url;

    	var capabilitiesStore = Ext.getStore('store.capabilitiesStore');
    	capabilitiesStore.load({
    		params:{'version': version , 'url':url}
    	}); 	
    	
    }    
    
    
});