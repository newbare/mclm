Ext.define('MCLM.view.cenarios.PainelCentral', {
	extend: 'Ext.Panel',
	xtype: 'cenariosPainelCentral',
	
	region: 'center',
	margin: '0 0 0 0',
	layout:'fit',
	id: 'cenariosPainelCentral',
	html : '',
    buttons: [{
			  // Interceptado pelo controller 'MCLM.view.cenarios.CenarioController'	
	        text: 'Cancelar',
	        id : 'closeLoadSceneryWindow'
	    },{
			  // Interceptado pelo controller 'MCLM.view.cenarios.CenarioController'	
	        text: 'Carregar',
	        id : 'loadSceneryToWork'
	    }
    ]	
});
