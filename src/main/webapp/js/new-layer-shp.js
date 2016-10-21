var shapeWindow = null;

function newLayerShp( path, idLayerFolder, layerAlias  ) {
	
	var uploadShpPanel = Ext.create('Ext.form.Panel', {
        frame: false,
        region: 'center',
        fileUpload: true,
        bodyPadding: '10 10 0',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'under',
            labelWidth: 90
        },

        items: [{
            fieldLabel: 'Parend ID',
            width: 50,
            xtype : 'hidden',
            name: 'layerFolderID',
            readOnly: true,
            allowBlank : false,
            value:idLayerFolder
        },{
            fieldLabel: 'Titulo',
            width: 330,
            name: 'layerAlias',
            allowBlank : false,
	    }, {
            fieldLabel: 'Descrição',
            width: 330,
            name: 'description',
            allowBlank : false,
	    }, {
            fieldLabel: 'Origem',
            width: 330,
            name: 'institute',
            allowBlank : false,
	    },{
            fieldLabel: 'Camada',
            width: 350,
            name: 'layerName',
            allowBlank : false,
        },{
            xtype: 'filefield',
            id: 'shpFile',
            emptyText: 'Selecione um arquivo',
            fieldLabel: 'Arquivo',
            name: 'shpFile',
            buttonText: 'Selecionar',
        }],

        buttons: [{
            text: 'Enviar',
            handler: function(){
                var form = this.up('form').getForm();
                if( form.isValid() ){
                    
                	form.submit({
                        url: 'newSHPLayer',
                        waitMsg: 'Enviando arquivo...',
                        success: function( form, action ) {
                        	shapeWindow.close();
                        	
	            	  		// layerStore estah em "layer-tree-store.js"
	            	  		// layerTree estah em "layer-tree-tree.js"
	            	  		var selectedTreeNode = layerTree.getSelectionModel().getSelection()[0];
	            	  		layerStore.load({ node: selectedTreeNode});                        	
                        	
                        	Ext.Msg.alert('Sucesso', action.result.msg);
                        },
	                  	failure: function(form, action) {
	                  		shapeWindow.close();
	                  		Ext.Msg.alert('Falha', action.result.msg);
	                           
	                  	} 
                    });
                	
                }
            }
        }]
    });
	
	
	
	
	shapeWindow = Ext.create('Ext.Window',{
		title : "Nova Camada ShapeFile para " + path,
		width : 500,
		height: 250,
	    scrollable: false,
	    frame : false,
		layout : 'border',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
		items: [ uploadShpPanel ]
	}).show();	
    
}




