function manageServers() {
	
	Ext.Ajax.request({
		url: 'getConfig',
		success: function(response, opts) {
			showExternalServers();
			//var config = Ext.decode(response.responseText);
			//configForm.getForm().setValues( config );
		},
		failure: function(response, opts) {
			Ext.Msg.alert('Erro ao receber a configuração do servidor' );
		}
	});		
	
}


function showExternalServers() {
	
	configWindow = Ext.create('Ext.Window',{
		title : "Gerenciar Fontes Externas",
		width : 377,
		height: 450,
	    scrollable: false,
	    frame : false,
		layout : 'fit',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
		//items : [ serversForm ]
	}).show();	
	
}