var layerStack = [];

var storeDos = Ext.create('Ext.data.Store', {
    requires: ['Ext.data.proxy.Memory'],
    fields: [{name: 'layerAlias'},{name: 'description'} ], 
    proxy: { type: 'memory' }
});

function addToLayerStack( data ) {
	layerStack.push( data );
	storeDos.loadData( layerStack );
}

function removeFromLayerStack( layerAlias ) {
	layerStack = layerStack.filter(function(el) {
	    return el.layerAlias !== layerAlias;
	});	
	storeDos.loadData( layerStack );
}

Ext.onReady(function() {
	
	var gridPanel = Ext.create('Ext.grid.Panel',{
	    store : storeDos,
	    border:false,
	    height: 200,
        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop'
            }
        },
	    
	    columns: [
	        {
	            text: 'Nome',
	            width: 200,
	            hideable: false,
	            dataIndex: 'layerAlias'
	        },
	        {
	            text: 'Descrição',
	            flex: 1,
	            dataIndex: 'description'
	        }
	    ]
	});
	
	Ext.create('Ext.Window',{
		title : "Camadas Ativas",
		width : 600,
		height: 300,
		layout : 'fit',
		constrain: true,
		renderTo: Ext.getBody(),
		items : [ gridPanel ]
	}).show();
	
	
});	