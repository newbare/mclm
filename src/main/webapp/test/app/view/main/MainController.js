
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
	manageServers : function( button ) {
    	var serversWindow = Ext.getCmp('serversWindow');
    	if ( serversWindow ) return;
    	var serversStore = Ext.getStore('store.externalsource');
    	serversStore.load();
    	serversWindow = Ext.create('MCLM.view.servers.ServersWindow');
    	serversWindow.show();
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
    toggleQueryTool : function () {
    	MCLM.Map.toggleQueryTool();
	},
	// --------------------------------------------------------------------------------------------
	getAsFeatures : function() {
		Ext.Msg.alert('Não implementado ainda.' );
		//MCLM.Map.getAsFeatures('aaaaaa','bbbbbb');
	},
	// --------------------------------------------------------------------------------------------
	showLayerStack : function() {
    	var stackWindow = Ext.getCmp('layerStack');
    	if ( stackWindow ) return;
    	stackWindow = Ext.create('MCLM.view.stack.LayerStack');
    	stackWindow.show();	
    	// Dispara um evento de atualizacao das mini imagens
    	// quem vai interceptar eh o controller 'LayerStackController' 
    	this.fireEvent('mountImagePreview');
	},
	// --------------------------------------------------------------------------------------------
    
});
