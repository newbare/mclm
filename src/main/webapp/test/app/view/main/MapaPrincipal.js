Ext.define('MCLM.view.main.MapaPrincipal', {
	extend: 'Ext.Panel',
	xtype: 'mapaPrincipal',
    requires: [
       'MCLM.view.main.PainelInferior',
       'MCLM.view.main.PainelCentral',
       'MCLM.view.main.PainelEsquerdo',
       'MCLM.view.main.PainelDireito',
    ],
    layout: 'border',
    title: 'Mapa',
    id:'mapaPrincipal',
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

