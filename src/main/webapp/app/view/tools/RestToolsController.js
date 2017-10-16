Ext.define('MCLM.view.tools.RestToolsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.restToolsController',
    
    theView : null,
    
    show3dView : function() {
    	
    	if( MCLM.Globals.tdViewVisible ) {
        	$('#mainFlatMap').css('width','100%');
        	$('#tdMap').css('display','none');
        	MCLM.Globals.tdViewVisible = false;
        	MCLM.Map.map.updateSize();
        	MCLM.Map.worldTopoMap.setOpacity( 1 );
        	return true;
    	}
    	
    	
    	MCLM.Globals.tdViewVisible = true;
    	
    	
    	$('#mainFlatMap').css('width','50%');
    	$('#tdMap').css('display','block');
    	MCLM.Map.map.updateSize();
    	
    	if ( MCLM.Globals.tdView == null ) {
    		
	    	MCLM.Globals.tdView = new ol.View({
	        	center: ol.proj.transform( MCLM.Map.arrayMapCenter , 'EPSG:4326', 'EPSG:3857'),
	            zoom: MCLM.Map.mapZoom
	        });
	    	
    	}
        
		var tdMap = new ol.Map({
			layers: [ MCLM.Map.imageryMap, MCLM.Map.worldTopoMap ],
			target: 'tdMap',
			view : MCLM.Globals.tdView,
			renderer: 'webgl',
			
			interactions: ol.interaction.defaults({
			    doubleClickZoom :false,
			    dragAndDrop: false,
			    keyboardPan: false,
			    keyboardZoom: false,
			    mouseWheelZoom: false,
			    pointer: false,
			    select: false,
			    dragPan: false,
			    shiftDragZoom: false
			}),
		});
		   
		MCLM.Map.worldTopoMap.setOpacity( 0.4 );
		
		var ol3d = new olcs.OLCesium({map: tdMap});
		var scene = ol3d.getCesiumScene();
		scene.terrainProvider = new Cesium.CesiumTerrainProvider({
			url: 'https://assets.agi.com/stk-terrain/world'
		});
		ol3d.setEnabled(true);		

		
		var cam = ol3d.getCamera();
		//var T = [1000,2000,3000,4000,5000,6000,7000,8000];
		//cam.setPosition( ol.proj.transform( MCLM.Map.arrayMapCenter , 'EPSG:4326', 'EPSG:3857') );
		//cam.setAltitude(15000);
		//cam.setCenter( ol.proj.transform( MCLM.Map.arrayMapCenter , 'EPSG:4326', 'EPSG:3857')  );
		cam.setDistance(350000);
		//cam.setHeading(6.289);
		cam.setTilt(1.0442318918054133);		
    	
		if ( MCLM.Globals.onChangeCenter == null ) {
			MCLM.Globals.onChangeCenter = MCLM.Map.theView.on('change:center', MCLM.Functions.syncMaps);
		}
		
		if ( MCLM.Globals.onChangeRotation == null ) {
			MCLM.Globals.onChangeRotation = MCLM.Map.theView.on('change:rotation', MCLM.Functions.syncMaps);
		}
		
		if ( MCLM.Globals.onChangeResolution == null ) {
			MCLM.Globals.onChangeResolution = MCLM.Map.theView.on('change:resolution', MCLM.Functions.syncMaps);
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
		
		var center2 = center;
		//var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
		
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