Ext.define('MCLM.view.datawindow.ConfigDataPanelsTree', {
	extend: 'Ext.tree.TreePanel',
	xtype: 'view.configDataPanelsTree',
	id: 'configDataPanelsTree',
	
    store: 'store.DataPanels',
    rootVisible: true,
    animate : false,
    
	width : 800,
	height: 350,
    
    region:'south',
    
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
    },{
        text: 'Identificador', 
        dataIndex: 'isId', 
        sortable: false,
        editor: {
			xtype: 'combobox',
			store:['Sim','Não'],	
        }        
    }],
    
    scrollable: true,
    scroll: 'both',

    tempParent : null,
    
    viewConfig: {
    	markDirty:false,
    	id:'configDataPanelsView',
        plugins: {
            ptype: 'treeviewdragdrop'
        },
        listeners: {   
        	
        	/*
            nodedragover: function( targetNode, position, dragData ){
                var rec = dragData.records[0];
                var canDrop = ( targetNode.parentNode != null );
                return canDrop;
            },
            */        	
        	
       
        	beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
        		dropHandlers.wait = true;
        		// console.log( "FROM : " + data.records[0].parentNode.data.text );
        		var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
        		configDataPanelsTree.tempParent = data.records[0].parentNode;
        		dropHandlers.processDrop();
        	},
        	
        	drop: function (node, data, overModel, dropPosition) {
        		var me = data.records[0];
        		var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
        		var oldParent = configDataPanelsTree.tempParent;
        		var currentParent = data.records[0].parentNode;
        		// console.log( "TO : " + currentParent.data.text );
        		if ( !currentParent.parentNode ) {
            		me.remove();
            		oldParent.appendChild( me );          		
        		}
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