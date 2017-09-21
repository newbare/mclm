Ext.define('MCLM.view.tools.EditFeicaoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.editFeicaoController',

    
    saveFeicao : function() {
    	alert("save");
    },

	cancelEditFeicao : function() {
		var editFeicaoWindow = Ext.getCmp('editFeicaoWindow');
		editFeicaoWindow.close();
	},
    

});