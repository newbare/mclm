Ext.define('MCLM.view.servers.ServersGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'serversGrid',
	id: 'serversGrid',
	border: true,
	title : '',
	store : 'store.externalsource', // <<<<< Problema com o STORE
    frame: false,
    margin: "0 0 0 0", 
    flex:1,
    loadMask: true,
    columns:[
	     {text:'Nome', dataIndex:'name', width:200},
	     {text:'Endereço', dataIndex:'url', width:300},
	     {text:'Versão', dataIndex:'version', width:70}
    ]
});	