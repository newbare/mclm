
Ext.define('MCLM.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
	requires: [
	   'MCLM.Globals',        
	   'MCLM.view.config.ConfigWindow'
	],      
	// --------------------------------------------------------------------------------------------
	toggleMapGrid : function( button ) {
		MCLM.Map.toggleMapGrid();
	},
	// --------------------------------------------------------------------------------------------
	toggleSeaMapLayer : function( button ) {
		MCLM.Map.toggleSeaMapLayer();
	},
	// --------------------------------------------------------------------------------------------
    showConfig : function ( button ) {
    	var configWindow = Ext.getCmp('configWindow');
    	if ( configWindow ) return;
    	configWindow = Ext.create('MCLM.view.config.ConfigWindow');
    	configWindow.show();
    	var configForm = Ext.getCmp('configForm');
    	configForm.getForm().setValues( MCLM.Globals.config );    	
    },
	// --------------------------------------------------------------------------------------------
    checkInternetConnection: function ( button ) {
    	var box = Ext.MessageBox.wait('Aguarde alguns instantes enquanto a conexão com a Internet é testada.', 'Verificando Conectividade');
    	
    	Ext.Ajax.request({
    		url: 'internetAccessTest',
    		success: function(response, opts) {
    			box.hide();
    			var result = Ext.decode( response.responseText );
    			if( result.conectado ) {
    				Ext.Msg.alert('Conectado', 'O Sistema consegue acessar a Internet sem problemas.');
    			} else {
    				Ext.Msg.alert('Não Conectado', 'O Sistema não é capaz de acessar a Internet. Verifique as configurações de Proxy.');
    			}
    		},
    		failure: function(response, opts) {
    			box.hide();
    			Ext.Msg.alert('Erro ao tentar verificar a conexão com a Internet.' );
    		}
    	});			
    },    
	// --------------------------------------------------------------------------------------------
	// invocado pelo botao da barra de ferramentas lateral.
	// "unbindMapClick()" estah no arquivo "wms.js"
    toggleQueryTool : function () {
    	MCLM.Map.toggleQueryTool();
	}    
    
    
});
