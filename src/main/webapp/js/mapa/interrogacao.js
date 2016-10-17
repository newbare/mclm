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

function queryMap( coordinate ) {
	var virgula = "";
	var layerNames = "";
	var content = [];
	var urlFeatureInfo = "";
	var viewResolution = theView.getResolution();
	
	map.getLayers().forEach( function (layer) {
		var layerName = layer.U.name;
		if ( layerName ) {
			// "queryFactorRadius" esta definido em "wms.js" e o valor vem da configuracao do servidor
			urlFeatureInfo = layer.getSource().getGetFeatureInfoUrl(
				coordinate, viewResolution, theView.getProjection(),
		        {'buffer':queryFactorRadius, 'QUERY_LAYERS': layerName,  'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 100} 
			);
			var encodedUrl = encodeURIComponent( urlFeatureInfo );
			addDataFrom( layerName, encodedUrl );
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
