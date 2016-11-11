Ext.define('MCLM.view.config.ConfigForm', {
	extend: 'Ext.form.Panel',
	xtype: 'configForm',
	id:'configForm',
    bodyPadding: 5,
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        msgTarget: 'under',
        labelWidth: 150
    },	    
    url: 'saveConfig',
    items: [{
            fieldLabel: 'ID',
            width: 350,
            xtype : 'hidden',
            name: 'idConfig',
            readOnly: true,
            allowBlank : false,
            invalidText: 'Teste',
        },
	    {
            fieldLabel: 'Servidor de Mapa',
            width: 350,
            name: 'geoserverUrl',
            allowBlank : false,
            invalidText: 'Teste',
        },
        {
            fieldLabel: 'Camada Base',
            width: 350,
            name: 'baseLayer',
            allowBlank : false,
            invalidText: 'Teste'
        },
        {
            fieldLabel: 'Centro do Mapa',
            id : 'mapCenterConfigField',
            width: 350,
            name: 'mapCenter',
            allowBlank : false,
            invalidText: 'Teste'
        },
        {
            fieldLabel: 'Nível de Zoom',
            id : 'mapZoomConfigField',
            width: 150,
            maskRe: /[0-9.]/, 
            name: 'mapZoom',
            allowBlank : false,
            invalidText: 'Apenas números'
        },
        {
            fieldLabel: 'Usuário do GeoServer',
            width: 350,
            name: 'geoserverUser',
            allowBlank : false,
            invalidText: 'Teste'
        },
        {
            fieldLabel: 'Senha do GeoServer',
            inputType: 'password', 
            width: 350,
            allowBlank : false,
            name: 'geoserverPassword',
            invalidText: 'Teste'
        },
        {
            fieldLabel: 'Fator de Busca da Interrogação',
            width: 150,
            maskRe: /[0-9.]/, 
            name: 'queryFactorRadius',
            allowBlank : false,
            invalidText: 'Apenas números'
        },
        {
            fieldLabel: 'Host do Proxy',
            width: 350,
            name: 'proxyHost',
            invalidText: 'Teste'
        },
        {
            fieldLabel: 'Usuário do Proxy',
            width: 350,
            name: 'proxyUser',
            invalidText: 'Teste'
        },
        {
            fieldLabel: 'Senha do Proxy',
            width: 350,
            inputType: 'password',
            name: 'proxyPassword',
            invalidText: 'Teste'
        },
        {
            fieldLabel: 'Porta do Proxy',
            width: 150,
            maskRe: /[0-9.]/, 
            name: 'proxyPort',
            invalidText: 'Apenas números'
        },
        {
            fieldLabel: 'Ignorar Proxy',
            width: 350,
            name: 'nonProxyHosts',
            invalidText: 'Teste'								
        },
        {
            fieldLabel: 'Usar Proxy',
            width: 350,
            xtype: 'checkbox',
            name: 'useProxy',
            inputValue: 'true',
            invalidText: 'Teste',
        },{
            fieldLabel: 'Criar Camadas externas no servidor local',
            width: 350,
            xtype: 'checkbox',
            inputValue: 'true',
            name: 'externalLayersToLocalServer',
            invalidText: 'Teste'
        },{
            fieldLabel: 'Pasta para arquivos SHP',
            width: 350,
            allowBlank : false,
            name: 'shapeFileTargetPath',
            invalidText: 'Teste'
        },{
            fieldLabel: 'Workspace Externo',
            width: 350,
            allowBlank : false,
            name: 'externalWorkspaceName',
            invalidText: 'Teste'
        }],
    buttons: [{
        text: 'Fechar',
            handler: 'onCloseConfigForm'
    	},{
          text: 'Gravar',
          handler : 'onSubmitConfigForm'
    }]

});	
	
	