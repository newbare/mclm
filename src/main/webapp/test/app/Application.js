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
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        
		Ext.Ajax.request({
			url: 'getConfig',
			success: function(response, opts) {
				var config = Ext.decode(response.responseText);
				//runSystem( config );
				
				MCLM.Globals.config = config;
		        Ext.create({
		            xtype: 'app-main'
		        });

		        var painelCentral = Ext.ComponentQuery.query('painelCentral')[0];
		        
		        painelCentral.body.update( JSON.stringify( MCLM.Globals.config ) );
		        
		        MCLM.Functions.inicializaDicas();
		        
		        
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Erro ao receber a configuração do servidor' );
			}
		});

       
        
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
