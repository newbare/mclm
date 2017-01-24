Ext.define('MCLM.view.style.PolyStyleEditorForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.polyStyleEditorForm',
	id : 'polyStyleEditorForm',
	
    frame: false,
    
    flex : 1,
    
    fileUpload: true,
    bodyPadding: '10',
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
    	id: 'closePolyStyleEditorWindow'
   	},{
        text: 'Enviar',
        id : 'polyStyleEditorFormSubmit'
    }]
    
});
