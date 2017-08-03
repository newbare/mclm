Ext.define('MCLM.view.tools.RestToolsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.restToolsController',
    
    toggleImagery : function() {
    	
    	if( MCLM.Map.imageryEnabled ) {
    		MCLM.Map.imageryEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_ago_imageryMap' );
    		
    		MCLM.Map.removeFromLayerStack( 'mclm_ago_imageryMap' );
    		
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.imageryMap );
    		MCLM.Map.imageryEnabled = true;
    		
    		var data = {};
    		data.description = 'Imagens de satélite do ArcGIS';
    		data.institute = 'www.arcgis.com';
    		data.layerName = 'Imagens de Satélite';
    		data.layerAlias = 'Imagens de Satélite';
    		data.serialId = 'mclm_ago_imageryMap';
    		data.layerType = 'Externo';
    		MCLM.Map.addToLayerStack( data );
    		
    	}
    	
    },   
    
    
    toggleHillshade : function() {
    	
    	if( MCLM.Map.hillshadeEnabled ) {
    		MCLM.Map.hillshadeEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_ago_hillshadeMap' );
    		MCLM.Map.removeFromLayerStack( 'mclm_ago_hillshadeMap' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.hillshadeMap );
    		MCLM.Map.hillshadeEnabled = true;
    		
    		var data = {};
    		data.description = 'Camada de Relevo do ArcGIS';
    		data.institute = 'www.arcgis.com';
    		data.layerName = 'Relevo';
    		data.layerAlias = 'Relevo';
    		data.serialId = 'mclm_ago_hillshadeMap';
    		data.layerType = 'Externo';
    		MCLM.Map.addToLayerStack( data );    		
    	}
    	
    },   
    
    toggleTopo : function() {
    	
    	if( MCLM.Map.topoEnabled ) {
    		MCLM.Map.topoEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_ago_worldTopoMap' );
    		MCLM.Map.removeFromLayerStack( 'mclm_ago_worldTopoMap' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.worldTopoMap );
    		MCLM.Map.topoEnabled = true;
    		
    		var data = {};
    		data.description = 'Camada de Topografia do ArcGIS';
    		data.institute = 'www.arcgis.com';
    		data.layerName = 'Topografia';
    		data.layerAlias = 'Topografia';
    		data.serialId = 'mclm_ago_worldTopoMap';
    		data.layerType = 'Externo';
    		MCLM.Map.addToLayerStack( data );     		
    	}
    	
    },    

    toggleOcean : function() {
    	
    	if( MCLM.Map.oceanEnabled ) {
    		MCLM.Map.oceanEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_ago_oceanBaseMap' );
    		MCLM.Map.removeFromLayerStack( 'mclm_ago_oceanBaseMap' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.oceanBaseMap );
    		MCLM.Map.oceanEnabled = true;
    		
    		var data = {};
    		data.description = 'Camada de Relevo do Leito Marinho do ArcGIS';
    		data.institute = 'www.arcgis.com';
    		data.layerName = 'Leito Marinho';
    		data.layerAlias = 'Leito Marinho';
    		data.serialId = 'mclm_ago_oceanBaseMap';
    		data.layerType = 'Externo';
    		MCLM.Map.addToLayerStack( data );        		
    	}
    	
    },      
    
    toggleAeroTraffic : function() {
    	MCLM.Map.toggleAeroTraffic();
    },
    
    updateMaritmTraffic : function() {
    	MCLM.Map.toggleShipTraffic();
    },

    showStreetPhoto : function() {
    	MCLM.Map.toggleStreetPhoto();
    },
    
	toggleSeaMapLayer : function( button ) {
		MCLM.Map.toggleSeaMapLayer();
	},
	
	shoMarineTraffic : function( button ) {
		var center = MCLM.Map.map.getView().getCenter();
		var mapZoom = MCLM.Map.map.getView().getZoom();
		var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
		var mapCenterLong = center2[0];
		var mapCenterLat = center2[1];
		var url = "https://www.marinetraffic.com/en/ais/embed/zoom:" + mapZoom + "/centery:"+mapCenterLat+"/centerx:"+mapCenterLong+"/maptype:4/shownames:true/mmsi:0/shipid:0/fleet:/fleet_id:/vtypes:/showmenu:false/remember:false";
		
		var frame = "<iframe scrolling='no' style='overflow:hidden;border:0px; width:100%;height:100%' src='"+url+"'></iframe>";
		
		var mTWindow = Ext.getCmp('mTWindow');
		if ( !mTWindow ) {
			mTWindow = Ext.create('MCLM.view.marinetraffic.MTWindow');
		}
		
		mTWindow.update( frame );
		mTWindow.show();
		
		
	}

    
});