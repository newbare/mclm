var configForm = null;
var configWindow = null;

function onCloseMessage() {
	location.reload(); 
}

function checkInternetConnection() {
	var box = Ext.MessageBox.wait('Aguarde alguns instantes enquanto a conexão com a Internet é testada.', 'Verificando Conectividade');
	
	Ext.Ajax.request({
		url: 'internetAccessTest',
		
		success: function(response, opts) {
			box.hide();
			var result = Ext.decode( response.responseText );
			if( result.conectado ) {
				Ext.Msg.alert('Conectado', 'O Sistema consegue acessar a Internet sem problemas.');
			} else {
				Ext.Msg.alert('Não Conectado', 'O Sistema não é capaz de acessar a Internet. Verifique as configurações de Proxy.');
			}
		},
		failure: function(response, opts) {
			box.hide();
			Ext.Msg.alert('Erro ao tentar verificar a conexão com a Internet.' );
		}
	});			
}

function showConfig() {

	Ext.Ajax.request({
		url: 'getConfig',
		success: function(response, opts) {
			showConfigForm();
			var config = Ext.decode(response.responseText);
			configForm.getForm().setValues( config );
		},
		failure: function(response, opts) {
			Ext.Msg.alert('Erro ao receber a configuração do servidor' );
		}
	});			
	
}

function showConfigForm() {

	configForm = Ext.create('Ext.form.Panel', {
	    bodyPadding: 5,
	    defaultType: 'textfield',
	    url: 'saveConfig',
	    items: [{
	            fieldLabel: 'ID',
	            width: 350,
	            msgTarget: 'under',
	            xtype : 'hidden',
	            name: 'idConfig',
	            readOnly: true,
	            allowBlank : false,
	            invalidText: 'Teste',
	        },
		    {
	            fieldLabel: 'Servidor de Mapa',
	            width: 350,
	            msgTarget: 'under',
	            name: 'geoserverUrl',
	            allowBlank : false,
	            invalidText: 'Teste',
	        },
	        {
	            fieldLabel: 'Camada Base',
	            width: 350,
	            msgTarget: 'under',
	            name: 'baseLayer',
	            allowBlank : false,
	            invalidText: 'Teste'
	        },
	        {
	            fieldLabel: 'Centro do Mapa',
	            id : 'mapCenterConfigField',
	            width: 350,
	            msgTarget: 'under',
	            name: 'mapCenter',
	            allowBlank : false,
	            invalidText: 'Teste'
	        },
	        {
	            fieldLabel: 'Nível de Zoom',
	            id : 'mapZoomConfigField',
	            width: 150,
	            maskRe: /[0-9.]/, 
	            msgTarget: 'under',
	            name: 'mapZoom',
	            allowBlank : false,
	            invalidText: 'Apenas números'
	        },
	        {
	            fieldLabel: 'Usuário do GeoServer',
	            width: 350,
	            msgTarget: 'under',
	            name: 'geoserverUser',
	            allowBlank : false,
	            invalidText: 'Teste'
	        },
	        {
	            fieldLabel: 'Senha do GeoServer',
	            inputType: 'password', 
	            width: 350,
	            msgTarget: 'under',
	            allowBlank : false,
	            name: 'geoserverPassword',
	            invalidText: 'Teste'
	        },
	        {
	            fieldLabel: 'Fator de Busca da Interrogação',
	            width: 150,
	            maskRe: /[0-9.]/, 
	            msgTarget: 'under',
	            name: 'queryFactorRadius',
	            allowBlank : false,
	            invalidText: 'Apenas números'
	        },
	        {
	            fieldLabel: 'Host do Proxy',
	            width: 350,
	            msgTarget: 'under',
	            name: 'proxyHost',
	            invalidText: 'Teste'
	        },
	        {
	            fieldLabel: 'Usuário do Proxy',
	            width: 350,
	            msgTarget: 'under',
	            name: 'proxyUser',
	            invalidText: 'Teste'
	        },
	        {
	            fieldLabel: 'Senha do Proxy',
	            width: 350,
	            inputType: 'password',
	            msgTarget: 'under',
	            name: 'proxyPassword',
	            invalidText: 'Teste'
	        },
	        {
	            fieldLabel: 'Porta do Proxy',
	            width: 150,
	            maskRe: /[0-9.]/, 
	            msgTarget: 'under',
	            name: 'proxyPort',
	            invalidText: 'Apenas números'
	        },
	        {
	            fieldLabel: 'Ignorar Proxy',
	            width: 350,
	            msgTarget: 'under',
	            name: 'nonProxyHosts',
	            invalidText: 'Teste'								
	        },
	        {
	            fieldLabel: 'Usar Proxy',
	            width: 350,
	            xtype: 'checkbox',
	            msgTarget: 'under',
	            name: 'useProxy',
	            inputValue: 'true',
	            invalidText: 'Teste',
	        },{
	            fieldLabel: 'Criar Camadas externas no servidor local',
	            width: 350,
	            xtype: 'checkbox',
	            inputValue: 'true',
	            msgTarget: 'under',
	            name: 'externalLayersToLocalServer',
	            invalidText: 'Teste'
	        }],
	    buttons: [{
            text: 'Fechar',
	            handler: function() {
	            	configWindow.close();
	            }
	    	},{
              text: 'Gravar',
              handler: function() {
            	  //var checkbox = Ext.getCmp('cbUseProxy');
                  //alert( checkbox.getValue() );
            	  
                  var form = configForm.getForm();
                  if ( form.isValid() ) {
                	  form.submit({
                          success: function(form, action) {
                              Ext.Msg.alert('Sucesso', action.result.msg, onCloseMessage);
                           },
                           failure: function(form, action) {
                               Ext.Msg.alert('Failed', action.result.msg, onCloseMessage);
                           }                		  
                	  });
                  } else { 
                      Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
                  }
                  
              }
	    }]
	
	});	
	
	
	configWindow = Ext.create('Ext.Window',{
		title : "Configurações",
		width : 377,
		height: 500,
	    scrollable: false,
	    frame : false,
		layout : 'fit',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
		items : [ configForm ]
	}).show();		
		
}