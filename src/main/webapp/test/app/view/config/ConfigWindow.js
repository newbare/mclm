Ext.define('MCLM.view.config.ConfigWindow', {
	extend: 'Ext.Window',
	
	requires: [
	   'MCLM.view.config.ConfigForm',
	   'MCLM.view.config.ConfigController'
	],  
	
	controller : 'config',
	
	id:'configWindow',    	
	xtype: 'configWindow',
	title : "Configurações",
	width : 450,
	height: 550,
    scrollable: false,
    frame : false,
	layout : 'fit',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
    items : [{
        xtype: 'configForm',
    }]
});