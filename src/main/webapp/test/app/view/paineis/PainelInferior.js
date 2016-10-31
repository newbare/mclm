Ext.define('MCLM.view.paineis.PainelInferior', {
	extend: 'Ext.Panel',
	xtype: 'painelInferior',
	id: 'painelInferior',
	title: 'Painel Vazio',
    region: 'south',
    height: 250,
    minHeight: 75,
    maxHeight: 250,
    collapsed: true,
    animCollapse: false,   
    scrollable: true,
    scroll: 'both',    
    html : ''
});
