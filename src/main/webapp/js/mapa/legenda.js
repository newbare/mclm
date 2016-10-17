
// invocado pelo botao "Exibir Legenda" da tela de lista de camadas (arquivo "layer-stack.js)
function showLegend() {
	if (gridPanel.getSelectionModel().hasSelection()) {
	   var row = gridPanel.getSelectionModel().getSelection()[0];
	   var layerName = row.get('layerName');
	   var serviceUrl = row.get('serviceUrl' );
	   var serialId = row.get('serialId' );
	   showLegendScreen( layerName, serviceUrl, serialId );
	} else {
		Ext.Msg.alert('Camada não selecionada','Selecione uma camada da lista antes de solicitar a legenda.' );
	}	
}

function showLegendScreen( layerName, serviceUrl, serialId ) {
	var legendImageUrl = getLayerLegendImage( layerName, serviceUrl );

	Ext.create('Ext.Window',{
		title : "Legenda da Camada " + layerName,
		width : 550,
		height: 400,
	    scrollable: true,
	    frame : false,
	    scroll: 'both',
		layout : 'border',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
		html: "<img id='"+serialId+"_loading' style='padding:30px' src='img/loading.gif'>" +
				"<img id='"+serialId+"_image' style='display:none' src=''>"
	}).show();		

	$("#"+serialId+"_image").attr('src', legendImageUrl );
	checkLegendImage( legendImageUrl, serialId );
	
}

function checkLegendImage( legendImageUrl, serialId ) {
	$("#"+serialId+"_image").one("load", function() {
		$("#"+serialId+"_image").css("display","block");
		$("#"+serialId+"_loading").css("display","none");
	}).each(function() {
		if(this.complete) $(this).load();
	});
	
}