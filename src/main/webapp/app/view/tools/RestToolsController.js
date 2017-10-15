Ext.define('MCLM.view.tools.RestToolsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.restToolsController',
    
    show3dView : function() {
    	var tDViewVWindow = Ext.getCmp('tDViewVWindow');
    	if( !tDViewVWindow ) {
    		tDViewVWindow = Ext.create('MCLM.view.td.TDViewWindow');
    	}
    	tDViewVWindow.show();
    	
    	
        var theView = new ol.View({
        	center: ol.proj.transform( MCLM.Map.arrayMapCenter , 'EPSG:4326', 'EPSG:3857'),
            zoom: MCLM.Map.mapZoom
        });  	
    	


		var ddMap = new ol.Map({
			layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
			target: 'ddMap',
			view : theView,
			renderer: 'webgl',
			controls: ol.control.defaults().extend([
               new ol.control.Rotate({
				   autoHide: false
			   })			                                        
			]),
	        interactions: ol.interaction.defaults({
	        	  shiftDragZoom: false
	        }).extend([
	            new ol.interaction.DragRotateAndZoom(),
	            new ol.interaction.DragZoom({
	            	duration: 200,
	            	condition: function(mapBrowserEvent) {
	            		var originalEvent = mapBrowserEvent.originalEvent;
	            		return ( originalEvent.ctrlKey && !(originalEvent.metaKey || originalEvent.altKey) && !originalEvent.shiftKey);
	            	}
	            })
	        ]),				
		});    	
    	
    	
		var tdMap = new ol.Map({
			layers: [ MCLM.Map.imageryMap ],
			target: 'tdMap',
			view : theView,
			renderer: 'webgl'
		});
		   
		
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
		cam.setDistance(900000);
		cam.setHeading(6.289);
		cam.setTilt(1.0442318918054133);		
    	
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