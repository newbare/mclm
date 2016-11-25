Ext.define('MCLM.view.cenarios.PainelEsquerdo', {
	extend: 'Ext.Panel',
	xtype: 'cenariosPainelEsquerdo',
	region: 'west',
	margin: '0 0 0 0',
	width:400,
	layout:'fit',
	id: 'cenariosPainelEsquerdo',
	
    requires: [
        'MCLM.view.cenarios.CenarioGrid',
    ],		
	
	items : [{
		xtype: 'cenarioGrid'
	}]
});
