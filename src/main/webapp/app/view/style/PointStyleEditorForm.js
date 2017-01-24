Ext.define('MCLM.view.style.PointStyleEditorForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.pointStyleEditorForm',
	id : 'pointStyleEditorForm',
	
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
    },{
        xtype: 'filefield',
        id: 'kmlFile',
        emptyText: 'Selecione um arquivo',
        fieldLabel: 'Arquivo',
        name: 'kmlFile',
        buttonText: 'Selecionar',
        listeners: {
        	change: function(f , new_val) { 

                var reader = new FileReader();
                
                reader.onload = function (e) {
                	console.log( e.target.result );
                    //$('#blah').attr('src', e.target.result);
                }
                
                reader.readAsDataURL( f );        		
        		
        	}
        }
    },{
    	fieldLabel: 'Caminho do Ícone',
    	width: 330,
    	name: 'iconSrc',
    	allowBlank : false,
    }],

    buttons: [{
    	text: 'Fechar',
    	id: 'closePointStyleEditorWindow'
   	},{
        text: 'Enviar',
        id : 'pointStyleEditorFormSubmit'
    }]
    
});
