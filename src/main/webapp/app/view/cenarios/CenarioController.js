Ext.define('MCLM.view.cenarios.CenarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cenario',

    closeWindow : function() {
    	var uploadTifWindow = Ext.getCmp('cenarioWindow');
    	uploadTifWindow.close();
    },
    
    
});