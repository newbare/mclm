Ext.define('MCLM.view.paineis.PainelEsquerdo', {
	extend: 'Ext.Panel',
	xtype: 'painelEsquerdo',
	
	requires: [
        'MCLM.view.paineis.LayerDetail',
        'MCLM.view.paineis.LayerTree'
	],
	
	
    title: 'Camadas',
    region:'west',
    layout: 'border',
    floatable: true,

    width: 300,
    minWidth: 100,
    maxWidth: 300,
    collapsed: false,
    animCollapse: false,   
	items: [{
		xtype: 'view.layerDetail'
	},{
		xtype: 'view.layerTree'
	}]
});
