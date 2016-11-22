Ext.define('MCLM.view.trabalho.TrabalhoTree', {
	extend: 'Ext.tree.Panel',
	xtype: 'view.trabalhoTree',
	id: 'trabalhoTree',
    
    store: 'store.trabalhoTree',
    rootVisible: true,

	requires: [
	   'MCLM.view.trabalho.TrabalhoTreeController'
	],     
	
	controller : 'trabalho',
    
    scrollable: true,
    scroll: 'both',

    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
        }
    },        
    
    useArrows: true,
    border:false,
    frame : false,
    
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'save-icon',
        	id: 'id800',
            handler : 'saveScenery'
        },{
        	iconCls: 'reload-icon',
        	id: 'id801',
            handler : 'loadScenery'
        }]
    }],
        
    
    listeners: {
    	itemclick: 'onLayerTreeItemClick',
        checkchange: 'onLayerTreeCheckChange',
        itemcontextmenu: 'onContextMenu',
        viewready: 'viewready',
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'id800',
		        title: 'Salvar como Cenário',
		        text: 'Salva o conteúdo da área de trabalho como cenário.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id801',
		        title: 'Carregar Cenário',
		        text: 'Recupera um cenário para a área de trabalho. O conteúdo atual será apagado.',
		        width: 150,
		        dismissDelay: 5000 
		    });			
			
		}
        
    }      
    
    
});