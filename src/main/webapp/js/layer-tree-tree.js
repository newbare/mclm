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
    	itemclick: layerTreeItemClick,
        checkchange: function(node, checked, eOpts){
        	
            node.eachChild(function(n) {
                node.cascadeBy(function(n){
                    n.set('checked', checked);
                });
            });


            //check parent node if child node is check
            p = node.parentNode;
            var pChildCheckedCount = 0;
            p.suspendEvents();
            p.eachChild(function(c) { 
                if (c.get('checked')) pChildCheckedCount++; 
                    p.parentNode.set('checked', !!pChildCheckedCount);
                    p.set('checked', !!pChildCheckedCount);
                });
            p.resumeEvents();
        }    

    }
});


function layerTreeItemClick(view, record, item, index, e ) {
	
    //Ext.Msg.alert('Clicked on a Tree Node', 'Node id: ' + record.get('serviceUrl')  );
    Ext.Msg.alert('Clicked on a Tree Node', 
            'Node id: ' + record.get('id') + '\n' +
            'Node index: ' + record.get('index') + '\n' +
            'Node Text: ' + record.get('text') + '\n' +
            'Parent Node id: ' + record.get('parentId') + '\n' +
            'Is it a leaf?: ' + record.get('leaf') + '\n' +
            'Checked? ' + record.get('checked')
     );
	
}

function layerTreeExpandir() {
	layerStore.save();
	//layerTree.expandAll();
}

function layerTreeRecolher() {
	layerTree.collapseAll();
}
	
	