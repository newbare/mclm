Ext.define('MCLM.view.servers.ServersController', {
    extend: 'Ext.app.ViewController',
    alias: 'serversController',
    	
    addExternalSource : function() {
    	var newServerWindow = Ext.getCmp('serversWindow');
    	if ( newServerWindow ) return;
    	newServerWindow = Ext.create('MCLM.view.servers.NewServerWindow');
    	newServerWindow.show();
    },    	
    	
    askDeleteExternalSource : function() {
		/*
	
		if ( externalGrid.getSelectionModel().hasSelection() ) {
			var row = externalGrid.getSelectionModel().getSelection()[0];
			var id = row.get('idServer');
			var name = row.get('name');
			var url = row.get('url');
			var version = row.get('version');	
	
			Ext.Msg.confirm('Remover Fonte Externa', 'Deseja realmente remover a Fonte Externa "' + name + '" ?', function(btn){
				   if( btn === 'yes' ){
					   deleteExternalSource( id, name, url, version );
				   } else {
				      return;
				   }
			 });	
		    
		} else {
			Ext.Msg.alert('Fonte não selecionada','Selecione uma Fonte Externa na lista e tente novamente.' );
		}	
	    	
	    */	
	},   

    deleteExternalSource : function() {
    	/*
    	Ext.Ajax.request({
 	       url: 'deleteExternalSource',
 	       params: {
 	           'idServer': id
 	       },       
 	       success: function(response, opts) {
 	    	   var resp = JSON.parse( response.responseText );
 	    	   if ( resp.success ) {
 	    		   externalStore.load();
 	    		   Ext.Msg.alert('Sucesso','Fonte Externa ' + name + ' removida com sucesso.' );
 	    	   } else {
 	    		   Ext.Msg.alert('Falha', resp.msg );
 	    	   }  
 	       },
 	       failure: function(response, opts) {
 	    	   Ext.Msg.alert('Falha','Erro ao excluir Fonte Externa.' );
 	       }
     	});	
    	*/		
	}      
    
});