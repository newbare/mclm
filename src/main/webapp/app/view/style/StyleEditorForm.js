Ext.define('MCLM.view.style.StyleEditorForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.styleEditorForm',
	id : 'styleEditorForm',
	
    frame: false,
    
    requires: [
        'MCLM.view.style.StyleEditorTabContainer',
    ],    
    
    
    flex : 1,
    bodyPadding: '0',

   
    layout: {
        type: 'vbox',
        align: 'stretch'
    },      
  
    items: [{
		xtype: 'textfield',
    	fieldLabel: 'Nome do Estilo',
    	width: 100,
    	name: 'featureStyleName',
    	id: 'featureStyleName',
    	height:22,
    	margin: '5 130 20 10',
    	allowBlank : false,
    },{
        xtype: 'view.styleEditorTC',
    }],

    
    buttons: [{
    	text: 'Fechar',
    	id: 'closeStyleEditorWindow'
   	},{
        text: 'Enviar',
        id : 'styleEditorFormSubmit'
    }],
    
   
    
});
