Ext.define('MCLM.view.servers.ServersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.serversController',
    	
    addExternalSource : function() {
    	var newServerWindow = Ext.getCmp('newServerWindow');
    	if ( newServerWindow ) return;
    	newServerWindow = Ext.create('MCLM.view.servers.NewServerWindow');
    	newServerWindow.show();
    	Ext.getCmp('newServerName').focus(true, 100);
    },    	
    // ----------------------------------------------------------------------------------------------	
    askDeleteExternalSource : function() {
    	var externalGrid = Ext.getCmp('serversGrid');
    	var me = this;
    	
		if ( externalGrid.getSelectionModel().hasSelection() ) {
			var row = externalGrid.getSelectionModel().getSelection()[0];
			var id = row.get('idServer');
			var name = row.get('name');
			var url = row.get('url');
			var version = row.get('version');	
	
			Ext.Msg.confirm('Remover Fonte Externa', 'Deseja realmente remover a Fonte Externa "' + name + '" ?', function(btn){
				   if( btn === 'yes' ){
					   me.deleteExternalSource( id, name, url, version );
				   } else {
				      return;
				   }
			 });	
		    
		} else {
			Ext.Msg.alert('Fonte não selecionada','Selecione uma Fonte Externa na lista e tente novamente.' );
		}	
	},   
    // ----------------------------------------------------------------------------------------------	
    deleteExternalSource : function( id, name, url, version ) {
    	
    	Ext.Ajax.request({
 	       url: 'deleteExternalSource',
 	       params: {
 	           'idServer': id
 	       },       
 	       success: function(response, opts) {
 	    	   var resp = JSON.parse( response.responseText );
 	    	   if ( resp.success ) {
			    	var externalsource = Ext.getStore('store.externalsource');
			    	externalsource.load();
			    	Ext.Msg.alert('Sucesso','Fonte Externa ' + name + ' removida com sucesso.' );
 	    	   } else {
 	    		   Ext.Msg.alert('Falha', resp.msg );
 	    	   }  
 	       },
 	       failure: function(response, opts) {
 	    	   Ext.Msg.alert('Falha','Erro ao excluir Fonte Externa.' );
 	       }
     	});	
    			
	}      
    
});