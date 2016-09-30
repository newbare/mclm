var layerTreeDetails = Ext.create('Ext.form.Panel', {
   frame: true,
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


var painelEsquerdo = {
    title: 'Camadas',
    region:'west',
    floatable: true,
    margin: '0 0 0 0',
    width: 300,
    minWidth: 100,
    maxWidth: 300,
    collapsed: false,
    animCollapse: false,            	            
    items : [{ xtype: layerTree }, { xtype:layerTreeDetails } ]
} 

