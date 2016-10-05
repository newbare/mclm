var aba02 =  new Ext.Panel({
    xtype : 'panel',
    layout: 'border',
    title: 'Painel 02',
    id:'aba02',
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: false,
        bodyPadding: 0
    },
    items : {
		xtype: cenarioTree,
		margin: '0 0 0 0'
	}
});
