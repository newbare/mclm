Ext.define('MCLM.view.datawindow.ConfigDataWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.configDataWindow',

    
    getTableSchema : function( ) {
    	var tableName = Ext.getCmp("tableName").getValue();
    	var serverAddress = Ext.getCmp("serverAddress").getValue();
    	var databaseName = Ext.getCmp("databaseName").getValue();
    	var password = Ext.getCmp("password").getValue();
    	var user = Ext.getCmp("user").getValue();
    	var serverPort = Ext.getCmp("serverPort").getValue();
    	
//    	if ( feicaoNome ) {
//    		Ext.Msg.alert('Erro','Preencha todos os campos solicitados.');
//    		return true;
//    	}
    	
    	var configDataWindow = Ext.getCmp('configDataWindow');
    	var nodeData = configDataWindow.nodeData;    	
    	var idNodeData = nodeData.idNodeData;

    	console.log( nodeData );
    	
		Ext.Ajax.request({
		       url: 'getTableSchema',
		       params: {
		           'tableName': tableName,
		           'serverAddress' : serverAddress,
		           'databaseName' : databaseName,
		           'password' : password,
		           'user' : user,
		           'serverPort' : serverPort
		           
		       },       
		       success: function(response, opts) {
		    	   var respObj = Ext.decode( response.responseText );
		    	   
		    	   if( respObj.success ) {
		    		   var layerAlias = respObj.layerAlias;
		    		   
		    	   } else {
		    		   Ext.Msg.alert('Erro','Erro ao gravar Elemento: ' + respObj.msg );
		    	   }
		    	   
		       },
		       failure: function(response, opts) {
		    	   var respObj = Ext.decode( response.responseText );
		    	   Ext.Msg.alert('Erro','Erro ao gravar Elemento: ' + respObj.msg );
		       }		       
		});    	
		
    },
    
});