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
    	var dataWindowName = Ext.getCmp("dataWindowName").getValue();
    	
    	if ( !tableName || !serverAddress || !databaseName || !user || !serverPort ) {
    		Ext.Msg.alert('Erro','Preencha todos os campos solicitados.');
    		return true;
    	}
    	
    	var configDataWindow = Ext.getCmp('configDataWindow');
    	var dataWindowData = {};
    	dataWindowData.nodeData = configDataWindow.nodeData; 
    	
    	var windowData = {};
    	windowData.tableName = tableName;
    	windowData.dataWindowName = dataWindowName;
    	windowData.serverAddress = serverAddress;
    	windowData.databaseName = databaseName;
    	windowData.password = password;
    	windowData.user = user;
    	windowData.serverPort = serverPort;

    	dataWindowData.windowData = windowData;
    	
		Ext.Ajax.request({
		       url: 'getTableSchema',
		       params: {
		           'tableName': tableName,
		           'dataWindowName': dataWindowName,
		           'serverAddress' : serverAddress,
		           'databaseName' : databaseName,
		           'password' : password,
		           'user' : user,
		           'serverPort' : serverPort
		       },       
		       success: function(response, opts) {
		    	   var respObj = Ext.decode( response.responseText );
		    	   dataWindowData.fields = respObj;

		    	   var dataPanelsStore = Ext.getStore('store.DataPanels');
		    	   dataPanelsStore.load([{}]);		    	   
		    	   
		    	   var configDataPanels = Ext.getCmp('configDataPanels');
		    	   if ( configDataPanels ) {
		    		   configDataPanels.close();
		    		   configDataPanels.destroy();
		    	   }
		    	   
		    	   configDataPanels = Ext.create('MCLM.view.datawindow.ConfigDataPanels');
		    	   configDataPanels.dataWindowData = dataWindowData;
		    	   configDataPanels.show();
		    	   
		    	   var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
		    	   var root = configDataPanelsTree.getRootNode();
		    	   root.set('text', dataWindowName);

		    	   var firstFolder = {
	    		        'text': 'Painel 01',
	    		        'id': 1,
	    		        'index' : 1,
	    		        'leaf' : false,
	    		        'iconCls': 'panel-icon'
	    		   };
		    	   
		    	   root.appendChild( firstFolder );
		    	   
		    	   firstFolder = dataPanelsStore.getNodeById(1);
		    	   
		    	   
		     	   for(var i = 0; i < respObj.length; i++) { 
		     		  var columnName = respObj[i].columnName;
		     		  var dataType = respObj[i].dataType;
		     		  
		     		  var newNode = {
		    		        'text': columnName,
		    		        'id': 'id_' + columnName,
		    		        'leaf' : true,
		    		        'columnName' : columnName,
		    		        'dataType' : dataType,
		    		        'newName' : '',
		    		        'newType' : '',
		    		        'iconCls': 'field-icon'
		    		  };
		     		  
		     		 firstFolder.appendChild( newNode );
		     		   
		     	   }		    	   
		    	   
		       },
		       failure: function(response, opts) {
		    	   Ext.Msg.alert('Erro','Erro ao receber dados da Tabela "' + tableName + '".' );
		       }		       
		});    	
		
		
		var configDataWindow = Ext.getCmp('configDataWindow');
		configDataWindow.close();			
		configDataWindow.destroy();			
    },
    
});