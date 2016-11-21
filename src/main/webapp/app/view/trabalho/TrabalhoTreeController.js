Ext.define('MCLM.view.trabalho.TrabalhoTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trabalho',
    
    // Expande toda a arvore
    onTreeExpandAll : function( button ) {
    	var tree = Ext.getCmp('trabalhoTree');
    	tree.expandAll();
    },
    
    // Recolhe toda a arvore
    onTreeCollapseAll : function( button ) {
    	var tree = Ext.getCmp('trabalhoTree');
    	tree.collapseAll();
    },
    
    // Responde ao clique em um no. Mostra os detalhes do no painel abaixo da arvore
    onLayerTreeItemClick : function( view, record, item, index, e ) {
    	//
    },
    
    // Recursivamente marca/desmarca pais dos nos até o root
    recursiveCheckParent : function( node, pChildCheckedCount ) {
	    var parent = node.parentNode;
	    if( parent ) {
	    	parent.set('checked', !!pChildCheckedCount);
	    	this.recursiveCheckParent( parent, pChildCheckedCount );
	    }
    },
    
    clearCheckToTheRoot : function ( parentNode ) {
    	var me = this;
	    
	    var pChildCheckedCount = 0;
	    parentNode.suspendEvents();
	    parentNode.eachChild(function(c) { 
	        if (c.get('checked')) pChildCheckedCount++; 

	    });
	    
       	me.recursiveCheckParent( parentNode, pChildCheckedCount );	    	
    },
    
    // Quando o estado do no muda (selecionado/nao selecionado)
    // Adiciona ou remove uma camada na lista de camadas e no mapa
    onLayerTreeCheckChange : function( node, checked, eOpts ) {
    	if ( !node.isLeaf() ) {
			Ext.Msg.alert('Operação Inválida', ' Não é permitido marcar um grupo de camadas. Você deve marcar as camadas individualmente.' );
			node.set('checked',false);
			return;
    	}
    	var me = this;
	    p = node.parentNode;
	    var pChildCheckedCount = 0;
	    p.suspendEvents();
	    p.eachChild(function(c) { 
	        if (c.get('checked')) pChildCheckedCount++; 

	    });
       	me.recursiveCheckParent( node, pChildCheckedCount );	    
	    p.resumeEvents();
	    this.toggleNode( node );
    },

    // Mosta o menu de contexto quando clica com botao direito do mouse em um no da arvore
    onContextMenu : function( tree, record, item, index, e, eOpts ) {
    	var me = this;
	    var menu_grid = new Ext.menu.Menu({ 
	    	items: [
	          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { me.askDeleteLayer( record ); } },
	          { xtype: 'menuseparator' },
	          { iconCls: 'add-folder-icon', text: 'Criar Nova Pasta', handler: function() { me.addNewFolder(record); } },
	        ]
	    });
	    var position = [e.getX()-10, e.getY()-10];
	    menu_grid.showAt( position );
		e.stopEvent();    	
    },
    
    // Adiciona uma nova pasta na arvore 
    addNewFolder : function( record ) {
		var data = record.data;
		record.expand();
		
    	var newFolderWindow = Ext.getCmp('newFolderWindow');
    	if ( newFolderWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova pasta em " + path,
    	
    	newFolderWindow = Ext.create('MCLM.view.addfolder.NewFolderWindow');
    	newFolderWindow.setTitle( title );

    	newFolderWindow.show();	

		var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );   
		
		var trabalhoAddFolder = Ext.getCmp('trabalhoAddFolder');
		trabalhoAddFolder.setValue( 'true' );  		
    	
    	Ext.getCmp('newFolderName').focus(true, 100);    	
    },
    
    loadScenery : function() {
    	var cenarioWindow = Ext.getCmp('cenarioWindow');
    	if ( cenarioWindow ) return;
    	cenarioWindow = Ext.create('MCLM.view.cenarios.CenarioWindow');
    	cenarioWindow.show();
    },
    
	askDeleteLayer: function( record ) {
		var parentNode = record.parentNode;
		var data = record.data;
		var name = data.layerAlias;
		var me = this;

		// nao pode apagar o root
		var id = record.get('id');
		if ( id == 0 ) {
			return true;
		}
		
		Ext.Msg.confirm('Apagar Camada', 'Deseja realmente apagar a Camada "' + name + '" ?', function( btn ){
			   if( btn === 'yes' ){
				   record.set("checked",false);
				   me.clearCheckToTheRoot( record );
				   me.deleteLayer( parentNode, data );
			   } else {
			       return;
			   }
		 });	
		
	},
	
	// Efetivamente apaga uma camada
	deleteLayer : function ( parentNode, data ) {
		var nodeId = data.id;
		var layerName = data.layerName;
		var me = this;
		
 	   var layerTreeStore = Ext.getStore('store.trabalhoTree');
	   layerTreeStore.load({ node: parentNode });
	   MCLM.Map.removeLayer( layerName );
		
	},
	

	// Responde a mudanca de estado de um no ( selecionado/nao selecionado )
	toggleNode: function( node ) {
		var checked = node.get('checked');
		var layerName = node.get('layerName');
		
		if ( layerName == "" ) return;
		
		if( checked == true ) {
			// adiciona a camada no mapa
			var layer = MCLM.Map.addLayer( node );
			this.fireEvent('mountImagePreview');
		} else {
			// Remove a camada do mapa
			MCLM.Map.removeLayer( layerName );
			this.fireEvent('mountImagePreview');
		}	
	},
	
    viewready: function (tree) {
    	// nao limita o drag nesta arvore
    }	
	
});