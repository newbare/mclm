Ext.define('MCLM.view.datawindow.CloneToCenarioWindow', {
	extend: 'Ext.Window',
	xtype : 'view.cloneToCenarioWindow',
	id : 'cloneToCenarioWindow',

	
    requires: [
        'MCLM.view.datawindow.CloneToCenarioController',
        /*'MCLM.view.cenarios.SaveCenarioForm',*/
	],	
	    
    controller : 'cloneToCenario',	
	
	feicao : null,
	
	width : 410,
	height: 150,
    scrollable: false,
	resizable: false,
    frame : false,
	layout : 'border',
	title : "Copiar para o Cenário",
	constrain: true,
	
	renderTo: Ext.getBody(),

	html : '<div style="padding:5px">Selecione um estilo para ser aplicado neste elemento.</div>',
	
    dockedItems: [{
        xtype: 'toolbar',
        border: false,
        items: [{
    		xtype: 'combobox',
    		editable : false,
    		name: 'idFeicaoStyle',
    		labelWidth: 30,
    		fieldLabel: 'Estilo:',
    		displayField: 'featureStyleName',	    	
    		id: 'idFeicaoStyle',
    		store: 'store.styles',	    	
    	    forceSelection: true,
    	    allowBlank: false,
    	    valueField: 'idFeatureStyle',
    	    listeners : {
    	    	select : function( ele, rec, idx ) {
    	        	// console.log( rec.data );
    	    		Ext.getCmp('doCloneBtn').enable();
    	    	}
    	    } 
        
        },{
        	iconCls: 'save-icon',
        	id: 'doCloneBtn',
            handler : 'doClone',
            disabled : true	
        }]
    }],
	

    listeners: {
		close : function() {
		 	 Ext.tip.QuickTipManager.unregister('doCloneBtn');
		},
		
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'doCloneBtn',
		        title: 'Salvar',
		        text: 'Salva o elemento com o estilo selecionado.',
		        width: 190,
		        dismissDelay: 5000 
		    });
		    
		}
    }


});
