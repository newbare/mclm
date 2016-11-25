Ext.define('MCLM.view.cenarios.CenarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cenario',

    closeWindow : function() {
    	var cenarioWindow = Ext.getCmp('cenarioWindow');
    	cenarioWindow.close();
    },
    
    init : function(app) {
        this.control({
            '#cenarioGrid' : {
            	rowclick: this.serversGridRowClick 
            },
            '#closeLoadSceneryWindow' : {
            	click : this.closeWindow
            },
            '#loadSceneryToWork' : {
            	click : this.loadScenery
            }
            
        });
    }, 
    
    serversGridRowClick: function(grid, record, tr, rowIndex, e, eOpts) {
    	var nodes =  record.get('nodes');
    	var scenery = record.get('sceneryName');
    	
    	var nodesHtml = "";
    	for (x = 0; x < nodes.length; x++ ) {
    		if ( nodes[x].leaf ) {
    			nodesHtml = nodesHtml + nodes[x].layerAlias + "<br>";
    		}
    	}
    	
    	var painel = Ext.getCmp('cenariosPainelCentral');
    	painel.update('<b>' + scenery + '</b><br><br>' + nodesHtml );
    	
    },

    closeWindow : function() {
    	var cenarioWindow = Ext.getCmp('cenarioWindow');
    	cenarioWindow.close();
    },    
    
    loadScenery : function() {
    	var cenarioGrid = Ext.getCmp('cenarioGrid');
		var row = cenarioGrid.getSelectionModel().getSelection()[0];
		
		var sceneryId = row.get('idScenery');
		var sceneryName = row.get('sceneryName');
    	
		// Carrega as camadas do cenario na arvore de trabalho
    	MCLM.Globals.currentScenery = sceneryId;
    	var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
		trabalhoTreeStore.load({
			params:{cenario: MCLM.Globals.currentScenery},
		    callback: function(records, operation, success) {
		    	if ( success ) {
		        	// Mudar o titulo do no raiz para o nome do cenario
		    		var tree = Ext.getCmp('trabalhoTree');
		    		var root = tree.getRootNode();
		    		console.log( sceneryName );
		    		if( root ) {
		    			root.data.text = sceneryName;
		    			root.collapse();
		    			root.expand();
		    		}
		    	}
		    }
		});  
		
		this.closeWindow();
    }
    
    
});