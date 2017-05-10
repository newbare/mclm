Ext.define('MCLM.view.datawindow.ConfigDataPanels', {
	extend: 'Ext.Window',
	xtype : 'view.configDataPanels',
	id : 'configDataPanels',
	title : "Configurar / Criar Painéis da Janela de Dados",
	bodyPadding: 10,
	
	width : 800,
	height: 450,
	
    requires: [
        'MCLM.view.datawindow.ConfigDataPanelsController',
        'MCLM.view.datawindow.ConfigDataPanelsTree',
	],	
    controller : 'configDataPanels',	

	items: [{
		flex:1,
		xtype: 'view.configDataPanelsTree'
	}],    
    
    scrollable: true,
    frame : false,
    
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),
    
    dataWindowData : null,
	resizable: false,
	
    dockedItems: [{
        xtype: 'toolbar',
        border: false,
        items: [{
        	iconCls: 'save-icon',
        	id: 'doNextBtn',
            handler : 'doSomething',
        },{
        	iconCls: 'add-icon',
        	id: 'doAddFoldertBtn',
            handler : 'doAddFolder',
        }]
    }],
	

    listeners: {
		close : function() {
		 	 Ext.tip.QuickTipManager.unregister('doNextBtn');
		},
		
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'doNextBtn',
		        title: 'Salvar Janela',
		        text: 'Salva a Janela de Dados com os dados abaixo.',
		        width: 190,
		        dismissDelay: 5000 
		    });
		    
		}
    }


});
