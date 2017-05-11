Ext.define('MCLM.view.datawindow.ConfigDataPanelsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.configDataPanels',

    doAddFolder : function( button ) {
    	var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
    	var root = configDataPanelsTree.getRootNode();
	   
    	var idNumber = root.childNodes.length + 1;
    	
    	var anotherFolder = {
		        'text': 'Painel ' + idNumber,
		        'id': 'panel' + idNumber,         
		        'leaf' : false,
		        'iconCls': 'panel-icon'
    	};
    	root.appendChild( anotherFolder );
	   
    },
    
    doSomething : function( button ) {
    	
    	var configDataPanels = Ext.getCmp('configDataPanels');
    	var dataWindowData = configDataPanels.dataWindowData;    	
    	
    	var dataPanelsStore = Ext.getStore('store.DataPanels');
    	
    	var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
    	//var root = configDataPanelsTree.getRootNode();    	
    	configDataPanelsTree.expandAll();
    	
    	console.log(  dataPanelsStore.getRange()  );
    	
    	
    },
    

 
});