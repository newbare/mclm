/*
 * Arvore de Camadas
 * Usa: 
 * 		layer-tree-store.js para implementar "layerStore".
 * 		wms.js para adicionar / remover camadas.
 * 		layer-stack.js para controlar as camadas selecionadas.
 * 
 * O Store solicita ao servidor os nos que sao filhos do 
 * no raiz "Camadas" criado no atributo "root" ( ID=0 )
 * no store (layer-tree-store.js)
 * 
 * O atributo "rootVisible: false" abaixo faz com que o root
 * nao seja exibido.
 * 
 * O servidor devera retornar um JSON como este:
 * 
 * [{"layerAlias":"IBGE","serviceUrl":"","index":0,"description":"Descrição Teste","cls":"","leaf":false,"serialId":"45268d4ffb","checked":false,"institute":"","id":"26","text":"IBGE","layerName":"","idNodeParent":0,"originalServiceUrl":""},{"layerAlias":"OSM","serviceUrl":"","index":1,"description":"Descrição Teste","cls":"","leaf":false,"serialId":"809f4aa016","checked":false,"institute":"","id":"27","text":"OSM","layerName":"","idNodeParent":0,"originalServiceUrl":""}]
 * 
 */
Ext.define('TreeFilter', {
    extend: 'Ext.AbstractPlugin'
        , alias: 'plugin.treefilter'

        , collapseOnClear: true                                             // collapse all nodes when clearing/resetting the filter
        , allowParentFolders: true                                         // allow nodes not designated as 'leaf' (and their child items) to  be matched by the filter

        , init: function (tree) {
            var me = this;
            me.tree = tree;

            tree.filter = Ext.Function.bind(me.filter, me);
            tree.clearFilter = Ext.Function.bind(me.clearFilter, me);
        }

        , filter: function (value, property, re) {
            var me = this
                , tree = me.tree
                , matches = []                                          // array of nodes matching the search criteria
                , root = tree.getRootNode()                                // root node of the tree
                , property = property || 'text'                          // property is optional - will be set to the 'text' propert of the  treeStore record by default
                , re = re || new RegExp(value, "ig")                     // the regExp could be modified to allow for case-sensitive, starts  with, etc.
                , visibleNodes = []                                      // array of nodes matching the search criteria + each parent non-leaf  node up to root
                , viewNode;

            if (Ext.isEmpty(value)) {                                    // if the search field is empty
                me.clearFilter();
                return;
            }

            tree.expandAll();                                            // expand all nodes for the the following iterative routines

            // iterate over all nodes in the tree in order to evalute them against the search criteria
            root.cascadeBy(function (node) {
                if (node.get(property).match(re) ) {                         // if the node matches the search criteria and is a leaf (could be  modified to searh non-leaf nodes)
                    matches.push(node)                                  // add the node to the matches array
                }
            });

            if (me.allowParentFolders === false) {                         // if me.allowParentFolders is false (default) then remove any  non-leaf nodes from the regex match
                Ext.each(matches, function (match) {
                    if (!match.isLeaf()) { Ext.Array.remove(matches, match); }
                });
            }

            Ext.each(matches, function (item, i, arr) {                 // loop through all matching leaf nodes
                root.cascadeBy(function (node) {                         // find each parent node containing the node from the matches array
                    if (node.contains(item) == true) {
                        visibleNodes.push(node)                          // if it's an ancestor of the evaluated node add it to the visibleNodes  array
                    }
                });
                if (me.allowParentFolders === true &&  !item.isLeaf()) {    // if me.allowParentFolders is true and the item is  a non-leaf item
                    item.cascadeBy(function (node) {                    // iterate over its children and set them as visible
                        visibleNodes.push(node)
                    });
                }
                visibleNodes.push(item)                                  // also add the evaluated node itself to the visibleNodes array
            });

            root.cascadeBy(function (node) {                            // finally loop to hide/show each node
                viewNode = Ext.fly(tree.getView().getNode(node));       // get the dom element assocaited with each node
                if (viewNode) {                                          // the first one is undefined ? escape it with a conditional
                    viewNode.setVisibilityMode(Ext.Element.DISPLAY);     // set the visibility mode of the dom node to display (vs offsets)
                    viewNode.setVisible(Ext.Array.contains(visibleNodes, node));
                }
            });
        }

        , clearFilter: function () {
            var me = this
                , tree = this.tree
                , root = tree.getRootNode();

            if (me.collapseOnClear) { tree.collapseAll(); }             // collapse the tree nodes
            root.cascadeBy(function (node) {                            // final loop to hide/show each node
                viewNode = Ext.fly(tree.getView().getNode(node));       // get the dom element assocaited with each node
                if (viewNode) {                                          // the first one is undefined ? escape it with a conditional and show  all nodes
                    viewNode.show();
                }
            });
        }
});


