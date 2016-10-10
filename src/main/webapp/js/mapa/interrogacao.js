/*
 * 
 * QUERY LAYERS
 * 
 * http://172.21.81.43/geoserver/wms/?BBOX=-90,-180,90,180&CRS=EPSG:4326&QUERY_LAYERS=view_aerodromos_anac&SERVICE=WMS&HEIGHT=714&REQUEST=GetFeatureInfo&STYLES=&I=775&J=246&WIDTH=1079&FEATURE_COUNT=10&VERSION=1.3.0&FORMAT=image/png&LAYERS=view_aerodromos_anac&info_format=application/json
 * http://10.5.115.122/geoserver/wms/?BBOX=-7778231.998299535,-5175704.059245855,2220954.2938540815,-5175704.059245855,2220954.2938540815,557684.5583686456,-7778231.998299535,557684.5583686456&CRS=EPSG:4326&QUERY_LAYERS=,Organiza%C3%A7%C3%B5es%20Civis%20P%C3%BAblicas&SERVICE=WMS&REQUEST=GetFeatureInfo&FEATURE_COUNT=10&VERSION=1.3.0&FORMAT=image/png&LAYERS=,Organiza%C3%A7%C3%B5es%20Civis%20P%C3%BAblicas&info_format=application/json
 */

function queryMap() {
	var virgula = "";
	var layerNames = "";
	
	try {
		var serverUrl = landLayer.getSource().getUrls()[0];
	} catch (err) {
		var serverUrl = landLayer.getSource().getUrl();
	}	
	
	map.getLayers().forEach(function (lyr) {
		if ( lyr.U.name ) {
			console.log( lyr );
			layerNames = virgula + lyr.U.name;
			virgula = ",";
		}
	});
	
	var bbox = getMapCurrentBbox();
	
	var requestUrl = serverUrl + "/?BBOX=" + bbox + "&CRS=EPSG:4326&QUERY_LAYERS=" + 
		layerNames + "&SERVICE=WMS&REQUEST=GetFeatureInfo&FEATURE_COUNT=10&VERSION=1.3.0&FORMAT=image/png&LAYERS=" + 
		layerNames + "&info_format=application/json";
	
	alert( requestUrl );
	
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



