Ext.define('MCLM.view.addlayer.wms.CapabilitiesGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'capabilitiesGrid',
	id: 'capabilitiesGrid',
	border: true,
	title : '',
	store : 'store.Capabilities',
    frame: false,
    margin: "0 0 0 0", 
    listeners: {
    	// atualiza a janela de preview com a camada selecionada na lista
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        	// Interceptado pelo controller 'MCLM.view.addlayer.wms.CapabilitiesController'
        }
    },	    
    region:'center',
    loadMask: true,
    columns:[
	     {text:'Título', dataIndex:'layerTitle', width:200},
	     {text:'Camada', dataIndex:'layerName', width:200},
	     {text:'URL', dataIndex:'serverUrl', width:200, xtype : 'hidden'},
	     {text:'Consultável', dataIndex:'queryable', width:70, xtype: 'booleancolumn', falseText:'Não', trueText: 'Sim'}
    ]
});	