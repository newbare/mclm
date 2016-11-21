Ext.define('MCLM.view.cenarios.CenarioWindow', {
	extend: 'Ext.Window',
	xtype : 'view.cenarioWindow',
	id : 'cenarioWindow',

    requires: [
        'MCLM.view.cenarios.CenarioController',
        'MCLM.view.cenarios.PainelEsquerdo',
        'MCLM.view.cenarios.PainelCentral',
	],	    
    controller : 'cenario',	
	
	width : 700,
	height: 400,
    scrollable: false,
    frame : false,
	layout : 'border',
	title : "Carregar Cenário",
	constrain: true,
	
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'cenariosPainelEsquerdo'
	},{
		xtype: 'cenariosPainelCentral'
	}],	
	  

});
