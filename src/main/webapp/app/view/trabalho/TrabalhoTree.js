Ext.define('MCLM.view.trabalho.TrabalhoTree', {
	extend: 'Ext.tree.TreePanel',
	xtype: 'view.trabalhoTree',
	id: 'trabalhoTree',
    
    store: 'store.trabalhoTree',
    rootVisible: true,
    animate : false,
	requires: [
	   'MCLM.view.trabalho.TrabalhoTreeController'
	],     
	
	controller : 'trabalho',
    
    scrollable: true,
    scroll: 'both',

    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
        },
        listeners: {       
        	// Evento apos o usuario arrastar um no da arvore para baixo de outro no.
        	// Nao deu certo colocar no Controller.
        	drop: function (node, data, overModel, dropPosition) {
        		var theNode = data.records[0];
        		theNode.data.idNodeParent = overModel.data.id;
        	},
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
        	iconCls: 'loadscenery-icon',
        	id: 'id801',
            handler : 'loadScenery'
        },{
        	iconCls: 'reload-icon',
        	id: 'id802',
            handler : 'clearWorkspace'
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
		    }, {
		        target: 'id802',
		        title: 'Limpar Área de trabalho',
		        text: 'Limpa a Área de Trabalho. As modificações não gravadas no cenário atual serão perdidas.',
		        width: 150,
		        dismissDelay: 5000 
		    });			
			
		},
    	load:'onLoadNode'
        
    }      
    
    
});