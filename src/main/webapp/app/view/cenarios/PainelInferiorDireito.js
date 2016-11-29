Ext.define('MCLM.view.cenarios.PainelInferiorDireito', {
	extend: 'Ext.Panel',
	xtype: 'inferiorDireito',
	
	region: 'center',
	margin: '0 0 0 0',
	layout:'fit',
	id: 'inferiorDireito',
	
	html: '',
	autoScroll:true,
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
