var map = null;

var painelCentral = {
   collapsible: false,
   region: 'center',
   margin: '0 0 0 0',
   layout:'fit',

   xtype:'panel',
   listeners:{
    	afterrender:function(){
    		drawMap( this );
        },
        resize: function () {
            map.updateSize();
        }
   }            	            
}

function drawMap( owner ) {
	var container = owner.body.dom.id;
	// loadMap('${geoserverUrl}', '${baseLayer}', '${activeScenery.zoomLevel}', '${activeScenery.mapCenter}', '${activeScenery.graticule}');
	// loadMap( container, geoserver, baseLayer, theMapZoom, mapCenter, graticuleStatus )
	loadMap(container,"http://10.5.115.122/geoserver/osm/wms","osm:AA_OpenStreetMap", 3, "-24.9609375,-20.303417518489297",false);
}

