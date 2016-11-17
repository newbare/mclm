Ext.define('MCLM.view.addfolder.NewFolderForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.newFolderForm',
	id : 'newFolderForm',
	
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

    items: [
    {
        fieldLabel: 'Nome',
        width: 330,
        name: 'newFolderName',
        id: 'newFolderName',
        allowBlank : false,
    },{
        fieldLabel: 'Parend ID',
        width: 350,
        xtype : 'hidden',
        name: 'layerFolderID',
        id:'layerFolderID',
        readOnly: true,
    }],

    buttons: [{
    	// Interceptado pelo controller 'MCLM.view.addlayer.Tif.UploadTifController'	
        text: 'Fechar',
        id : 'closeNewFolderWindow'
      },{
    	// Interceptado pelo controller 'MCLM.view.addlayer.Tif.UploadTifController'	
        text: 'Enviar',
        id : 'newFolderFormSubmit'
    }]
});
