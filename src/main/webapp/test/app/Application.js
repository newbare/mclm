/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('MCLM.Application', {
    extend: 'Ext.app.Application',
    
    name: 'MCLM',

    requires: [
       'MCLM.view.main.Main',
       'MCLM.Globals',
       'MCLM.Functions'
    ],
    
    stores: [
       'MCLM.store.LayerTree',
       'MCLM.store.LayerDetail',
       'MCLM.store.ExternalSource',
       'MCLM.store.LayerStack',
    ],
    
    launch: function () {
        
		Ext.Ajax.request({
			url: 'getConfig',
			success: function(response, opts) {
				var config = Ext.decode(response.responseText);
				
				// Nao modifique a ordem das chamadas abaixo
				
				/* 1. */ MCLM.Globals.config = config;			// A aplicacao precida das configuracoes
				/* 2. */ Ext.create({ xtype: 'app-main' });		// 
				/* 3. */ MCLM.Functions.inicializaDicas();		// As dicas dos botoes precisam dos botoes instanciados
				
		        // ---------------------------------------------
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Erro ao receber a configuração do servidor' );
			}
		});

    },


});
