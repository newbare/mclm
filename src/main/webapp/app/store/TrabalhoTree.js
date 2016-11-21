Ext.define('MCLM.store.TrabalhoTree', {
    extend: 'Ext.data.TreeStore',
    storeId:'store.trabalhoTree',
    
    requires: [
       'MCLM.model.LayerTreeModel',
       'Ext.data.proxy.Memory',
    ],	    
           
	model:  'MCLM.model.LayerTreeModel',    
    
    proxy: { 
    	type: 'memory' 
    },	
	
    plugins: [{  ptype: 'treefilter', allowParentFolders: true }],
    
    root: {
        text: 'Área de Trabalho',
        id: 0,
        index:0,
        expanded: true,
        description : 'Raiz'
    }
    
});