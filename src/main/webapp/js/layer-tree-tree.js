var layerTree = Ext.create('Ext.tree.Panel', {
    store: layerStore,
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
        }
    },
    scrollable: true,
    scroll: 'both',
    height: 350,
    width: 300,
    flex:1,
    useArrows: true,
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Expandir',
            handler : layerTreeExpandir
        }, {
            text: 'Recolher',
            handler : layerTreeRecolher
        }]
    }],
    listeners: {
    	itemclick: layerTreeItemClick
    }
    
});


function layerTreeItemClick(view, record, item, index, e ) {
	
    Ext.Msg.alert('Clicked on a Tree Node', 
        'Node id: ' + record.get('id') + '\n' +
        'Node Text: ' + record.get('text') + '\n' +
        'Parent Node id: ' + record.get('parentId') + '\n' +
        'Is it a leaf?: ' + record.get('leaf') + '\n' +
        'Checked? ' + record.get('checked')
    );
 
}

function layerTreeExpandir() {
	layerTree.expandAll();
}

function layerTreeRecolher() {
	layerTree.collapseAll();
}
	
	