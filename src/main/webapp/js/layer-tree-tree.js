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
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
        }
    },
    
    scrollable: true,
    scroll: 'both',

    region:'center',
    
    useArrows: true,
    border:false,
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Expandir',
            handler : layerTreeExpandir
        }, {
            text: 'Recolher',
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
	
    var menu_grid = new Ext.menu.Menu({ 
    	items: [
          { text: 'Adicionar Pasta', handler: function() { addFolderUnderNode(record.data); } },
          { text: 'Apagar', handler: function() { deleteNodeAndChildren( node ); } }
        ]
    });
    
    var position = [e.getX()-10, e.getY()-10];
    e.stopEvent();
    menu_grid.showAt( position );
}

function addFolderUnderNode( node ) {
	Ext.Msg.alert( node.id + " " + node.layerAlias );
	/*
	 	Exemplo...
		var newTask = Ext.create('Task');
		newTask.set({
		    task: 'Task1',
		    user: 'Name',
		    duration: '10',
		    expanded: true,
		    loaded: true,
		    leaf: false,
		    icon: 'icon-leaf'
		});
		
		selNode.insertChild(0, newTask);	
	  
	 */
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
	
	