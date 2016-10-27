Ext.define('MCLM.view.main.LayerDetail', {
	extend: 'Ext.grid.Panel',
	xtype: 'view.layerDetail',
	
    requires: [
        'MCLM.store.LayerDetail'
    ],
	
	border:false,
	
    store: Ext.data.StoreManager.lookup('store.LayerDetail'),
    
    region:'south',
    height: 160,
    columns: [{
    	cellWrap: true,
    	header:'Detalhes da Camada',
        flex: 1,
        sortable: false,
        hideable: false,
        xtype: 'templatecolumn',
        tpl: [
            '<tpl for=".">',
                    '<div style="float: left; width: 95%; padding:0px;">',
                        '<div style="font-weight:bold;padding: 0px 0px 2px 0px;">{layerAlias}</div>',
                        '<div style="font-weight:bold;padding: 0px;">{institute}</div>',
                        '<div style="width:100%;border-top:1px dotted black; padding: 0px;">{layerName}</div>',
                        '<div style=" padding: 0px;">{serviceUrl}</div>',
                        '<div style=" padding: 0px;">{originalServiceUrl}</div>',
                        '<div style=" padding: 0px;">{childrenCount} subconjuntos.</div>',
                        '<div style="font-style: italic;width:100%;border-top:1px dotted black; padding: 0px;">{description}</div>',
                    '</div>',
             '</tpl>'
            ]
    }],
});
