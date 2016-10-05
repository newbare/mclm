/*
 * Monta o painel esquerdo da aba principal.
 * Eh chamado pelo arquivo aba01.js
 * 
 * Precisa do arquivo layer-tree-tree.js para implementar "layerTree".
 */

var layerTreeDetails =  new Ext.Panel({
   frame: true,
   id:'layerTreeDetails',
   title: 'Form Fields',
   width: 300,
   items: [{
	      xtype: 'displayfield', 
	      name: 'serviceUrl',
	      fieldLabel: 'serviceUrl',
	      value: ''
	   },{
	      xtype: 'displayfield', 
	      name: 'description',
	      fieldLabel: 'description',
	      value: ''
	   }
	]
});


var painelEsquerdo =  new Ext.Panel({
    title: 'Camadas',
    region:'west',
    floatable: true,
    margin: '0 0 0 0',
    width: 300,
    minWidth: 100,
    maxWidth: 300,
    collapsed: false,
    animCollapse: false,            	            
    items : [layerTree, layerTreeDetails]
});

