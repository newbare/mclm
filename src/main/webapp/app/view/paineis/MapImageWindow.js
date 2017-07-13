Ext.define('MCLM.view.paineis.MapImageWindow', {
	extend: 'Ext.Window',
	
	id:'mapImageWindow',    	
	xtype: 'mapImageWindow',
	title : "Imagem do Mapa",
	width : 513,
	height: 334,
	resizable: false,
	bodyStyle:{"background-color":"white"},
	autoScroll: true,
	constrain: true,
	renderTo: Ext.getBody(),
	html : '',
});