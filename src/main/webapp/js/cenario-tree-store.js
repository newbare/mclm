var cenarioStore = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: 'getLayersTreeNode'
    },
    root: {
        text: 'Cenarios',
        id: '0',
        expanded: true
    },
    folderSort: true,
    sorters: [{
        property: 'text',
        direction: 'ASC'
    }]
});