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
	    
	    if ( !p ) return true;
	    
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
  	          { iconCls: 'add-folder-icon', text: 'Criar Nova Pasta', handler: function() { me.addNewFolder(record); } },
	          { xtype: 'menuseparator' },
	          { iconCls: 'delete-icon', text: 'Remover', handler: function() { me.askDeleteLayer( record ); } },
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
    reloadScenery : function() {
    	var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
		trabalhoTreeStore.load({
			params:{cenario: MCLM.Globals.currentScenery}
		});      	
    },    
    // Carrega um cenario para a area de trabalho. Apaga a area de trabalho atual
    loadScenery : function() {

    	var sceneryStore = Ext.getStore('store.Scenery');
    	sceneryStore.load();
		
    	var cenarioWindow = Ext.getCmp('cenarioWindow');
    	if ( cenarioWindow ) return;
    	cenarioWindow = Ext.create('MCLM.view.cenarios.CenarioWindow');
    	cenarioWindow.show();
    	
    },

    // Salva a area de trabalho atual como um cenario
    saveScenery : function() {
    	var me = this;
    	if ( MCLM.Globals.currentScenery == -1 ) {
    		// Nao temos cenario. Abre a janela para o usuario criar um.
    		// Apos o submit do form do cenario novo eh necessario enviar os dados
    		// da arvore. Isso esta sendo feito pelo evento do submit do form em
    		// MCLM.view.cenarios.SaveCenarioController
	    	var saveCenarioWindow = Ext.getCmp('saveCenarioWindow');
	    	if ( saveCenarioWindow ) return;
	    	saveCenarioWindow = Ext.create('MCLM.view.cenarios.SaveCenarioWindow');
	    	saveCenarioWindow.show();
	    	
			Ext.getCmp('mapCenterConfigField').setValue( MCLM.Map.getMapCenter() );
			Ext.getCmp('mapZoomConfigField').setValue( MCLM.Map.getMapZoom() );	    	
			Ext.getCmp('mapaBaseID').setValue( MCLM.Map.getBaseMapName() );
			Ext.getCmp('servidorBaseID').setValue( MCLM.Map.getBaseServerURL() );
			Ext.getCmp('mapaBaseAtivoID').setValue( MCLM.Map.isBaseMapActive() );
			Ext.getCmp('gradeAtivaID').setValue( MCLM.Map.isGraticuleActive() );
			
			Ext.getCmp('nomeCenarioID').focus(true, 100);
	    	
    	} else {
    		// Salva o cenario atual.
	    	var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
	    	trabalhoTreeStore.sync({
				 params: {
				 	cenario: MCLM.Globals.currentScenery
				 },
			     success: function (batch, options) {
				    Ext.Msg.alert('Sucesso', action.result.msg);
				    me.reloadScenery();
				 },
				 failure: function (batch, options){
				    Ext.Msg.alert('Falha ao gravar camadas do Cenário', action.result.msg);
				 }	
	    	});
	    	
    	}

   	
    },    
    
	askDeleteLayer: function( record ) {
		
		var name = record.data.layerAlias;
		var me = this;

		// nao pode apagar o root
		var id = record.get('id');
		if ( id == 0 ) {
			return true;
		}
		
		Ext.Msg.confirm('Apagar Camada', 'Deseja realmente remover a Camada/Pasta "' + name + '"  do cenário atual?', function( btn ){
			   if( btn === 'yes' ){
				   record.set("checked",false);
				   me.clearCheckToTheRoot( record );
				   me.deleteLayer( record );
			   } else {
			       return;
			   }
		 });	
		
	},
	
	// Efetivamente apaga um no da arvore
	deleteLayer : function ( record ) {
		var layerName = record.data.layerName;
 	   	MCLM.Map.removeLayer( layerName );		
		record.parentNode.removeChild(record);
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