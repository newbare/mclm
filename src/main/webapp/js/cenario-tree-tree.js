var cenarioTree = Ext.create('Ext.tree.Panel', {
	store: cenarioStore,
	xtype: 'tree-grid',
    columns: [{
        xtype: 'treecolumn', 
        text: 'Task',
        dataIndex: 'text',
        flex: 2,
        sortable: true
    }, {
        text: 'Duration',
        dataIndex: 'id',
        flex: 1,
        sortable: true,
        align: 'center'
    }],  	
	
	title:'Cenarios',
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
        }
    },
    scrollable: true,
    scroll: 'both',
    height: 450,
    width: 350,

    useArrows: true,
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Expandir',
            handler : cenarioTreeExpandir
        }, {
            text: 'Recolher',
            handler : cenarioTreeRecolher
        }]
    }],
    listeners: {
    	itemclick: cenarioTreeItemClick
    }
});

function cenarioTreeItemClick(view, record, item, index, e ) {
	
    Ext.Msg.alert('Clicked on a Tree Node', 
        'Node id: ' + record.get('id') + '\n' +
        'Node Text: ' + record.get('text') + '\n' +
        'Parent Node id: ' + record.get('parentId') + '\n' +
        'Is it a leaf?: ' + record.get('leaf') + '\n' +
        'Checked? ' + record.get('checked')
    );
 
}

function cenarioTreeExpandir() {
	cenarioTree.expandAll();
}

function cenarioTreeRecolher() {
	cenarioTree.collapseAll();
}
	
	