var layerTree = Ext.create('Ext.tree.Panel', {
    store: layerStore,
	xtype: 'tree-grid',
    columns: [{
        xtype: 'treecolumn', 
        text: 'Nome',
        dataIndex: 'text',
        flex: 2,
        sortable: true
    }, {
        text: 'Origem',
        dataIndex: 'institute',
        flex: 1,
        sortable: true,
        align: 'left'
    }],     
    rootVisible: false,
    
    plugins: [{  ptype: 'treefilter', allowParentFolders: true }],
    /*
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
        }
    },
    */
    scrollable: true,
    scroll: 'both',

    region:'center',
    
    useArrows: true,
    border:false,
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'forecast-icon',
        	id: 'id011',
            handler : layerTreeExpandir
        }, {
        	iconCls: 'forecast-icon',
        	id: 'id012',
            handler : layerTreeRecolher
        }, searchBar]
    }],
    listeners: {
    	itemclick: layerTreeItemClick,
        checkchange: layerTreeCheckChange,
        itemcontextmenu: contextMenu
       
    }
    
});

function contextMenu(tree, record, item, index, e, eOpts ) {
	if ( !record.data.leaf ) {
	    var menu_grid = new Ext.menu.Menu({ 
	    	items: [
	          { iconCls: 'forecast-icon', text: 'Adicionar Camada KML', handler: function() { addNewLayer(record); } },
	          { iconCls: 'add-wms-icon', text: 'Adicionar Camada WMS', handler: function() { addNewLayer(record); } },
	          { iconCls: 'grid-icon', text: 'Adicionar Camada SHP', handler: function() { addNewLayer(record); } },
	          { xtype: 'menuseparator' },
	          { iconCls: 'add-folder-icon', text: 'Criar Nova Pasta', handler: function() { addNewFolder(record); } },
	          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { deleteNodeAndChildren( record ); } }
	        ]
	    });
	} else {
	    var menu_grid = new Ext.menu.Menu({ 
	    	items: [
	          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { deleteLayer( record ); } }
	        ]
	    });
	}
    var position = [e.getX()-10, e.getY()-10];
    menu_grid.showAt( position );
	e.stopEvent();
}

function addNewFolder( node ) {
	Ext.Msg.alert( node.id + " " + node.layerAlias );
}

function addNewLayer( record ) {
	var node = record.data;
	// "newLayerWms()" estah no arquivo "new-layer-wms.js" 
	newLayerWms( record.getPath("text"), node.id, node.layerAlias );
}

function deleteNodeAndChildren( node ) {
	Ext.Msg.alert( node.id + " " + node.layerAlias );
}

function layerTreeItemClick(view, record, item, index, e ) {
	var tempData = [];
	tempData.push( record.data );
	layerDetailStore.loadData( tempData );
}

function layerTreeExpandir() {
	layerTree.expandAll();
}

function layerTreeRecolher() {
	layerTree.collapseAll();
}

// Quando o usuario marca / desmarca um no na arvore.
// Precisa agora criar ou remover a camada apropriada no mapa.
// Os dados da camada estao na variavel "node" e vieram pelo JSON quando a arvore foi montada
// e/ou o no-pai foi expandido.
// Tambem eh necessario adicionar ou remover a camada da lista de camadas ativas (Stack).
// Os metodos "addLayer" e "removeLayer" estao no arquivo "wms.js"
// "addToLayerStack" e "removeFromLayerStack" estao no arquivo "layer-stack.js"
// Para adicionar um novo atributo na camada/no basta adicionar na classe Java "TreeNode.java"
// e no store da arvore (layerStore) no arquivo "layer-tree-store.js"
// e automaticamante ele vira para ca.
function toggleNode( node ) {
	var serviceUrl = node.get('serviceUrl');
	var layerName = node.get('layerName');
	var layerAlias = node.get('layerAlias');
	var checked = node.get('checked');
	var serialId = node.get('serialId');

	if ( layerName == "" ) return;
	
	if( checked == true ) {
		addLayer( serviceUrl, layerName, layerAlias, serialId );
		addToLayerStack( node.data );
	} else {
		removeLayer( layerAlias );
		removeFromLayerStack( layerAlias )
	}	
}

function layerTreeCheckChange( node, checked, eOpts ) {
	
    node.eachChild(function(n) {
        node.cascadeBy(function(pp){
            pp.set('checked', checked);
        });
        toggleNode( n );        
    });
   
    p = node.parentNode;
    var pChildCheckedCount = 0;
    p.suspendEvents();
    p.eachChild(function(c) { 
        if (c.get('checked')) pChildCheckedCount++; 
       	p.parentNode.set('checked', !!pChildCheckedCount);
        p.set('checked', !!pChildCheckedCount);
    });
    p.resumeEvents();
    
    toggleNode( node );
    
}
	
	