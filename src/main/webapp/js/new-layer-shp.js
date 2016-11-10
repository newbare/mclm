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
            xtype: 'filefield',
            id: 'shpFile',
            emptyText: 'Selecione um arquivo',
            fieldLabel: 'Arquivo',
            name: 'shpFile',
            buttonText: 'Selecionar',
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
	        	  shapeWindow.close();
	          }
	      },{
            text: 'Enviar',
            handler: function(){
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




