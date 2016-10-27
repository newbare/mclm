Ext.define('MCLM.view.main.PainelDireito', {
	extend: 'Ext.Panel',
	xtype: 'painelDireito',
    region:'east',
    floatable: true,
    margin: '0 0 0 0',
    width: 40,
    minWidth: 40,
    maxWidth: 50,
    
	requires: [
	   'MCLM.view.main.ToolBarPrincipal'
	],    
    
    collapsed: false,
    
    items : [{
        xtype: 'toolBarPrincipal',
    }]

}); 