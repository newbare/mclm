Ext.define('MCLM.view.cenarios.SaveCenarioForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.saveCenarioForm',
	id : 'saveCenarioForm',

    bodyPadding: 5,
    region:'center',
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'under',
        labelWidth: 150
    },
    
    url: 'saveCenario',
    
    items: [{
        fieldLabel: 'Nome do Cenário',
        width: 330,
        name: 'nomeCenario',
        id: 'nomeCenarioID',
    },{
        fieldLabel: 'Centro do Mapa',
        id : 'mapCenterConfigField',
        width: 350,
        name: 'mapCenter',
        allowBlank : false,
        readOnly: true,
    },{
        fieldLabel: 'Nível de Zoom',
        id : 'mapZoomConfigField',
        width: 150,
        maskRe: /[0-9.]/, 
        name: 'mapZoom',
        allowBlank : false,
        readOnly: true,
    },{
        fieldLabel: 'Descrição',
        width: 330,
        xtype:'textareafield',
        id:'descriptionID',
        name: 'description',
    },{
        fieldLabel: 'Mapa Base',
        width: 330,
        id:'mapaBaseID',
        name: 'mapaBase',
        allowBlank : false,
        readOnly: true,
    },{
        fieldLabel: 'Servidor Base',
        width: 330,
        id:'servidorBaseID',
        name: 'servidorBase',
        allowBlank : false,
        readOnly: true,
    },{
        fieldLabel: 'Mapa Base Ativo?',
        width: 330,
        id:'mapaBaseAtivoID',
        name: 'mapaBaseAtivo',
        allowBlank : false,
        readOnly: true,
    }],
    
    buttons: [{
	          text: 'Fechar',
	          handler : 'onCloseWindow'
	      },{
    		  // Interceptado pelo controller 'MCLM.view.cenarios.SaveCenarioController'	
	          text: 'Gravar',
	          handler : 'onSubmitForm'
          }
	]

});
