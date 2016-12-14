Ext.define('MCLM.view.rotas.RotaWindow', {
	extend: 'Ext.Window',
	xtype : 'view.rotaWindow',
	id : 'rotaWindow',

	title: 'Calcular Rota',
	
    requires: [
        'MCLM.view.rotas.CalcRotaController',
        'MCLM.view.rotas.CalcRotaForm',
	],	    
    controller : 'calcRota',	
	
	width : 500,
	height: 250,
    scrollable: false,
    frame : false,
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.calcRotaForm'
	}],
	
	
});
