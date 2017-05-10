Ext.define('MCLM.view.datawindow.ConfigDataPanelsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.configDataPanels',

    doAddFolder : function( button ) {
    	var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
    	var root = configDataPanelsTree.getRootNode();
	   
    	var anotherFolder = {
		        'text': 'Painel 02',
		        'id': 'newFolder',           // <<<------- CHANGE !!
		        'index' : 1,
		        'leaf' : false,
		        'iconCls': 'panel-icon'
    	};
    	root.appendChild( anotherFolder );
	   
    },
    
    doSomething : function( button ) {
    	
    	var configDataPanels = Ext.getCmp('configDataPanels');
    	var dataWindowData = configDataPanels.dataWindowData;    	
    	
    	alert("sdsas");
    	
    	
    },
    

 
});