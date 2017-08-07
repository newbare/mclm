Ext.define('MCLM.view.tools.MetarImageWindow', {
	extend: 'Ext.Window',
	
	id:'metarImageWindow',    	
	xtype: 'metarImageWindow',
	title : "Dados de METAR",
	width : 530,
	height: 650,
	bodyStyle:{"background-color":"white"},
	constrain: true,
	renderTo: Ext.getBody(),
	resizable: false,
	html : '',
	
});