Ext.define('MCLM.view.paineis.LayerTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree',
    
    // Expande toda a arvore
    onTreeExpandAll : function( button ) {
    	var tree = Ext.getCmp('layerTree');
    	tree.expandAll();
    },
    
    // Recolhe toda a arvore
    onTreeCollapseAll : function( button ) {
    	var tree = Ext.getCmp('layerTree');
    	tree.collapseAll();
    },
    
    // Responde ao clique em um no. Mostra os detalhes do no painel abaixo da arvore
    onLayerTreeItemClick : function( view, record, item, index, e ) {
		var tempData = [];
		tempData.push( record.data );

		var layerDetailStore = Ext.data.StoreManager.lookup('store.LayerDetail');
		layerDetailStore.loadData( tempData );
    },
    
    // Quando o estado do no muda (selecionado/nao selecionado)
    // Adiciona ou remove uma camada na lista de camadas e no mapa
    onLayerTreeCheckChange : function( node, checked, eOpts ) {
	    p = node.parentNode;
	    var pChildCheckedCount = 0;
	    p.suspendEvents();
	    p.eachChild(function(c) { 
	        if (c.get('checked')) pChildCheckedCount++; 
	       	p.parentNode.set('checked', !!pChildCheckedCount);
	        p.set('checked', !!pChildCheckedCount);
	    });
	    p.resumeEvents();
	    
	    this.toggleNode( node );
	  
    },

    // Mosta o menu de contexto quando clica com botao direito do mouse em um no da arvore
    onContextMenu : function( tree, record, item, index, e, eOpts ) {
    	var me = this;
    	if ( !record.data.leaf ) {
		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
		          { iconCls: 'forecast-icon', text: 'Adicionar Camada KML', handler: function() { me.addNewLayerKML(record); } },
		          { iconCls: 'add-wms-icon', text: 'Adicionar Camada WMS', handler: function() { me.addNewLayerWMS(record); } },
		          { iconCls: 'grid-icon', text: 'Adicionar Camada SHP', handler: function() { me.addNewLayerSHP(record); } },
		          { xtype: 'menuseparator' },
		          { iconCls: 'add-folder-icon', text: 'Criar Nova Pasta', handler: function() { me.addNewFolder(record); } },
		          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { me.deleteNodeAndChildren( record ); } }
		        ]
		    });
		} else {
		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
		          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { me.askDeleteLayer( record ); } }
		        ]
		    });
		}
	    var position = [e.getX()-10, e.getY()-10];
	    menu_grid.showAt( position );
		e.stopEvent();    	
    },
    
    // Adiciona uma nova pasta na arvore 
    addNewFolder : function( node ) {
    	Ext.Msg.alert( node.id + " " + node.layerAlias );
    },
    
    // Pergunta se quer deletar uma camada / no da arvore
	askDeleteLayer: function( record ) {
		var parentNode = record.parentNode;
		var data = record.data;
		var name = data.layerAlias;
		var me = this;
		
		Ext.Msg.confirm('Apagar Camada', 'Deseja realmente apagar a Camada "' + name + '" ?', function( btn ){
			   if( btn === 'yes' ){
				   me.deleteLayer( parentNode, data );
			   } else {
			       return;
			   }
		 });	
		
	},
	
	// Efetivamente apaga uma camada
	deleteLayer : function ( parentNode, data ) {
		var nodeId = data.id;
		var layerAlias = data.layerAlias;
		
		Ext.Ajax.request({
		       url: 'deleteLayer',
		       params: {
		           'nodeId': nodeId 
		       },       
		       success: function(response, opts) {
		    	   var result = JSON.parse( response.responseText );
		    	   Ext.Msg.alert('Sucesso', result.msg );
		    	   layerStore.load({ node: parentNode });
		    	   MCLM.Map.removeLayer( layerAlias );
		    	   
		    	   // Se a tela de lista de camadas estiver visivel entao precisa ser atualizada
		    	   this.fireEvent('removeFromLayerStack', layerAlias);
		       },
		       failure: function(response, opts) {
		    	   var result = JSON.parse( response.responseText );
		    	   Ext.Msg.alert('Falha', result.msg );
		       }
		});
		
	},
	
	// Abre o dialogo para adicionar uma nova camada WMS 
	addNewLayerWMS : function ( record ) {
		var data = record.data;
		//newLayerWms( record.getPath("text"), data.id, data.layerAlias );
	},
	
	// Abre o dialogo para adicionar uma camada SHP
	addNewLayerSHP : function ( record ) {
		var data = record.data;
		//newLayerShp( record.getPath("text"), data.id, data.layerAlias );
	},
	
	// Apaga uma pasta e tudo abaixo dela
	deleteNodeAndChildren : function( node ) {
		Ext.Msg.alert('Erro', 'Não implementado ainda' );
	},
	
	// Responde a mudanca de estado de um no ( selecionado/nao selecionado )
	toggleNode: function( node ) {
		var serviceUrl = node.get('serviceUrl');
		var layerName = node.get('layerName');
		var layerAlias = node.get('layerAlias');
		var checked = node.get('checked');
		var serialId = node.get('serialId');
		var version = node.get('version');
	
		if ( layerName == "" ) return;
		
		if( checked == true ) {
			// adiciona a camada no mapa
			MCLM.Map.addLayer( serviceUrl, layerName, layerAlias, serialId );
			// Adiciona a camada na lista de camadas 
			this.fireEvent('addToLayerStack',  node.data);
			
		} else {
			// Remove a camada do mapa
			MCLM.Map.removeLayer( layerAlias );
			// Remove a camada de lista de camadas (caso esteja visivel)
			this.fireEvent('removeFromLayerStack', layerAlias);
		}	
	},
	
});