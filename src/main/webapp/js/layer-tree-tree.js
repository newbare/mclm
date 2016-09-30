/*
 * Arvore de Camadas
 * Usa: 
 * 		layer-tree-store.js
 * 
 * O Store solicita ao servidor os nos que sao filhos do 
 * no raiz "Camadas" criado no atributo "root" ( ID=0 ).
 * 
 * O atributo "rootVisible: false" abaixo faz com que o root
 * nao seja exibido.
 * 
 * O servidor devera retornar um JSON como este:
 * 
 * [ 
 * 	{"serviceUrl":"","index":0,"description":"Descrição Teste","checked":false,"institute":"","id":"26","cls":"","text":"IBGE","layerName":"","leaf":false,"idNodeParent":0,"originalServiceUrl":""},
 * 	{"serviceUrl":"","index":1,"description":"Descrição Teste","checked":false,"institute":"","id":"27","cls":"","text":"OSM","layerName":"","leaf":false,"idNodeParent":0,"originalServiceUrl":""}
 * ]
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
    height: 450,
    width: 300,
    useArrows: true,
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
        checkchange: layerTreeCheckChange
    }
    
});


function layerTreeItemClick(view, record, item, index, e ) {
	layerTreeDetails.getForm().setValues( item.attributes );

	console.log( record );
	// Click
	
}

function layerTreeExpandir() {
	layerTree.expandAll();
}

function layerTreeRecolher() {
	layerTree.collapseAll();
}

function toggleNode( node ) {
	var serviceUrl = node.get('serviceUrl');
	var serverLayers = node.get('layerName');
	var layerName = node.get('layerAlias');
	var checked = node.get('checked');
	
	if( checked == true ) {
		addLayer( serviceUrl, serverLayers, layerName );
	} else {
		removeLayer( layerName );
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
	
	