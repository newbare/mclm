Ext.define('MCLM.view.trabalho.TrabalhoTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trabalho',
    
    init : function(app) {
        this.control({
            '#trabalhoTreeView' : {
            	drop: this.afterDropNode 
            }
            
        });
    },     
    
    listen : {
        controller : {
            '*' : { 
            	// Disparado por MCLM.view.paineis.LayerTreeController ao mudar o estado de uma camada.
            	syncLayerNodeInTrabalhoTree : 'syncLayerNodeInTrabalhoTree',
            	afterDropNode : 'afterDropNode',
            	doClearWorkspace : 'doClearWorkspace'
            }
        }
    },     
    // Disparado apos um no ser movido para outra pasta
    afterDropNode : function  (node, data, overModel, dropPosition) {
		var theNode = data.records[0];
		theNode.data.idNodeParent = overModel.data.id;
    },
    
    // Marca/desmarca camadas de acordo com a arvore principal.
    // Disparado por MCLM.view.paineis.LayerTreeController ao mudar o estado de uma camada.
    syncLayerNodeInTrabalhoTree : function( serialId, status ) {
    	var trabalhoTree = Ext.getCmp("trabalhoTree");
    	var node = trabalhoTree.getRootNode().findChild('serialId',serialId,true);
    	if ( node ) {
	    	node.set('checked', status );
	    	node.dirty = true;
	    	this.clearCheckToTheRoot ( node.parentNode );
    	}
    	return true;
    },
        
    
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
    // Limpa a área de trabalho
    doClearWorkspace : function() {
    	var me = this;
		var tree = Ext.getCmp('trabalhoTree');
		var root = tree.getRootNode();
		root.set("text","Área de Trabalho");
		root.set("checked",false);
		
    	var painelEsquerdo = Ext.getCmp('painelesquerdo');
    	painelEsquerdo.setTitle("");		    		
		
    	// Limpa a arvore principal
    	var layerTree = Ext.getCmp("layerTree");
    	layerTree.getRootNode().cascade( function(node) { 
    		node.set('checked', false );
		});   
    	
    	
    	// Apaga do layer stack
    	var trabalhoTree = Ext.getCmp("trabalhoTree");
    	trabalhoTree.getRootNode().cascade( function(node) { 
    		node.set('checked', false );
    		me.toggleNode( node );
		});			    	
    	
    	// Limpa a arvore do cenario (trabalho)
		root.removeAll();
		MCLM.Globals.currentScenery = -1;
		
		var cloneSceneryButton = Ext.getCmp('id803'); 
		cloneSceneryButton.disable();
		
    },
    // Pergunta se deseja limpar a área de trabalho
    clearWorkspace : function() {
    	var me = this;
		Ext.Msg.confirm('Limpar Área de Trabalho', 'Deseja realmente limpar a Área de trabalho? As alterações não gravadas serão perdidas.', function( btn ){
			   if( btn === 'yes' ){
				   me.doClearWorkspace();
			   } else {
			       return;
			   }
		 });
		
    },
    //
    onLoadNode : function(loader, nodes, response) {
    	var me = this;
    	for (x=0; x< nodes.length; x++  ) {
    		var node = nodes[x];
            var chk = node.get('checked');
            var layerName = node.get('layerName');
            var serialId = node.get('serialId');
            
            if ( layerName ) {
            	// Evento interceptado pelo controller da árvore principal. 
            	// 'MCLM.view.main.MainController'. Marca/desmarca camada de acordo o status da mesma camada do cenário.
    			this.fireEvent( "syncLayerNodeInMainTree", serialId, chk );
            	if ( chk ) {
					var layer = MCLM.Map.addLayer( node );
					me.clearCheckToTheRoot( node.parentNode );
            	}
            }
            
    	}
		this.fireEvent('mountImagePreview');		                    	
	},
    
    // Recursivamente marca/desmarca pais dos nos até o root
    recursiveCheckParent : function( node, pChildCheckedCount ) {
	    if( node ) {
	    	node.set('checked', !!pChildCheckedCount);
	    	var parent = node.parentNode;
	    	this.recursiveCheckParent( parent, pChildCheckedCount );
	    }
    },
    
    clearCheckToTheRoot : function ( parentNode ) {
    	var me = this;
	    
	    var pChildCheckedCount = 0;
	    parentNode.suspendEvents();
	    parentNode.eachChild(function(c) { 
	        if ( c.get('checked') ) pChildCheckedCount++; 
	    });
	    
	    parentNode.set('checked', !!pChildCheckedCount);
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
	    var serialId = node.get('serialId');
	    // Interceptado por 'MCLM.view.paineis.LayerTreeController'
	    this.fireEvent( "syncLayerNodeInMainTree", serialId, checked );
	    
	    this.toggleNode( node );
	    node.dirty = true;
	    node.set("selected", node.get("checked") );
	    
	    var p = node.parentNode;
	    if ( !p ) return true;
	    me.clearCheckToTheRoot( p );
	    
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
			params:{cenario: MCLM.Globals.currentScenery},
		    callback: function(records, operation, success) {
		    	if ( success ) {
		    		var tree = Ext.getCmp('trabalhoTree');
		    		var root = tree.getRootNode();
		    		if( root ) {
		    			root.collapse();
		    			tree.expandAll();
		    		}	
		    	}
		    }
		});      	
    },    
    // Abre a janela de seleção de cenários para carregar um cenario para a area de trabalho.
    loadScenery : function() {
    	var sceneryStore = Ext.getStore('store.Scenery');
    	sceneryStore.load();
    	sceneryStore.sort('sceneryName','ASC');
    	
    	var cenarioWindow = Ext.getCmp('cenarioWindow');
    	if ( cenarioWindow ) return;
    	cenarioWindow = Ext.create('MCLM.view.cenarios.CenarioWindow');
    	cenarioWindow.show();
    },
    // Apos salvar um cenario existente (estrutura das arvores),
    // eh preciso salvar os dados do cenario (zoom, center, etc)
    updateSceneryData : function() {
    	
		var mapCenter = MCLM.Map.getMapCenter();
		var mapZoom = MCLM.Map.getMapZoom();	    	
		var mapaBase = MCLM.Map.getBaseMapName();
		var servidorBase = MCLM.Map.getBaseServerURL();
		var mapaBaseAtivo = MCLM.Map.isBaseMapActive();
		var gradeAtiva = MCLM.Map.isGraticuleActive();
		var mapBbox = MCLM.Map.getMapCurrentBbox();		    	
    	
		Ext.Ajax.request({
			url: 'updateSceneryData',
		    params: {
		        'idScenery' 	: MCLM.Globals.currentScenery,
		        'mapCenter' 	: mapCenter,
		        'mapZoom' 		: mapZoom,
		        'mapaBase' 		: mapaBase,
		        'servidorBase' 	: servidorBase,
		        'mapaBaseAtivo' : mapaBaseAtivo,
		        'gradeAtiva' 	: gradeAtiva,
		        'mapBbox' 		: mapBbox,
		    },						
			success: function(response, opts) {				   
			    Ext.Msg.alert('Sucesso', 'Cenário gravado.');
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Erro','Não foi possível atualizar os dados do cenário.' );
			}
		});
		
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
			Ext.getCmp('mapBbox').setValue( MCLM.Map.getMapCurrentBbox() );			
			
			Ext.getCmp('nomeCenarioID').focus(true, 100);
	    	
    	} else {
    		// Salva o cenario atual.
	    	var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
	    	trabalhoTreeStore.sync({
				 params: {
				 	cenario: MCLM.Globals.currentScenery
				 },
			     success: function (action, options) {
			    	 me.reloadScenery(); 
				 },
				 failure: function (action, options){
				    Ext.Msg.alert('Falha', 'Falha ao gravar as camadas do Cenário.');
				 }	
	    	});
	    	
	    	me.updateSceneryData();	    	
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
		var serviceUrl = node.get('serviceUrl' );
		var serialId = node.get('serialId' );
		
		if ( layerName == "" ) return;
		
		if( checked == true ) {
			// adiciona a camada no mapa
			//var layer = MCLM.Map.addLayer( node );
			
			// Para pegar a camada como features, descomente a linha abaixo.
			MCLM.Map.getLayerAsFeatures( node, serialId );
			
			this.fireEvent('mountImagePreview');
		} else {
			// Remove a camada do mapa
			MCLM.Map.removeLayer( serialId );
			this.fireEvent('mountImagePreview');
		}	
	},
	
    viewready: function (tree) {
    	// nao limita o drag nesta arvore
    }	
	
});