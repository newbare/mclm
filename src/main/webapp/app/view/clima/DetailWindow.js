Ext.define('MCLM.view.clima.DetailWindow', {
	
	extend: 'Ext.Window',
	
	id:'detalheClima',    	
	xtype: 'detalheClima',
	title : "",
	width : 450,
	height: 300,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

	autoScroll : true,
	
	html : ''
    
});