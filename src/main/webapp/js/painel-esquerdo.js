/*
 * Monta o painel esquerdo da aba principal.
 * Eh chamado pelo arquivo aba01.js
 * 
 * Precisa do arquivo layer-tree-tree.js para implementar "layerTree".
 */


var layerTreeDetails = Ext.create('Ext.form.Panel', {
   frame: true,
   border:false,
   id:'layerTreeDetails',
   title: 'Detalhes da Camada',
   width: 295,
   height:150,
   scrollable: true,
   items: [{
	      xtype: 'displayfield', 
	      labelAlign : 'left',
	      name: 'text',
	      fieldLabel: 'Nome',
	      labelWidth: 55,
	      value: ''
	   },{
	      xtype: 'displayfield', 
	      name: 'description',
	      labelAlign : 'left',
	      fieldLabel: 'Descrição',
	      labelWidth: 55,
	      value: ''
	   },{
	      xtype: 'displayfield', 
	      name: 'institute',
	      labelAlign : 'left',
	      fieldLabel: 'Fonte',
	      labelWidth: 55,
	      value: ''
	   },{
	      xtype: 'displayfield', 
	      name: 'layerName',
	      labelAlign : 'left',
	      fieldLabel: 'Camada',
	      labelWidth: 55,
	      value: ''
	   },{
	      xtype: 'displayfield', 
	      name: 'serviceUrl',
	      labelAlign : 'left',
	      fieldLabel: 'Provedor',
	      labelWidth: 55,
	      value: ''
	   }
	]
});

/*
var layerGridDetails = Ext.create('Ext.grid.Panel',{
    width: 400,
    height: 200,
    title: 'Camadas Ativas',
    columns: [
        {
            text: 'Nome',
            width: 100,
            sortable: false,
            hideable: false,
            dataIndex: 'text'
        },
        {
            text: 'URL',
            width: 150,
            dataIndex: 'serviceUrl',
        },
        {
            text: 'Descrição',
            flex: 1,
            dataIndex: 'description'
        }
    ]
});
*/


var painelEsquerdo = Ext.create('Ext.Panel',{
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

