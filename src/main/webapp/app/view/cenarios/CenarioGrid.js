Ext.define('MCLM.view.cenarios.CenarioGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'cenarioGrid',
	id: 'cenarioGrid',
	border: true,
	title : '',
	store : 'store.Scenery', 
    frame: false,
    margin: "0 0 0 0", 
    flex:1,
    loadMask: true,
    columns:[
   	     {text:'Público', dataIndex:'isPublic', width:70, xtype: 'booleancolumn', falseText:'Não', trueText: 'Sim'},
	     {text:'Nome', dataIndex:'sceneryName', width:200},
	     {text:'Descrição', dataIndex:'description', width:300},
    ],
    listeners: {
    	// atualiza a janela de preview com a camada selecionada na lista
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        	// Interceptado pelo controller MCLM.view.cenarios.CenarioController'
        }
    },	    
});	

