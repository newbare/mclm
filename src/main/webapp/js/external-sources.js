var externalGrid = null;
var externalWindow = null; 
var newExternalWindow = null;
var externalStore = null;

function manageServers() {
	
	externalStore = Ext.create('Ext.data.Store',{
		proxy: {
	        type: 'ajax',
	        url: 'getExternalSources',
	        reader: {
	            type: 'json',
	            rootProperty:'servers',
	            totalProperty: 'totalCount'
	        }        
		},
        fields: [
             {name:'idServer', type:'int'},    
	         {name:'name', type:'string'},
	         {name:'url', type:'string'},
	         {name:'version', type:'string'}
        ],
		autoLoad: true,
		listeners: {
            load: function(store, records){
            	// Quando o store carrega os dados
        	}			
		}
	}); 		
	

	externalGrid = Ext.create('Ext.grid.Panel', {
		border: true,
		title : '',
		store : externalStore,
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
	
	
	externalWindow = Ext.create('Ext.Window',{
		title : "Gerenciar Fontes Externas",
		width : 600,
		height: 400,
	    scrollable: false,
	    frame : false,
		layout : 'fit',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
	    dockedItems: [{
	        xtype: 'toolbar',
	        items: [{
	        	iconCls: 'add-external-icon',
	        	id: 'id311',
	            handler : addExternalSource
	        }, {
	        	iconCls: 'remove-external-icon',
	        	id: 'id312',
	            handler : askDeleteExternalSource
	        }]
	    }],		
		items : [ externalGrid ]
	}).show();	
	
	
    Ext.tip.QuickTipManager.register({
        target: 'id311',
        title: 'Adicionar Fonte Externa',
        text: 'Cadastra um novo servidor GeoServer para servir como fonte de camadas.',
        width: 150,
        dismissDelay: 5000 
    }, {
        target: 'id312',
        title: 'Remover Fonte Externa',
        text: 'Remove a Fonte Externa selecionada.',
        width: 150,
        dismissDelay: 5000 
    });
    
    
}


function addExternalSource() {
	
	var externalForm = Ext.create('Ext.form.Panel', {
	    bodyPadding: 5,
	    defaultType: 'textfield',
	    url: 'newExternalSource',
	    items: [{
	            fieldLabel: 'Nome',
	            width: 350,
	            msgTarget: 'under',
	            name: 'name',
	            allowBlank : false,
	            invalidText: '',
	        },
		    {
	            fieldLabel: 'Endereço',
	            width: 350,
	            msgTarget: 'under',
	            name: 'url',
	            allowBlank : false,
	            invalidText: '',
		    },
		    {
	            fieldLabel: 'Versão',
	            width: 350,
	            msgTarget: 'under',
	            name: 'version',
	            allowBlank : false,
	            invalidText: '',
	    }],
	    buttons: [{
          text: 'Fechar',
	          handler: function() {
	          	newExternalWindow.close();
	          }
	      },{
          text: 'Gravar',
          handler: function() {
              var form = externalForm.getForm();
              if ( form.isValid() ) {
            	  form.submit({
                      success: function(form, action) {
                    	  newExternalWindow.close();
                    	  externalStore.load();
                          Ext.Msg.alert('Sucesso', action.result.msg);
                       },
                       failure: function(form, action) {
                    	   newExternalWindow.close();
                           Ext.Msg.alert('Falha', action.result.msg);
                           
                       }                		  
            	  });
              } else { 
                  Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
              }
          }
	    }]
	
	});		
	
	
	newExternalWindow = Ext.create('Ext.Window',{
		title : "Nova Fonte Externa",
		width : 380,
		height: 220,
	    scrollable: false,
	    frame : false,
		layout : 'fit',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
		items : [ externalForm ]
	}).show();		
	
	
}


function askDeleteExternalSource() {
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
	    
}

function deleteExternalSource( id, name, url, version ) {
	
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
		
}

