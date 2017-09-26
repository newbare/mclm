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
    	markDirty:false,
    	id:'trabalhoTreeView',
        plugins: {
            ptype: 'treeviewdragdrop'
        },
        listeners: {       
        	drop: function (node, data, overModel, dropPosition) {
        		// interceptado pelo controller 'MCLM.view.trabalho.TrabalhoTreeController'
        	},
        } 
    },        
    useArrows: true,
    border:false,
    frame : false,
    
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'export-icon',
        	id: 'exportMapBtn',
            handler : function() {
            	MCLM.Map.exportMap();
            }
        },{
        	iconCls: 'reload-icon',
        	id: 'reloadWsBtn',
            handler : 'reloadWorkspace'
        },{
        	iconCls: 'new-scenery-icon',
        	id: 'clrWsBtn',
            handler : 'clearWorkspace'
        },{
        	xtype: 'tbseparator'
        },{
        	iconCls: 'save-icon',
        	id: 'svWsBtn',
            handler : 'saveScenery'
        },{
        	iconCls: 'copy-icon',
        	id: 'svCenaryAsBtn',
        	disabled:true,
            handler : 'cloneScenery'
        },{
        	xtype: 'tbseparator'
        },{
        	iconCls: 'scenery-icon',
        	id: 'mngCenaryBtn',
            handler : 'loadScenery'
        },{
        	xtype: 'tbseparator'
        },{
        	iconCls: 'text-icon',
        	id: 'adTextBtn',
            handler : 'addTextToScenery'
        }]
    }],
        
    
    listeners: {
    
    	itemclick: 'onLayerTreeItemClick',
        checkchange: 'onLayerTreeCheckChange',
        itemcontextmenu: 'onContextMenu',
        viewready: 'viewready',
		afterrender:function(){
			
			
			
		    Ext.tip.QuickTipManager.register({
				target: 'exportMapBtn',
				title: 'Exportar',
				text: 'Exportar Cenário / Mapa atual.',
				width: 150,
				dismissDelay: 5000 
				
			},{
		        target: 'svWsBtn',
		        title: 'Salvar Cenário',
		        text: 'Salva e sobrescreve o Cenário atual.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'reloadWsBtn',
		        title: 'Recarregar Cenário',
		        text: 'Recarrega o Cenário atual.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'mngCenaryBtn',
		        title: 'Gerenciar Cenários',
		        text: 'Gerencia os Cenários (carregar, apagar, tornar público ou privado).',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'clrWsBtn',
		        title: 'Novo Cenário',
		        text: 'Cria um cenário em branco. As modificações não gravadas no cenário atual serão perdidas.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'svCenaryAsBtn',
		        title: 'Salvar Cenário como...',
		        text: 'Salva uma cópia do Cenário atual.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'adTextBtn',
		        title: 'Adicionar caixa de texto',
		        text: 'Adiciona uma caixa de texto ao Cenário.',
		        width: 150,
		        dismissDelay: 5000 
		    });			
			
			
		},
    	load:'onLoadNode'
        
    }      
    
    
});