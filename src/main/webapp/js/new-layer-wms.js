var capabilitiesWindow = null;
var capabilitiesStore = null;
var capabilitiesGrid = null;
var layerFolderID = null;

function newLayerWms( path, idLayerFolder, layerAlias  ) {
	layerFolderID = idLayerFolder;
	
    var messageBox = Ext.MessageBox.show({
        msg: 'Carregando Fontes Externas...',
        progressText: 'Aguarde...',
        width:300,
        wait:true,
        waitConfig: {interval:200},
        animateTarget: 'waitButton'
    });		
	
	// Store para os servidores externos
	var externalStore = Ext.create('Ext.data.Store',{
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
            	messageBox.hide(); // Quando o Store carrega os dados... 
        	}			
		}
	}); 
	
	// Combo com os servidores externos
    var combo = Ext.create('Ext.form.ComboBox', {
    	fieldLabel: 'Fonte Externa',
    	displayField: 'name',
    	valueField:'idServer',
    	width:400,
    	emptyText:'Selecione...',
        store : externalStore,
        listeners: {
        	select: function(combo, record, index) {
        		requestCapabilities( record.data );
            }
        }        
    });
        
    // Store da lista de capacidades ( resultado do getCapabilities )
    capabilitiesStore = Ext.create('Ext.data.Store', {
		proxy: {
	        type: 'ajax',
	        url: 'getCapabilities',
	        reader: {
	            type: 'json',
	            rootProperty:'capabilities',
	            totalProperty: 'totalCount'
	        }	        
		},
        fields: [
             {name:'layerTitle', type:'string'},    
	         {name:'queryable', type:'boolean'},
	         {name:'serverUrl', type:'string'},
	         {name:'layerName', type:'string'}
        ],
		autoLoad: false,
		listeners: {
            load: function(store, records, success, operation){
                var reader = store.getProxy().getReader();
                var response = operation.getResponse();
                var resp = JSON.parse( response.responseText );
                if ( resp.error ) {
                	Ext.Msg.alert('Falha', resp.msg );
                }                 
            }			
		}
	});  
    
	// Lista de capacidades
	capabilitiesGrid = Ext.create('Ext.grid.Panel', {
		border: true,
		title : '',
		store : capabilitiesStore,
	    frame: false,
	    margin: "0 0 0 0", 
	    flex:1,
	    loadMask: true,
	    columns:[
		     {text:'Título', dataIndex:'layerTitle', width:200},
		     {text:'Camada', dataIndex:'layerName', width:200},
		     {text:'URL', dataIndex:'serverUrl', width:200},
		     {text:'Consultável', dataIndex:'queryable', width:70, xtype: 'booleancolumn', falseText:'Não', trueText: 'Sim'}
	    ]
	});	    
    
	// A janela
	capabilitiesWindow = Ext.create('Ext.Window',{
		title : "Nova Camada WMS para " + path,
		width : 710,
		height: 400,
	    scrollable: false,
	    frame : false,
		layout : 'fit',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
	    dockedItems: [{
	        xtype: 'toolbar',
	        items: [ combo, {
	        	iconCls: 'add-external-icon',
	        	id: 'id411',
	            handler : addExternalLayer
	        } ]
	    }],		
		items : [ capabilitiesGrid ]
	}).show();	
	
    Ext.tip.QuickTipManager.register({
        target: 'id411',
        title: 'Adicionar Camada',
        text: 'Adiciona a camada selecionada.',
        width: 150,
        dismissDelay: 5000 
    });	
	
}

function addExternalLayer() {
	
	if ( capabilitiesGrid.getSelectionModel().hasSelection() ) {
		var row = capabilitiesGrid.getSelectionModel().getSelection()[0];
		var serverUrl = row.get('serverUrl');
		var layerName = row.get('layerName');
		
		Ext.Ajax.request({
		       url: 'newWMSLayer',
		       params: {
		           'serverUrl': serverUrl,
		           'layerName':layerName,
		           'layerFolderID':layerFolderID
		       },       
		       success: function(response, opts) {
		    	   var resp = JSON.parse( response.responseText );
		    	   if ( resp.success ) {
		    		   Ext.Msg.alert('Sucesso', resp.msg + " Não esquecer de atualizar o store da arvore!!!");
		    	   } else {
		    		   Ext.Msg.alert('Falha', resp.msg );
		    	   }  
		       },
		       failure: function(response, opts) {
		    	   Ext.Msg.alert('Falha','Erro ao excluir Fonte Externa.' );
		       }
	    });			
				
	} else {
		Ext.Msg.alert('Camada não selecionada','Selecione uma Camada na lista e tente novamente.' );
	}		
}


function requestCapabilities( node ) {
	var version = node.version;
	var url = node.url;

	capabilitiesStore.load({
		params:{'version': version , 'url':url}
	}); 	
	
}
