Ext.define('MCLM.view.cenarios.CenarioWindow', {
	extend: 'Ext.Window',
	xtype : 'view.cenarioWindow',
	id : 'cenarioWindow',

    requires: [
        'MCLM.view.cenarios.CenarioController',
        'MCLM.view.cenarios.CenarioTree',
	],	    
    controller : 'cenario',	
	
	width : 700,
	height: 400,
    scrollable: false,
    frame : false,
	layout : 'border',
	title : "Gerenciar Cenários",
	constrain: true,
	
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.cenarioTree'
	}],	
	  
    dockedItems: [{
    	xtype: 'toolbar',
        items: [{
        	iconCls: 'plus-icon',
        	id: 'id911',
            handler : function() {
            	alert("ok");
            }
        }]
    }]  
	
});
