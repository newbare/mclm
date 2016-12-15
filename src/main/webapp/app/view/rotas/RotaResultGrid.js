Ext.define('MCLM.view.rotas.RotaResultGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'rotaResultGrid',
	id: 'rotaResultGrid',
	border: true,
	title : '',
	store : 'store.RouteResult',
    frame: false,
    height : 320,
    listeners: {
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        }
    },	    
    region:'south',
    loadMask: true,
    columns:[
   	     {text:'ID', dataIndex:'seq', width:40},
	     {text:'Nome', dataIndex:'osm_name', width:400},
    ]
});	