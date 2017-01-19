 


// SUBMIT PARA newFeatureStyle Action

Ext.define('MCLM.view.style.StyleEditorForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.styleEditorForm',
	id : 'styleEditorForm',
	
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
    	fieldLabel: 'Atributo de Exibição',
    	width: 330,
    	name: 'displayColumn',
    	allowBlank : false,
    },
    {
    	fieldLabel: 'Caminho do Ícone',
    	width: 330,
    	name: 'iconSrc',
    	allowBlank : false,
    }],

    buttons: [{
        text: 'Fechar',
        id : 'closeStyleEditorWindow'
      },{
    	// SUBMIT PARA newFeatureStyle Action
        text: 'Enviar',
        id : 'styleEditorFormSubmit'
    }]
});
