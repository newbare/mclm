Ext.define('MCLM.view.rotas.CalcRotaForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.calcRotaForm',
	id : 'calcRotaForm',
	
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
    }],

    buttons: [{
    	// Interceptado pelo controller 'MCLM.view.addlayer.Tif.UploadTifController'	
        text: 'Fechar',
        id : 'closeRotaWindow'
      },{
    	// Interceptado pelo controller 'MCLM.view.addlayer.Tif.UploadTifController'	
        text: 'Criar',
        id : 'calcRotaFormSubmit'
    }]
});
