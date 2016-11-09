Ext.define('MCLM.view.addlayer.wms.LayerDetailForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.layerDetailForm',
	id : 'layerDetailForm',

    bodyPadding: 5,
    region:'south',
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'under',
        labelWidth: 90
    },	    
    url: 'newWMSLayer',
    items: [{
        fieldLabel: 'Titulo',
        width: 330,
        id:'tituloID',
        name: 'layerAlias',
    }, {
        fieldLabel: 'Descrição',
        width: 330,
        id:'descriptionID',
        name: 'description',
    }, {
        fieldLabel: 'Origem',
        width: 330,
        id:'instituteID',
        name: 'institute',
    },{
        fieldLabel: 'Camada',
        width: 350,
        xtype : 'hidden',
        name: 'layerName',
        id:'layerNameID',
        readOnly: true,
        allowBlank : false,
    },{
        fieldLabel: 'Servidor',
        width: 350,
        xtype : 'hidden',
        name: 'serverUrl',
        id:'serverUrlID',
        readOnly: true,
    },{
        fieldLabel: 'Parend ID',
        width: 350,
        xtype : 'hidden',
        name: 'layerFolderID',
        id:'parentFolderID',
        readOnly: true,
    }],
    buttons: [{
          text: 'Fechar',
	          handler: function() {
	        	  capabilitiesWindow.close();
	          }
	      },{
          text: 'Gravar',
          handler: function() {
          	  if ( capabilitiesGrid.getSelectionModel().hasSelection() ) {
					var row = capabilitiesGrid.getSelectionModel().getSelection()[0];
					var serverUrlGrid = row.get('serverUrl');
					var layerNameGrid = row.get('layerName');

					var serverUrlForm = Ext.getCmp('serverUrlID');
					serverUrlForm.setValue( serverUrlGrid );

					var layerNameForm = Ext.getCmp('layerNameID');
					layerNameForm.setValue( layerNameGrid );
					
					var layerParentForm = Ext.getCmp('parentFolderID');
					layerParentForm.setValue( layerFolderID );
					
					
					var form = layerDetailForm.getForm();
		            if ( form.isValid() ) {
		              form.submit({
		            	  	success: function(form, action) {
		            	  		capabilitiesWindow.close();
		            	  		
		            	  		// layerStore estah em "layer-tree-store.js"
		            	  		// layerTree estah em "layer-tree-tree.js"
		            	  		var selectedTreeNode = layerTree.getSelectionModel().getSelection()[0];
		            	  		layerStore.load( { node: selectedTreeNode } );
		            	  		
		            	  		Ext.Msg.alert('Sucesso', action.result.msg);
		                  	},
		                  	failure: function(form, action) {
		                  		capabilitiesWindow.close();
		                  		Ext.Msg.alert('Falha', action.result.msg);
		                           
		                  	}                		  
		              });
	              } else { 
	                  Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
	              }
		            
          	  } else {     
                  Ext.Msg.alert('Nenhuma Camada selecionada', 'Por favor, selecione uma camada e tente novamente.')
              }
		            
          }
	    }]

});
