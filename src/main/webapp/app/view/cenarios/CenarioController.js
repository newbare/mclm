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
    	var description = record.get('description');
    	
    	var nodesHtml = "";
    	
    	for (x = 0; x < nodes.length; x++ ) {
    		if ( nodes[x].leaf ) {
    			nodesHtml = nodesHtml + "<b>["+nodes[x].layerType+"]</b> " + nodes[x].layerAlias + "<br>";
    		}
    	}
    	
    	var painel = Ext.getCmp('inferiorDireito');
    	painel.update("<b>" + scenery + "</b><br><i>" + description + "</i><br><p style='font-family:Courier'>" + nodesHtml + "</p>");
    	
    	this.mountImagePreview( record );
    	
    },

    
    mountImagePreview : function( record ) {
    	var baseServerURL =  record.get('baseServerURL');
    	var baseMap =  record.get('baseMap');
    	var nodes =  record.get('nodes');
    	var bbox =  record.get('bbox');
    	
    	var baseLayerUrlPreview = MCLM.Map.getSceneryImagePreview( baseMap, baseServerURL, bbox );

    	
    	var cenarioMiniImage = Ext.getCmp('cenarioMiniImage');
    	cenarioMiniImage.body.update( "" );
    	
    	var content = "<img class='minithumb' id='id_basemap' style='z-index:0"+ 
			";display:none;position: absolute;width:100%;height:100%' src='"+baseLayerUrlPreview+"' />";
    	
    	for (x = 0; x < nodes.length; x++ ) {
        	var indexOrder =  nodes[x].layerStackIndex;
        	var serialId =  nodes[x].serialId;
			var layerName = nodes[x].layerName;
			var layerType = nodes[x].layerType;
			var serviceUrl = nodes[x].serviceUrl;  
			var checked = nodes[x].checked;  
			
			var layerImage = MCLM.Map.getSceneryImagePreview( layerName, serviceUrl, bbox );
        	
			if ( (layerType == "WMS") && checked ) {
	    		content = content + "<img class='minithumb' id='" + serialId + "' style='z-index:"+ 
	    		indexOrder +";display:none;position: absolute;width:100%;height:100%' src='"+layerImage+"' />";
        	}
        	
    	}
    	cenarioMiniImage.body.update( content );
    	
    	// Isso faz com que a imagem so apareca quando estiver completamente carregada 
    	// (evita o simbolo de imagem quebrada enquanto o geoserver cria a miniatura)
    	$(".minithumb").one("load", function() {
    		$(this).css("display","block");
    	}).each(function() {
    		if(this.complete) $(this).load();
    	});    	
    	
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
		    		
		    		if( root ) {
		    			root.data.text = sceneryName;
		    			root.collapse();
		    			tree.expandAll();
		    		}
		    	}
		    }
		});  
		
		this.closeWindow();
    }
    
    
});