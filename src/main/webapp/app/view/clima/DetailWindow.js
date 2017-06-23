Ext.define('MCLM.view.clima.DetailWindow', {
	
	extend: 'Ext.Window',
	
	id:'detalheClima',    	
	xtype: 'detalheClima',
	title : "Avisos meteorológicos",
	width : 550,
	height: 365,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

	autoScroll : true,
	
	html : ''
    
});