/*
 * Monta o painel esquerdo da aba principal.
 * Eh chamado pelo arquivo aba01.js
 * 
 * Precisa do arquivo layer-tree-tree.js para implementar "layerTree".
 */

var layerDetailStore = Ext.create('Ext.data.Store', {
    requires: ['Ext.data.proxy.Memory'],
    fields: [{name: 'layerAlias'},
             {name: 'description'},
             {name: 'layerName'},
             {name: 'originalServiceUrl'},
             {name: 'serviceUrl'},
             {name: 'institute'},
             {name: 'childrenCount'} ], 
    proxy: { type: 'memory' }
});

var layerGridDetails = Ext.create('Ext.grid.Panel',{
	border:false,
	store:layerDetailStore,
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

var painelEsquerdo = Ext.create('Ext.Panel',{
    title: 'Camadas',
    region:'west',
    layout: 'border',
    floatable: true,

    width: 300,
    minWidth: 100,
    maxWidth: 300,
    collapsed: false,
    animCollapse: false,            	            
    items : [layerTree, layerGridDetails]
});

