
Ext.define('MCLM.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'MCLM.view.main.MainController',
        'MCLM.view.main.TelaPrincipal',
    ],

    controller: 'main',
	plugins: 'viewport',
	
	renderTo : Ext.getBody(),
	listeners:{
		afterrender:function(){
			//
		}
	}, 			   
	items: [{
		xtype: 'telaPrincipal'
	}]

});
