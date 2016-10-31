Ext.define('MCLM.view.main.TelaPrincipal', {
	extend: 'Ext.Panel',
	xtype: 'telaPrincipal',
    requires: [
       'MCLM.view.paineis.PainelInferior',
       'MCLM.view.paineis.PainelCentral',
       'MCLM.view.paineis.PainelEsquerdo',
       'MCLM.view.paineis.PainelDireito',
    ],
    layout: 'border',
    title: 'Mapa',
    id:'telaPrincipal',
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: false,
        bodyPadding: 0
    },
    items: [{
        xtype: 'painelEsquerdo'
    },{
        xtype: 'painelCentral', collapsible: false
    },{
        xtype: 'painelDireito', collapsible: false
    },{
        xtype: 'painelInferior'
    }]
});

