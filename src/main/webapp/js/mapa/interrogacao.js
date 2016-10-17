var queryToolEnabled = false;

 
function bindMapToQueryTool() {
	onClickBindKey = map.on('click', function(event) {
		queryMap( event.coordinate );
	});
	
} 

// invocado pelo botao da barra de ferramentas lateral.
// "unbindMapClick()" estah no arquivo "wms.js"
function toggleQueryTool() {
	if ( !queryToolEnabled ) {
		bindMapToQueryTool() ;
		queryToolEnabled = true;
	} else {
		unbindMapClick();
		queryToolEnabled = false;
	}
}

function imageMerge() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	$('.mergeable').each(function(){
		var me = $( this );
		canvas.width = me.width;
		canvas.height = me.height;
		var img = new Image();
		img.src = me.attr("src"); 
		context.drawImage( img, 0, 0);
	});	
	
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
	window.location.href=image;	
	
	/*
	var img1 = document.getElementById('img1');
	var img2 = document.getElementById('img2');
	context.globalAlpha = 1.0;
	context.drawImage(img1, 0, 0);
	context.globalAlpha = 0.5; //Remove if pngs have alpha
	context.drawImage(img2, 0, 0);
	*/	
}

function queryMap( coordinate ) {
	var virgula = "";
	var layerNames = "";
	var content = [];
	var urlFeatureInfo = "";
	var viewResolution = theView.getResolution();
	
	map.getLayers().forEach( function (layer) {
		var layerName = layer.U.name;
		if ( layerName ) {
			
			//if ( !layer.isBaseLayer ) {
				urlFeatureInfo = layer.getSource().getGetFeatureInfoUrl(
					coordinate, viewResolution, theView.getProjection(),
			        {'buffer':5, 'QUERY_LAYERS': layerName,  'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 100} 
				);
				var encodedUrl = encodeURIComponent( urlFeatureInfo );
				addDataFrom( layerName, encodedUrl );
			//}
		}
	});

}

function addDataFrom( layerName, encodedUrl ) {
	aba02.removeAll();
	
	Ext.Ajax.request({
       url: 'proxyRequest',
       params: {
           'targetUrl': encodedUrl,
           'layerName' : layerName 
       },       
       success: function(response, opts) {
    	   try {
	    	   var jsonObj = JSON.parse(response.responseText);
	    	   //var data = jsonObj.features[0].properties; // properties,type,id,geometry.type,geometry_name 
	    	   var rawData = [];
	    	   for ( x=0; x<jsonObj.features.length;x++ ) {
	    		   rawData.push( jsonObj.features[x].properties );
	    	   }
	    	   addGrid( layerName, rawData );
    	   } catch ( err ) {
    		   ajaxError( response, layerName );
    	   }
       },
       failure: function(response, opts) {
    	   ajaxError( response, layerName );
       }
    });				
}

function ajaxError( response, layerName ) {
	console.log( "Ajax Error: " + response + " " + layerName );
}
