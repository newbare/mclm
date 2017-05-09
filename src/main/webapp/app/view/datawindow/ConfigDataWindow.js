Ext.define('MCLM.view.datawindow.ConfigDataWindow', {
	extend: 'Ext.Window',
	xtype : 'view.configDataWindow',
	id : 'configDataWindow',
	title : "Configurar / Criar Janela de Dados",
	bodyPadding: 10,
	
	width : 400,
	height: 350,
	
    requires: [
        'MCLM.view.datawindow.ConfigDataWindowController',
	],	
    controller : 'configDataWindow',	

    scrollable: false,
    frame : false,
    
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),
    
	nodeData : null,
	resizable: false,
	

    items : [{
	    	xtype : 'textfield',
	        fieldLabel: 'Tabela de Aquisição',
	        width: 350,
	        id: 'tableName',
	        allowBlank : false,
	},{
    	xtype : 'textfield',
        fieldLabel: 'Endereço do Servidor',
        width: 350,
        id: 'serverAddress',
        allowBlank : false,
	},{
    	xtype : 'textfield',
        fieldLabel: 'Nome do Banco de Dados',
        width: 350,
        id: 'databaseName',
        allowBlank : false,
	},{
    	xtype : 'textfield',
        fieldLabel: 'Usuário do Banco de Dados',
        width: 350,
        id: 'user',
        allowBlank : false,
	},{
    	xtype : 'textfield',
        fieldLabel: 'Senha do Banco de Dados',
        width: 350,
        id: 'password',
        allowBlank : false,
	},{
    	xtype : 'textfield',
        fieldLabel: 'Porta do Banco de Dados',
        width: 350,
        id: 'serverPort',
        allowBlank : false,
	}],	
	
    dockedItems: [{
        xtype: 'toolbar',
        border: false,
        items: [{
        	iconCls: 'save-icon',
        	id: 'getTableSchemaBtn',
            handler : 'getTableSchema',
        }]
    }],
	

    listeners: {
		close : function() {
		 	 Ext.tip.QuickTipManager.unregister('getTableSchemaBtn');
		},
		
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'getTableSchemaBtn',
		        title: 'Solicitar Esquema',
		        text: 'Solicita o esquema da Tabela de Aquisição de Dados.',
		        width: 190,
		        dismissDelay: 5000 
		    });
		    
		}
    }


});
