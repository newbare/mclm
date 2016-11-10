Ext.define('MCLM.view.addlayer.wms.CapabilitiesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.capabilities',
    
    listen : {
        controller : {
            '*' : { 
            	createMapPreview : 'createMap'
            }
        }
    },     
    
    init : function(app) {
        this.control({
        	// Intercepta o metodo 'select' do combo de fontes externas 'MCLM.view.addlayer.wms.ServersCombo' 
            '#serversCombo' : {
            	select: this.serversComboSelect 
            },
            // Intercepta o click de selecao numa camada da lista na grid 
            // 'MCLM.view.addlayer.wms.CapabilitiesGrid'
            '#capabilitiesGrid' : {
            	rowclick: this.serversGridRowClick 
            },
            // Intercepta o click no botao 'Fechar' no form 'MCLM.view.addlayer.wms.LayerDetailForm'
            '#closeCapabilitiesWindow' : {
            	click: this.closeCapabilitiesWindow 
            },
            // Intercepta o click no botao 'Gravar' no form 'MCLM.view.addlayer.wms.LayerDetailForm'
            '#submitNewLayerForm' : {
            	click: this.submitForm 
            },
            
            
        });
    },  
    submitForm : function() {
    	var capabilitiesGrid = Ext.getCmp('capabilitiesGrid');
    	var me = this;
    	
    	if ( capabilitiesGrid.getSelectionModel().hasSelection() ) {
			var row = capabilitiesGrid.getSelectionModel().getSelection()[0];
			var serverUrlGrid = row.get('serverUrl');
			var layerNameGrid = row.get('layerName');
			
			var layerTree = Ext.getCmp('layerTree');
			var selectedTreeNode = layerTree.getSelectionModel().getSelection()[0];
			var layerFolderID = selectedTreeNode.data.id;
			
			var serverUrlForm = Ext.getCmp('serverUrlID');
			serverUrlForm.setValue( serverUrlGrid );
			
			var layerNameForm = Ext.getCmp('layerNameID');
			layerNameForm.setValue( layerNameGrid );
			
			var layerParentForm = Ext.getCmp('parentFolderID');
			layerParentForm.setValue( layerFolderID );
			
			var layerDetailForm = Ext.getCmp('layerDetailForm');
			var form = layerDetailForm.getForm();
			if ( form.isValid() ) {
				form.submit({
					success: function(form, action) {
				  		var layerTreeStore = Ext.getStore('store.layerTree');
				  		layerTreeStore.load( { node: selectedTreeNode } );
				  		me.closeCapabilitiesWindow();
				  		Ext.Msg.alert('Sucesso', action.result.msg);
					},
				  	failure: function(form, action) {
				  		Ext.Msg.alert('Falha', action.result.msg);
				    }                		  
				});
	        } else { 
	        	Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
	        }
            
	  } else {     
		  Ext.Msg.alert('Nenhuma Camada selecionada', 'Por favor, selecione uma camada e tente novamente.')
	  }
    	
	},
    // ---------------------------------------------------------------------------------------------------------------
    // Chamado quando o usuario troca de fonte externa no combo. Eh necessario dar um
    // GetCapabilities no geoserver da fonte externa e atualizar a grid.
    serversComboSelect: function(combo, record, index) {
		this.removeLayerFromPreviewPanel();
		this.requestCapabilities( record.data );
    },  
    // ---------------------------------------------------------------------------------------------------------------
    // Chamado quando o usuario clica em uma camada na lista oferecida apos selecionar uma fonte externa do combo.
    // Exibe um preview da camada selecionada no mini mapa de preview
    serversGridRowClick: function(grid, record, tr, rowIndex, e, eOpts) {
    	var layerName = record.get('layerName');
    	var titulo = record.get('layerTitle');
    	var serverUrl = record.get('serverUrl');
    	
		var tituloForm = Ext.getCmp('tituloID');
		tituloForm.setValue( titulo );            	

		var descriptionForm = Ext.getCmp('descriptionID');
		descriptionForm.setValue( layerName );
		
		var combo = Ext.getCmp('serversCombo');
		var comboValue = combo.getRawValue();
		var origemForm = Ext.getCmp('instituteID');
		origemForm.setValue( comboValue ); 				
		
    	this.addLayerToPreviewPanel( serverUrl + "wms/", layerName  );
    	
    },    
    // Fecha a janela. Interceptado do botao 'fechar' no form 'MCLM.view.addlayer.wms.LayerDetailForm' 
    closeCapabilitiesWindow : function() {
    	var capabilitiesWindow = Ext.getCmp('capabilitiesWindow');
    	capabilitiesWindow.close();
    },
    // ---------------------------------------------------------------------------------------------------------------
    createMap : function ( record ) {
    	
    	var layerPreviewMap = Ext.getCmp('layerPreviewMap');
    	var container = layerPreviewMap.body.dom.id;

    	var config = MCLM.Globals.config;
		var geoserverUrl = config.geoserverUrl;
		var baseLayerName = config.baseLayer;    	
    	
    	
    	var previewView = new ol.View({
            center: ol.proj.transform([-55.37109375,-17.39257927105777], 'EPSG:4326', 'EPSG:3857'),
            zoom: 3
        })	
    	
    	var previewLandLayer = new ol.layer.Tile({
    	    source: new ol.source.TileWMS({
    	        url: geoserverUrl,
    	        params: {
    	            'LAYERS': baseLayerName, 
    	            'FORMAT': 'image/png'
    	        }
    	    })
    	});			
    	
    	MCLM.Globals.mapLayerPreview = new ol.Map({
    	    target: 'previewLayerMap',
    	    layers: [ previewLandLayer ],
    	    view: previewView
    	    
    	});	
    },
    // ---------------------------------------------------------------------------------------------------------------
    // Adiciona a camada selecionada no mapa na tela de preview
    addLayerToPreviewPanel : function ( serverUrl, serverLayers ) {
    	this.removeLayerFromPreviewPanel();
    	
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
    	
    	MCLM.Globals.mapLayerPreview.addLayer( newLayer );
    },
    // ---------------------------------------------------------------------------------------------------------------
    // remove a camada do mapa na tela de preview
    removeLayerFromPreviewPanel : function () {
    	MCLM.Globals.mapLayerPreview.getLayers().forEach(function (lyr) {
    		if( lyr.U.name ==  'preview_layer') {
    			MCLM.Globals.mapLayerPreview.removeLayer( lyr );	
    			return;
    		}
    	});
    },
    // ---------------------------------------------------------------------------------------------------------------
    // Solicita o getCapabilities ao sistema do servidor selecionado
    // e preenche a lista atraves do store.
    requestCapabilities : function ( node ) {
    	var version = node.version;
    	var url = node.url;
    	var capabilitiesStore = Ext.getStore('store.Capabilities');
    	
    	capabilitiesStore.load({
    		params:{'version': version , 'url':url}
    	}); 	
    	
    	var capabilitiesGrid = Ext.getCmp('capabilitiesGrid');
    	capabilitiesGrid.getView().refresh();
    	
    }    
    
    
});