
Ext.define('MCLM.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'MCLM.view.main.MainController',
        'MCLM.view.main.MapaPrincipal',
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
		xtype: 'mapaPrincipal'
	}]

});
