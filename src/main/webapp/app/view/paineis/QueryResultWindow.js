Ext.define('MCLM.view.paineis.QueryResultWindow', {
	extend: 'Ext.Window',
	
	id:'queryResultWindow',    	
	xtype: 'queryResultWindow',
	title : "Dados das Camadas",
	width : 850,
	height: 550,
	bodyStyle:{"background-color":"white"},
	autoScroll: true,
	constrain: true,
	renderTo: Ext.getBody(),

});