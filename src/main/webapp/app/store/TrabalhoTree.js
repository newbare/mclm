Ext.define('MCLM.store.TrabalhoTree', {
    extend: 'Ext.data.TreeStore',
    storeId:'store.trabalhoTree',
    autoLoad : false,
    
    
    requires: [
       'MCLM.model.TrabalhoTreeModel',
    ],	    
           
	model:  'MCLM.model.TrabalhoTreeModel',    
    
	proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },

        api: {
            read: 'getCenarioTreeNode',
            create: 'createCenarioTreeNode',
            update: 'updateCenarioTreeNode',
            destroy: 'destroyCenarioTreeNode'
        },
               
        writer: {
            type:'json',
            encode:true,
            rootProperty:'data',
            writeAllFields: true
        }        
    },	
	
    plugins: [{  ptype: 'treefilter', allowParentFolders: true }],
    
    root: {
        text: 'Área de Trabalho',
        id: 0,
        index:0,
        //expanded: true,
        description : 'Raiz'
    },
    
});