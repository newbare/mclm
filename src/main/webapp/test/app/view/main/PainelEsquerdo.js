Ext.define('MCLM.view.main.PainelEsquerdo', {
	extend: 'Ext.Panel',
	xtype: 'painelEsquerdo',
	
	requires: [
        'MCLM.view.main.LayerDetail'
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
	}]
});
