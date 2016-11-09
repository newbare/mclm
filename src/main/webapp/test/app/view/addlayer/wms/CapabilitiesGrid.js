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
        	var layerName = record.get('layerName');
        	var titulo = record.get('layerTitle');
        	var serverUrl = record.get('serverUrl');
        	
        	//addLayerToPreviewPanel( serverUrl + "wms/", layerName  );
        	
			var tituloForm = Ext.getCmp('tituloID');
			tituloForm.setValue( titulo );            	

			var descriptionForm = Ext.getCmp('descriptionID');
			descriptionForm.setValue( layerName );
			
			var comboValue = combo.getRawValue();
			var origemForm = Ext.getCmp('instituteID');
			origemForm.setValue( comboValue ); 				
			
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