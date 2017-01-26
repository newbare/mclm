Ext.define('MCLM.view.style.StyleListGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'styleListGrid',
	id: 'styleListGrid',
	border: true,
	title : '',
	store : 'store.styles', 
    frame: false,
    margin: "0 0 0 0", 
    flex:1,
    loadMask: true,
    columns:[
	     {text:'Nome', dataIndex:'featureStyleName'},
	     {text:'Cor do Ponto', dataIndex:'iconColor'},
	     {text:'Cor da Fonte', dataIndex:'textFillColor'},
	     {text:'Cor do Polígono', dataIndex:'polygonFillColor'},
	     {text:'Cor da Linha', dataIndex:'lineStrokeColor'},
	     {text:'Ícone', dataIndex:'iconSrc'},
	     {text:'Fonte', dataIndex:'textFont'},
    ],
    listeners: {
    	rowdblclick : function(grid, index, record ){
    		var theData = grid.getSelectionModel().getSelection()[0].data;
        	var styleEditorWindow = Ext.getCmp('styleEditorWindow');
        	if ( !styleEditorWindow ) styleEditorWindow = Ext.create('MCLM.view.style.StyleEditorWindow');
        	styleEditorWindow.show();
        	
        	Ext.getCmp('pointStyleEditorForm').getForm().setValues( theData );
        	Ext.getCmp('polyStyleEditorForm').getForm().setValues( theData );
        	
        	Ext.getCmp('layerStyleName').setValue( theData.featureStyleName );
    	},
    	
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        },
      
    },	 
    
    /*
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'delete-icon',
        	id: 'id302',
            handler : 'deleteScenery'
        },{
        	xtype: 'tbseparator'
        },{
        	iconCls: 'scenery-public',
        	id: 'id300',
            handler : 'makeSceneryPublic'
        },{
        	iconCls: 'scenery-private',
        	id: 'id301',
            handler : 'makeSceneryPrivate'
        },{
        	xtype: 'tbseparator'
        },{
        	iconCls: 'copy-icon',
        	id: 'id304',
            handler : 'cloneScenery'
        },{
        	iconCls: 'loadscenery-icon',
        	id: 'id303',
            handler : 'loadScenery'
        }]
    }],    
    */
});	

