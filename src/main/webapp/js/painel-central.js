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
	var ownerId = owner.body.dom.id;
	
    osmLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    }),

    city = ol.proj.transform([-24.9609375,-20.303417518489297], 'EPSG:4326', 'EPSG:3857'),

    view = new ol.View({
      center: city,
      zoom: 4
    });

    map = new ol.Map({
        target: ownerId,
        renderer: 'canvas',
        layers: [osmLayer],
        view: view
    });  
}

