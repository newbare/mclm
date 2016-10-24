var capabilitiesWindow = null;
var capabilitiesStore = null;
var capabilitiesGrid = null;
var layerFolderID = null;
var mapLayerPreview = null;

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
        		removeLayerFromPreviewPanel();
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
        listeners: {
        	// atualiza a janela de preview com a camada selecionada na lista
            rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
            	var layerName = record.get('layerName');
            	var titulo = record.get('layerTitle');
            	var serverUrl = record.get('serverUrl');
            	addLayerToPreviewPanel( serverUrl + "wms/", layerName  );
            	
				var tituloForm = Ext.getCmp('tituloID');
				tituloForm.setValue( titulo );            	

				var descriptionForm = Ext.getCmp('descriptionID');
				descriptionForm.setValue( layerName );
				
				var comboValue = combo.getRawValue();
				var origemForm = Ext.getCmp('instituteID');
				origemForm.setValue( comboValue ); 				
				
            }
        },	    
	    region:'center',
	    loadMask: true,
	    columns:[
		     {text:'Título', dataIndex:'layerTitle', width:200},
		     {text:'Camada', dataIndex:'layerName', width:200},
		     {text:'URL', dataIndex:'serverUrl', width:200, xtype : 'hidden'},
		     {text:'Consultável', dataIndex:'queryable', width:70, xtype: 'booleancolumn', falseText:'Não', trueText: 'Sim'}
	    ]
	});	  
	
	// Um form para cadastrar os detalhes da nova camada
	var layerDetailForm = Ext.create('Ext.form.Panel', {
	    bodyPadding: 5,
	    region:'south',
	    defaultType: 'textfield',
        defaults: {
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'under',
            labelWidth: 90
        },	    
	    url: 'newWMSLayer',
	    items: [{
            fieldLabel: 'Titulo',
            width: 330,
            id:'tituloID',
            name: 'layerAlias',
	    }, {
            fieldLabel: 'Descrição',
            width: 330,
            id:'descriptionID',
            name: 'description',
	    }, {
            fieldLabel: 'Origem',
            width: 330,
            id:'instituteID',
            name: 'institute',
	    },{
            fieldLabel: 'Camada',
            width: 350,
            xtype : 'hidden',
            name: 'layerName',
            id:'layerNameID',
            readOnly: true,
            allowBlank : false,
        },{
            fieldLabel: 'Servidor',
            width: 350,
            xtype : 'hidden',
            name: 'serverUrl',
            id:'serverUrlID',
            readOnly: true,
        },{
            fieldLabel: 'Parend ID',
            width: 350,
            xtype : 'hidden',
            name: 'layerFolderID',
            id:'parentFolderID',
            readOnly: true,
        }],
	    buttons: [{
	          text: 'Fechar',
		          handler: function() {
		        	  capabilitiesWindow.close();
		          }
		      },{
	          text: 'Gravar',
	          handler: function() {
              	  if ( capabilitiesGrid.getSelectionModel().hasSelection() ) {
						var row = capabilitiesGrid.getSelectionModel().getSelection()[0];
						var serverUrlGrid = row.get('serverUrl');
						var layerNameGrid = row.get('layerName');

						var serverUrlForm = Ext.getCmp('serverUrlID');
						serverUrlForm.setValue( serverUrlGrid );

						var layerNameForm = Ext.getCmp('layerNameID');
						layerNameForm.setValue( layerNameGrid );
						
						var layerParentForm = Ext.getCmp('parentFolderID');
						layerParentForm.setValue( layerFolderID );
						
						
						var form = layerDetailForm.getForm();
			            if ( form.isValid() ) {
			              form.submit({
			            	  	success: function(form, action) {
			            	  		capabilitiesWindow.close();
			            	  		
			            	  		// layerStore estah em "layer-tree-store.js"
			            	  		// layerTree estah em "layer-tree-tree.js"
			            	  		var selectedTreeNode = layerTree.getSelectionModel().getSelection()[0];
			            	  		layerStore.load( { node: selectedTreeNode } );
			            	  		
			            	  		Ext.Msg.alert('Sucesso', action.result.msg);
			                  	},
			                  	failure: function(form, action) {
			                  		capabilitiesWindow.close();
			                  		Ext.Msg.alert('Falha', action.result.msg);
			                           
			                  	}                		  
			              });
		              } else { 
		                  Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
		              }
			            
              	  } else {     
	                  Ext.Msg.alert('Nenhuma Camada selecionada', 'Por favor, selecione uma camada e tente novamente.')
	              }
			            
	          }
		    }]
	
	});
    
	// O mapa de preview de camadas, na lateral direita da janela
	var layerPreviewMap = Ext.create('Ext.panel.Panel',{
		width : 350,
		region: 'center',
		html: '<div style="width: 100%;height: 100%;" id="previewLayerMap"></div>'
	});		

	// Um painel na parte direita para comportar o mapa e o form
	var layerPreviewMap = Ext.create('Ext.panel.Panel',{
		width : 350,
		region: 'east',
		layout:'border',
	    items:[layerPreviewMap,layerDetailForm ]
	});		
	
	
	// A janela container
	capabilitiesWindow = Ext.create('Ext.Window',{
		title : "Nova Camada WMS para " + path,
		width : 900,
		height: 500,
	    scrollable: false,
	    frame : false,
		layout : 'border',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
	    dockedItems: [{
	        xtype: 'toolbar',
	        items: [ combo ]
	    }],		
		items : [ capabilitiesGrid, layerPreviewMap ]
	}).show();	
    
    var container = layerPreviewMap.body.dom.id;
    createMap( container );
}

// cria o mapa da tela de preview
function createMap( container ) {
	
	var previewView = new ol.View({
        center: ol.proj.transform([-55.37109375,-17.39257927105777], 'EPSG:4326', 'EPSG:3857'),
        zoom: 3
    })	
	
	var previewLandLayer = new ol.layer.Tile({
	    source: new ol.source.TileWMS({
	        url: geoserverUrl,
	        params: {
	            'LAYERS': baseLayer, 
	            'FORMAT': 'image/png'
	        }
	    })
	});			
	
	mapLayerPreview = new ol.Map({
	    target: 'previewLayerMap',
	    layers: [ previewLandLayer ],
	    view: previewView
	    
	});	
}

// Adiciona a camada selecionada no mapa na tela de preview
function addLayerToPreviewPanel( serverUrl, serverLayers ) {
	removeLayerFromPreviewPanel();
	
	var newLayer = new ol.layer.Tile({
	    source: new ol.source.TileWMS({
	        url: serverUrl,
	        isBaseLayer : false,
	        params: {
	        	tiled: true,
	            'layers': serverLayers,
	            'VERSION': '1.1.1', 
	            'format': 'image/png'
	        },
	        projection: ol.proj.get('EPSG:4326')
	    })
	});	
	newLayer.set('name', 'preview_layer');
	
	mapLayerPreview.addLayer( newLayer );
}

// remove a camada do mapa na tela de preview
function removeLayerFromPreviewPanel() {
	mapLayerPreview.getLayers().forEach(function (lyr) {
		if( lyr.U.name ==  'preview_layer') {
			mapLayerPreview.removeLayer( lyr );	
			return;
		}
	});
}

// Solicita o getCapabilities ao sistema do servidor selecionado
// e preenche a lista atraves do store.
function requestCapabilities( node ) {
	var version = node.version;
	var url = node.url;

	capabilitiesStore.load({
		params:{'version': version , 'url':url}
	}); 	
	
}
