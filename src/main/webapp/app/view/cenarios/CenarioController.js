Ext.define('MCLM.view.cenarios.CenarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cenario',

    closeWindow : function() {
    	var cenarioWindow = Ext.getCmp('cenarioWindow');
    	cenarioWindow.close();
    },
    
    
});