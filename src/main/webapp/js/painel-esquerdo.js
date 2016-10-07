/*
 * Monta o painel esquerdo da aba principal.
 * Eh chamado pelo arquivo aba01.js
 * 
 * Precisa do arquivo layer-tree-tree.js para implementar "layerTree".
 */

/*
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
*/

var layerGridDetails =  new Ext.grid.Panel ({
    width: 400,
    height: 200,
    title: 'Camadas Ativas',
    columns: [
        {
            text: 'Nome',
            width: 100,
            sortable: false,
            hideable: false,
            dataIndex: 'name'
        },
        {
            text: 'Email Address',
            width: 150,
            dataIndex: 'email',
        },
        {
            text: 'Phone Number',
            flex: 1,
            dataIndex: 'phone'
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
    items : [layerTree, layerGridDetails]
});

