Ext.define('MCLM.view.datawindow.ConfigDataPanelsTree', {
	extend: 'Ext.tree.TreePanel',
	xtype: 'view.configDataPanelsTree',
	id: 'configDataPanelsTree',
	
    store: 'store.DataPanels',
    rootVisible: true,
    animate : false,
    
    
	requires: [
	   'MCLM.view.datawindow.ConfigDataPanelsTreeController'
	],     
	controller : 'configDataPanelsTreeController',
    
    
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        listeners: {
            beforeedit: function( e, editor, options ){
            	var isLeaf =  editor.record.get("leaf") ;
                if ( !isLeaf ) return false;
            }
        }        
    },
             
    columns: [{
        xtype: 'treecolumn', 
        text: 'Nome',
        dataIndex: 'text',
        width : 260,
        sortable: false
    },{
        text: 'Título', 
        dataIndex: 'newName',
        sortable: false,
        width : 200,
        editor: {
            xtype: 'textfield'
        }        
    },{
        text: 'Tipo Original', 
        dataIndex: 'dataType', 
        sortable: false,
    },{
        text: 'Novo Tipo', 
        dataIndex: 'newType', 
        sortable: false,
        queryMode: 'local',
        editor: {
			xtype: 'combobox',
			store:['TEXT','COLOR','URL','SYMBOL'],	
        }        
    }],
    
    
    scrollable: true,
    scroll: 'both',

    viewConfig: {
    	markDirty:false,
    	id:'configDataPanelsView',
        plugins: {
            ptype: 'treeviewdragdrop'
        },
        listeners: {   
        	beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
        		dropHandlers.wait = true;
        		var target = overModel.data;
        		
        		//if ( target.parentId == 0 ) dropHandlers.cancelDrop(); else
        		dropHandlers.processDrop();
        		
        	},
        	
        	drop: function (node, data, overModel, dropPosition) {
        		//alert("owch");
        	},
        } 
    },        
    useArrows: true,
    border:false,
    frame : false,   
    

    listeners: {
    	 viewready: 'viewready',
    }
    
});