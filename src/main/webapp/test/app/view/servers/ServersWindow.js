Ext.define('MCLM.view.servers.ServersWindow', {
	extend: 'Ext.Window',
	id:'serversWindow',    	
	xtype: 'serversWindow',
	title : "Gerenciar Fontes Externas",
	width : 600,
	height: 400,
	
	requires: [
	   'MCLM.view.servers.ServersGrid',
	   //'MCLM.view.servers.ServersController'
	],  
	//controller: 'serversController',
	
    scrollable: false,
    frame : false,
	layout : 'fit',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'add-external-icon',
        	id: 'id311',
            handler : 'addExternalSource'
        }, {
        	iconCls: 'remove-external-icon',
        	id: 'id312',
            handler : 'askDeleteExternalSource'
        }]
    }],		
    items : [{
        xtype: 'serversGrid',
    }],
    
	listeners:{
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'id311',
		        title: 'Adicionar Fonte Externa',
		        text: 'Cadastra um novo servidor GeoServer para servir como fonte de camadas.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id312',
		        title: 'Remover Fonte Externa',
		        text: 'Remove a Fonte Externa selecionada.',
		        width: 150,
		        dismissDelay: 5000 
		    });			
			
		}
	}, 	    
});	