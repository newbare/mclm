Ext.define('MCLM.view.paineis.PainelDireito', {
	extend: 'Ext.Panel',
	xtype: 'painelDireito',
    region:'east',
    floatable: true,
    margin: '0 0 0 0',
    width: 40,
    minWidth: 40,
    maxWidth: 50,
    
	requires: [
	   'MCLM.view.paineis.ToolBarPrincipal'
	],    
    
    collapsed: false,
    
    items : [{
        xtype: 'toolBarPrincipal',
    }]

}); 