Ext.define('MCLM.view.main.TelaPrincipal', {
	extend: 'Ext.Panel',
	xtype: 'telaPrincipal',
	plugins: 'viewport',
    requires: [
       'MCLM.view.paineis.PainelInferior',
       'MCLM.view.paineis.PainelCentral',
       'MCLM.view.paineis.PainelEsquerdo',
       'MCLM.view.paineis.PainelDireito',
       'Ext.plugin.Viewport',
       'MCLM.view.main.MainController',
    ],
    layout: 'border',
    margin: '0 0 0 0',
    controller: 'main',
    id:'telaPrincipal',
    bodyBorder: false,
    border:false,
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
        xtype: 'painelInferior', collapsible: false
    }]
});

