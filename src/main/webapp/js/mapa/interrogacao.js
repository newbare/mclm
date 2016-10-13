
function bindMapToQueryTool() {
	onClickBindKey = map.on('click', function(event) {
		queryMap( event.coordinate );
	});
	
} 


function getKeysFromJson( obj ) {
    var keys = [];
    for (var key in obj) {
        if ( obj.hasOwnProperty(key) ) {
            keys.push(key);
        }
    }
    return keys;	
}

function queryMap( coordinate ) {
	var virgula = "";
	var layerNames = "";

	var urlFeatureInfo = "";
	var viewResolution = theView.getResolution();
	
	map.getLayers().forEach( function (layer) {
		var layerName = layer.U.name;
		if ( layerName ) {
	
			urlFeatureInfo = layer.getSource().getGetFeatureInfoUrl(
				coordinate, viewResolution, theView.getProjection(),
		          {'QUERY_LAYERS': layerName,  'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 100} );
			

			/*
			if ( lyr.U.name ) {
				console.log( lyr );
				layerNames = virgula + lyr.U.name;
				virgula = ",";
			}
			 */
		}
	});

	console.log( urlFeatureInfo );
	console.log("-----------------------------------------------------");
	
	Ext.Ajax.request({
       url: urlFeatureInfo,
       success: function(response, opts) {
    	   console.log( response );
    	   painelInferior.update( response );
       },
       failure: function(response, opts) {
    	   console.log( "CORS ERROR" );
    	  // Ext.Msg.alert('Erro ao receber a configuração so servidor' );
       }
    });		
	
	/*
	var bbox = getMapCurrentBbox();
	var requestUrl = serverUrl + "/?BBOX=" + bbox + "&CRS=EPSG:4326&QUERY_LAYERS=" + 
		layerNames + "&SERVICE=WMS&REQUEST=GetFeatureInfo&FEATURE_COUNT=10&VERSION=1.3.0&FORMAT=image/png&LAYERS=" + 
		layerNames + "&info_format=application/json";
	
	console.log( requestUrl );
	*/
	/*
	Ext.Ajax.request({
		url: 'getConfig',
		success: function(response, opts) {
				Ext.Msg.alert('Recebido Ok. Veja o Log do browser.' );
				console.log( response );
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Erro ao receber a configuração so servidor' );
			}
	});		   
	*/
}



