var layerStore = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: 'getLayersTreeNode'
    },
    root: {
        text: 'Camadas',
        id: '000',
        expanded: true
    },
    folderSort: true,
    sorters: [{
        property: 'text',
        direction: 'ASC'
    }]
});