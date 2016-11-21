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
		
		if( record.data.readOnly ) {
			$("#id_lock_icon").css("display","block");
		}
		
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
    	if ( !record.data.leaf ) {
		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
		          { iconCls: 'kml-icon', text: 'Adicionar Camada KML', handler: function() { me.addNewLayerKML(record); } },
		          { iconCls: 'wms-icon', text: 'Adicionar Camada WMS', handler: function() { me.addNewLayerWMS(record); } },
		          { iconCls: 'shp-icon', text: 'Adicionar Camada SHP', handler: function() { me.addNewLayerSHP(record); } },
		          { iconCls: 'tif-icon', text: 'Adicionar Camada TIF', handler: function() { me.addNewLayerTIF(record); } },
		          { xtype: 'menuseparator' },
		          { iconCls: 'add-folder-icon', text: 'Criar Nova Pasta', handler: function() { me.addNewFolder(record); } },
		          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { me.askDeleteFolder( record ); } },
		        ]
		    });
		} else {
		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
				  { iconCls: 'add-scenery-icon', text: 'Copiar para Área de Trabalho', handler: function() { me.addToScenery(record); } },
				  { xtype: 'menuseparator' },
		          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { me.askDeleteLayer( record ); } }
		        ]
		    });
		}
	    var position = [e.getX()-10, e.getY()-10];
	    menu_grid.showAt( position );
		e.stopEvent();    	
    },
    // Adiciona para o cenario atual / area de trabalho
    addToScenery : function( record ) {
    	var trabalhoTree = Ext.getCmp('trabalhoTree');
    	var root = trabalhoTree.getRootNode();
    	var copy = record.copy();    
    	var x = 0;
    	
    	root.cascadeBy( function(n) { 
    		n.set('id', x);
    		x++;
    	});
    	
    	copy.set('id', x);
    	root.appendChild( copy );
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
		trabalhoAddFolder.setValue( 'false' );      
		
    	Ext.getCmp('newFolderName').focus(true, 100);    	
    },
    
    // Pergunta se quer deletar uma camada / no da arvore
	askDeleteLayer: function( record ) {
		var parentNode = record.parentNode;
		var data = record.data;
		var name = data.layerAlias;
		var me = this;

		if ( record.data.readOnly ) {
			Ext.MessageBox.show({
				title: 'Camada Bloqueada',
				msg: 'Não é possível apagar esta camada.',
				buttons: Ext.MessageBox.OK,
				icon: 'lock-icon'
			});			
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
	
    // Pergunta se quer deletar uma camada / no da arvore
	askDeleteFolder: function( record ) {
		var parentNode = record.parentNode;
		var data = record.data;
		var name = data.layerAlias;
		var me = this;
		
		if ( record.data.readOnly ) {
			
			Ext.MessageBox.show({
				title: 'Pasta Bloqueada',
				msg: 'Não é possível apagar esta pasta.',
				buttons: Ext.MessageBox.OK,
				icon: 'lock-icon'
			});			
			
			return true;
		}
		
		if ( record.data.childrenCount > 0 ) {
			Ext.Msg.alert('Apagar Pasta', 'Não é possível apagar pastas com camadas ou outras pastas. Remova todas as camadas e pastas desta pasta antes.');
			return true;
		}
		
		Ext.Msg.confirm('Apagar Pasta', 'Deseja realmente apagar a pasta "' + name + '" ?', function( btn ){
			   if( btn === 'yes' ){
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
		
		Ext.Ajax.request({
		       url: 'deleteLayer',
		       params: {
		           'nodeId': nodeId 
		       },       
		       success: function(response, opts) {
		    	   var result = JSON.parse( response.responseText );
		    	   
		    	   var layerTreeStore = Ext.getStore('store.layerTree');
		    	   layerTreeStore.load({ node: parentNode });
		    	   MCLM.Map.removeLayer( layerName );
		    	   
		    	   Ext.Msg.alert('Sucesso', result.msg );

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
		record.expand();
		
    	var capabilitiesWindow = Ext.getCmp('capabilitiesWindow');
    	if ( capabilitiesWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada WMS para " + path;
    	
    	capabilitiesWindow = Ext.create('MCLM.view.addlayer.wms.CapabilitiesWindow');
    	capabilitiesWindow.setTitle( title );
    	capabilitiesWindow.show();		
    	
    	// Interceptado pelo controller 'MCLM.view.addlayer.wms.CapabilitiesController'
    	this.fireEvent('createMapPreview', record);
	},
	
	// Abre o dialogo para adicionar uma camada SHP
	addNewLayerSHP : function ( record ) {
		var data = record.data;
		record.expand();
		
    	var uploadShpWindow = Ext.getCmp('uploadShpWindow');
    	if ( uploadShpWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada ShapeFile para " + path,
    	
    	uploadShpWindow = Ext.create('MCLM.view.addlayer.shp.UploadShpWindow');
    	uploadShpWindow.setTitle( title );

    	uploadShpWindow.show();	

		var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );      
    	
    	Ext.getCmp('newLayerShpAlias').focus(true, 100);
    	
	},
	// Abre o dialogo para adicionar uma camada GeoTIFF
	addNewLayerTIF : function ( record ) {
		var data = record.data;
		record.expand();
		
    	var uploadTifWindow = Ext.getCmp('uploadTifWindow');
    	if ( uploadTifWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada GeoTIFF para " + path,
    	
    	uploadTifWindow = Ext.create('MCLM.view.addlayer.tif.UploadTifWindow');
    	uploadTifWindow.setTitle( title );

    	uploadTifWindow.show();	

		var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );      
    	
    	Ext.getCmp('newLayerTifAlias').focus(true, 100);
    	
	},
	
	
	// Abre o dialogo para adicionar uma camada KML
	addNewLayerKML : function ( record ) {
		var data = record.data;
		record.expand();
		
    	var uploadKmlWindow = Ext.getCmp('uploadKmlWindow');
    	if ( uploadKmlWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada KML para " + path,
    	
    	uploadKmlWindow = Ext.create('MCLM.view.addlayer.kml.UploadKmlWindow');
    	uploadKmlWindow.setTitle( title );

    	uploadKmlWindow.show();	

		var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );      
    	
    	Ext.getCmp('newLayerKmlAlias').focus(true, 100);
    	
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
        var view = tree.getView();
        var dd = view.findPlugin('treeviewdragdrop');
        
        dd.dragZone.onBeforeDrag = function (data, e) {
            var rec = view.getRecord(e.getTarget(view.itemSelector));
            return !rec.data.readOnly;
        };
    }	
	
});