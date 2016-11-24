Ext.define('MCLM.Map', {
	
	statics: {
		map: null,
		featureCount : 100,
		queryToolEnabled : false,
		mousePosition: null,
		selectedLayer: null,
		theView: null,
		theMiniView: null,
		onClickBindKey: null,
		graticuleEnabled: false,
		arrayMapCenter: null,
		mapZoom: 5,
		mapCenterLat: 0,
		mapCenterLong: 0,	
		baseLayer: null,
		baseLayerName: null,
		openSeaMapLayer: null,
		queryFactorRadius: 4,
		graticule: null,
		geoserverUrl: '',
		
		getBaseMapName : function() {
			return this.baseLayerName;
		},
		getBaseServerURL : function() {
			return this.geoserverUrl;
		},
		isBaseMapActive : function() {
			return this.baseLayer.getVisible();
		},
		
		// --------------------------------------------------------------------------------------------
		// Cria o Mapa Principal e Camadas auxiliares
		loadMap : function( container ) {
			me = this;
			this.init();
			
			this.map = new ol.Map({
				layers: [ this.baseLayer ],
				target: container,
				renderer: 'canvas',
			    loadTilesWhileAnimating: true,
			    loadTilesWhileInteracting: true,	
				controls: ol.control.defaults().extend([
				   new ol.control.ScaleLine(),
				   new ol.control.ZoomSlider(),
		           new ol.control.MousePosition({
		               undefinedHTML: '',
		               projection: 'EPSG:4326',
		               coordinateFormat: function(coordinate) {
		            	   var coord = ol.coordinate.toStringHDMS( coordinate );
		            	   return coord;
		               }
		           })
		        
				]),
				view: this.theView
			});	
			
			// Quando o mapa for arrastado ou o zoom mudar dispara o metodo updateMapCenter()
			this.map.getView().on('propertychange', function(e) {
				switch (e.key) {  
					case 'center':
						me.updateMapCenter();
						break;
					case 'resolution':  
						me.updateMapCenter();
						break;  
				}
			});				
			
		},
		// --------------------------------------------------------------------------------------------
		// Inicializa todas as variáveis e configuracoes
		init : function() {
			var config = MCLM.Globals.config;
			
			this.graticule = new ol.Graticule({
				strokeStyle: new ol.style.Stroke({
					color: 'rgba(255,120,0,0.9)',
					width: 1.5,
					lineDash: [0.5, 4]
				})
			});			
			
			this.geoserverUrl = config.geoserverUrl;
			this.baseLayerName = config.baseLayer;
			this.mapZoom = config.mapZoom; 
			this.mapCenter = config.mapCenter;
			this.queryFactorRadius = config.queryFactorRadius;				
			this.arrayMapCenter = JSON.parse("[" + this.mapCenter + "]");

			this.theView = new ol.View({
				center: ol.proj.transform( this.arrayMapCenter, 'EPSG:4326', 'EPSG:3857'),
				zoom: this.mapZoom
			});			
			
			this.openSeaMapLayer = this.createOpenSeaMapLayer();
			this.baseLayer = this.createBaseLayer();
			
		},
		// --------------------------------------------------------------------------------------------
		// Gera a Camada do OpenSeaMap
		createOpenSeaMapLayer : function() {
			
			var openSeaMapLayer = new ol.layer.Tile({
				  source: new ol.source.OSM({
				    crossOrigin: null,
				    url: 'http://t1.openseamap.org/seamark/{z}/{x}/{y}.png'
				})
			});
			openSeaMapLayer.set('name', 'OpenSeaMap');
			openSeaMapLayer.set('alias', 'OpenSeaMap');
			openSeaMapLayer.set('serverUrl', '' );
			openSeaMapLayer.set('serialId', 'mclm_openseamap_cmoa');
			openSeaMapLayer.set('ready', true);
			openSeaMapLayer.set('baseLayer', false);
			
			return openSeaMapLayer;
		},
		// --------------------------------------------------------------------------------------------
		// Gera a camada-base
		createBaseLayer : function() {
			
			var landLayer = new ol.layer.Tile({
			    source: new ol.source.TileWMS({
			        url: this.geoserverUrl,
			        isBaseLayer : true,
			        params: {
			            'LAYERS': this.baseLayerName, 
			            'FORMAT': 'image/png'
			        }
			    })
			});	
			landLayer.set('name', this.baseLayerName );
			landLayer.set('alias', 'Camada Base' );
			landLayer.set('serverUrl', this.geoserverUrl );
			landLayer.set('serialId', 'mclm_landlayer_cmoa');
			landLayer.set('ready', false);
			landLayer.set('baseLayer', true);
			this.bindTileEvent( landLayer );	
			
			return landLayer;
		},
		// --------------------------------------------------------------------------------------------
		// Liga um evento para detectar quando um tile da camada eh carregado
		// Trocar o jQuery por ExtJS ... 
		bindTileEvent : function( layer ) {
			var serialId =  layer.get('serialId');
			if ( serialId ) {
				
				layer.getSource().on('tileloadstart', function(event) {
					//console.log("tile '"+serialId+"' load start");
					$("#alert_" + serialId).css("display","block");
					$("#error_" + serialId).css("display","none");
					layer.set('ready', false);
					
				});
			
				// Tile Carregado. Temos ao menos alguma coisa da camada.
				// Oculta os icones de alerta e loading. 
				layer.getSource().on('tileloadend', function(event) {
					//console.log("tile '"+serialId+"' load end");
					$("#alert_" + serialId).css("display","none");
					$("#error_" + serialId).css("display","none");
					layer.set('ready', true);
					
				});
				
				layer.getSource().on('tileloaderror', function(event) {
					//console.log("tile '"+serialId+"' load error");
					$("#alert_" + serialId).css("display","none");
					$("#error_" + serialId).css("display","block");
					layer.set('ready', false);
					
				});
			}
			
		},
		// --------------------------------------------------------------------------------------------
		// Atualiza algumas coisas quando o mapa eh arrastado ou o zoom muda
		updateMapCenter : function() {
			var center = this.map.getView().getCenter();
			var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
			mapCenterLong = center2[0];
			mapCenterLat = center2[1];
			mapZoom = this.map.getView().getZoom();

			// Atualiza os atributos de mapa na tela de editar configuração
			// para facilitar ao usuario editar estes valores.
			// Precisa do try..catch para evitar erros quando a tela nao estiver sendo exibida.
			try {
				Ext.getCmp('mapCenterConfigField').setValue(mapCenterLong + "," + mapCenterLat);
				Ext.getCmp('mapZoomConfigField').setValue(mapZoom);
			} catch ( ignored ) { }			
		},
		// --------------------------------------------------------------------------------------------
		// Retorna o centro do mapa
		getMapCenter : function() {
			var center = this.map.getView().getCenter();
			var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
			mapCenterLong = center2[0];
			mapCenterLat = center2[1];
			return mapCenterLong + "," + mapCenterLat;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna o zoom atual do mapa
		getMapZoom : function() {
			return this.map.getView().getZoom();
		},
		// --------------------------------------------------------------------------------------------
		// Adiciona uma nova camada ao mapa
		addLayer : function( node ) {
			// passado: serviceUrl, layerName, layerAlias, serialId, layerType,
			// recebido: serverUrl, serverLayers, layerName, serialId, layerType, 
			var serverUrl = node.get('serviceUrl');
			var layerName = node.get('layerName');
			var layerAlias = node.get('layerAlias');
			var data = node.data;
			var serialId = node.get('serialId');
			var version = node.get('version');
			var layerType = node.get('layerType');			
			
			if( layerType == 'KML' ) {
				
				var kmlFileUrl = window.location + "/" + serverUrl; 
				//urlKml = "http://localhost:8080/mclm/kmlFolderStorage/map.kml";
				var newLayer = new ol.layer.Vector({
					  source: new ol.source.Vector({
						    url: kmlFileUrl,
						    isBaseLayer : false,
						    projection: ol.proj.get('EPSG:4326'),
						    format: new ol.format.KML()
					  })
				});				
				
			} else {
				var newLayer = new ol.layer.Tile({
				    source: new ol.source.TileWMS({
				        url: serverUrl,
				        isBaseLayer : false,
				        params: {
				        	tiled: true,
				            'layers': layerName,
				            'VERSION': '1.1.1', 
				            'format': 'image/png'
				        },
				        projection: ol.proj.get('EPSG:4326')
				    })
				});
			}
			
			newLayer.set('name', layerName);
			newLayer.set('alias', layerAlias);
			newLayer.set('serverUrl', serverUrl);
			newLayer.set('serialId', serialId);
			newLayer.set('layerType', layerType);
			newLayer.set('ready', false);
			newLayer.set('baseLayer', false);
			
			this.bindTileEvent( newLayer );
			this.map.addLayer( newLayer );

			// Adiciona na lista do gerenciador de camadas.
	    	var layerStackStore = Ext.getStore('store.layerStack');
			var stackGridPanel = Ext.getCmp('stackGridPanel');
	    	var layerStack = layerStackStore.getRange();
	    	layerStack.push( data );
			layerStackStore.loadData( layerStack );    				
	    	if ( stackGridPanel ) {
	    		stackGridPanel.getView().refresh();
	    	}			
			// ----------------------------------------------
			return newLayer;			
		},
		// --------------------------------------------------------------------------------------------
		// Checa se uma camada estah sendo exibida no mapa ou nao
		isLayerEnabled : function( layerName ) {
			var achou = false;
			this.map.getLayers().forEach( function ( layer ) {
				if( layer.U.name == layerName ) {
					achou = true;
				}
			});
			return achou;
		},
		// --------------------------------------------------------------------------------------------
		// Liga / desliga a grade de coordenadas
		toggleMapGrid : function () {
			if ( this.graticuleEnabled ) {
				this.graticule.setMap( null );
				this.graticuleEnabled = false;
			} else {
				this.graticule.setMap( this.map );
				this.graticuleEnabled = true;
			}	
		},		
		isGraticuleActive : function() {
			return this.graticuleEnabled;
		},
		// --------------------------------------------------------------------------------------------
		// Remove uma camada do mapa
		removeLayer : function ( layerName ) {
			var me = this;
			this.map.getLayers().forEach( function ( layer ) {
				if( layer.U.name == layerName ) {
					me.map.removeLayer( layer );	
					return;
				}
			});
			
			// Remove da lista de camadas do gerenciador de camadas
	    	var layerStackStore = Ext.getStore('store.layerStack');
	    	var stackGridPanel = Ext.getCmp('stackGridPanel');
	    	layerStackStore.each( function(rec) {
	    	    if (rec.data.layerName == layerName) {
	    	    	layerStackStore.remove(rec);
	    	        return false;
	    	    }
	    	});    	
	    	if ( stackGridPanel ) {
	    		stackGridPanel.getView().refresh();
	    	}   			
			
			
		},
		// --------------------------------------------------------------------------------------------
		// Liga/ Desliga o mapa do OpenSeaMap
		toggleSeaMapLayer : function() {
			if ( this.isLayerEnabled('OpenSeaMap') ) {
				this.removeLayer( 'OpenSeaMap' );
			} else {
				this.map.addLayer( this.openSeaMapLayer );	
			}
		},		
		// --------------------------------------------------------------------------------------------
		// Liga/ Desliga o mapa do OpenSeaMap
		toggleBaseLayer : function() {
			if ( this.baseLayer.getVisible() ) {
				this.baseLayer.setVisible(false);
			} else {
				this.baseLayer.setVisible(true);
			}
		},		
		// --------------------------------------------------------------------------------------------
		// Busca o indice de uma camada no mapa dado o seu nome
		indexOf : function (layers, layer) {
			var length = layers.getLength();
			for (var i = 0; i < length; i++) {
				var testLayer = layers.item( i );
				if ( layer === testLayer ) {
					return i;
				}
			}
			return -1;
		},		
		// --------------------------------------------------------------------------------------------
		// Retorna uma camada do mapa dado o seu nome
		findByName : function (name) {
			var layers = this.map.getLayers();
			var length = layers.getLength();
			for (var i = 0; i < length; i++) {
				var layerName = layers.item(i).get('name');
				if (name === layerName) {
					return layers.item(i);
				}
			}
			return null;
		},
		// --------------------------------------------------------------------------------------------
		// Marca uma camada como selecionada.
		selectLayer : function ( layerName ) {
			this.selectedLayer = this.findByName( layerName );
		},
		// --------------------------------------------------------------------------------------------
		// Pega a opacidade da camada selecionada
		getSelectedLayerOpacity: function () {
			if ( this.selectedLayer ) {
				return this.selectedLayer.getOpacity();
			} else {
				return 0;
			}
		},
		// --------------------------------------------------------------------------------------------
		// Ajusta a opacidade da camada selecionada
		setSelectedLayerOpacity : function ( opacity ) {
			if ( this.selectedLayer ) {
				console.log( opacity );
				this.selectedLayer.setOpacity( opacity );
			} else {
				Ext.Msg.alert('Nenhuma Camada Selecionada','Selecione uma camada para alterar sua opacidade.' );
			}
		},
		// --------------------------------------------------------------------------------------------
		// Modifica o indice de uma camada no mapa (nivel)
		setNewIndex : function ( layerName , newIndex ) {
			var layer = this.findByName( layerName );
			var layers = this.map.getLayers();
			var length = layers.getLength();
			var index = this.indexOf(layers, layer);
		    var layer = this.map.getLayers().removeAt( index );
		    this.map.getLayers().insertAt( newIndex, layer );	
		},		
		// --------------------------------------------------------------------------------------------
		// Retorna o bounding box atual do mapa
		getMapCurrentBbox : function () {
			var extent = this.map.getView().calculateExtent( this.map.getSize() );
		    var bottomLeft = ol.proj.transform( ol.extent.getBottomLeft( extent ), 'EPSG:3857', 'EPSG:4326' );
		    var topRight = ol.proj.transform( ol.extent.getTopRight( extent ), 'EPSG:3857', 'EPSG:4326' );
			return bottomLeft + "," + topRight;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna a URL para pegar a imagem PNG de uma camada 'layerName' do servidor 'serviceUrl'
		// Usa o BBOX atual da viewport do mapa
		getLayerImagePreview : function ( layerName, serviceUrl) {
			var	bbox = this.getMapCurrentBbox();
			var thumImg = serviceUrl + "/?service=WMS&srs=EPSG:4326&width=238&height=150&version=1.3&transparent=true&request=GetMap&layers="+layerName+"&format=image/png&bbox="+bbox;
			return thumImg;
		},		
		// --------------------------------------------------------------------------------------------
		//Retorna a URL para pegar a imagem PNG da legenda de uma camada 'layerName' do servidor 'serviceUrl'
		getLayerLegendImage : function ( layerName, serviceUrl ) {
			var url = serviceUrl + "/?service=WMS&version=1.3&request=GetLegendGraphic&format=image/png&layer=" + layerName;
			return url;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna todas as camadas existentes no mapa
		getCurrentLayersInMap : function () {
			return this.map.getLayers();
		},		
		// --------------------------------------------------------------------------------------------
		// Liga / desliga ferramenta de consulta de camada
	    toggleQueryTool : function () {
			if ( !this.queryToolEnabled ) {
				this.bindMapToQueryTool() ;
				this.queryToolEnabled = true;
		 	} else {
		 		this.unbindMapClick();
		 		this.queryToolEnabled = false;
		 	}
		},  
		// --------------------------------------------------------------------------------------------
		// Libera o click do mouse no mapa da ultima ferramenta ligada
		unbindMapClick : function () {
			if ( onClickBindKey ) {
				this.map.unByKey( onClickBindKey );
			}
		},		
		// --------------------------------------------------------------------------------------------
		// Liga o click do mouse no mapa com o metodo de consulta de camada
		bindMapToQueryTool : function () {
			var me = this;
			this.onClickBindKey = this.map.on('click', function(event) {
				me.queryMap( event.coordinate );
			});
			
		}, 		
		// --------------------------------------------------------------------------------------------
		queryMap: function ( coordinate ) {
			var virgula = "";
			var layerNames = "";
			var content = [];
			var urlFeatureInfo = "";
			var viewResolution = this.theView.getResolution();	
			var projection = this.theView.getProjection();
			var queryFactorRadius = this.queryFactorRadius;
			var featureCount = this.featureCount;
			var me = this;
			this.map.getLayers().forEach( function (layer) {
				var layerName = layer.U.name;
				var baseLayer = layer.U.baseLayer;
				var found = false;
				// Retire os comentarios para nao interrogar a camada de base
				//if ( layerName && ( !baseLayer ) ) {
					try {
						urlFeatureInfo = layer.getSource().getGetFeatureInfoUrl(
							coordinate, viewResolution, projection,
					        {'buffer':queryFactorRadius, 'QUERY_LAYERS': layerName,  'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': featureCount} 
						);
						found = true;
						me.queryLayer( layerName, urlFeatureInfo );
					} catch ( err ) { me.queryLayerError("Erro ao interrogar camada", layerName);  }
				//}				
				//if( !found ) {
				//	Ext.Msg.alert('Não é possível interrogar a camada de base','Não existem camadas a serem interrogadas.' );
				//}
			});
		},
		// --------------------------------------------------------------------------------------------
		// Interroga uma camada dada uma URL do tipo "REQUEST=GetFeatureInfo"
		queryLayer : function( layerName, urlFeatureInfo ) {
			console.log( urlFeatureInfo );
			var encodedUrl = encodeURIComponent( urlFeatureInfo );
			var me = this;
			Ext.Ajax.request({
		       url: 'queryLayer',
		       params: {
		           'targetUrl': encodedUrl,
		           'layerName' : layerName 
		       },       
		       success: function(response, opts) {
		    	   try {
			    	   var jsonObj = JSON.parse(response.responseText);
			    	   var rawData = [];
			    	   for ( x=0; x<jsonObj.features.length;x++ ) {
			    		   rawData.push( jsonObj.features[x].properties );
			    	   }
			    	   if ( rawData.length > 0 ) {
			    		   
			    		   
			    		   
			    		   var painelInferior = Ext.getCmp('painelInferior');
			    		   painelInferior.update( JSON.stringify( rawData ) );
			    		  //addGrid( layerName, rawData );
			    		  //$('#waitForQueryResultIcon').css('display','none');
			    		   
			    		   
			    		   
			    	   }
		    	   } catch ( err ) {
		    		   me.queryLayerError( response, layerName );
		    	   }
		       },
		       failure: function(response, opts) {
		    	   me.queryLayerError( response, layerName );
		       }
			});				
		},
		// --------------------------------------------------------------------------------------------
		// Exibe uma mensagem de erro da rotina "queryLayer"
		queryLayerError : function( response, layerName ) {
			//Ext.Msg.alert('Não é possível interrogar a camada de base','Não existem camadas a serem interrogadas.' );
			console.log( "queryLayerError Error: " + response + " " + layerName );
		},
		// --------------------------------------------------------------------------------------------
		// Solicita um conjunto de Features a partir de uma tabela do banco de dados
		getAsFeatures : function( tableName, queryParameter ) {

			var me = this;
			Ext.Ajax.request({
			       url: 'getAsFeatures',
			       params: {
			           'tableName': tableName,
			           'queryParameter' : queryParameter 
			       },       
			       success: function(response, opts) {
			    	   try {
				    	   	var jsonObj = JSON.parse(response.responseText);
				    	   	var features = response.responseText;//JSON.stringify( jsonObj );

				    	   	var defaultStyle = new ol.style.Style({
				    	        fill: new ol.style.Fill({
				    	          color: [250,250,250,1]
				    	        }),
				    	        stroke: new ol.style.Stroke({
				    	          color: [220,220,220,1],
				    	          width: 1
				    	        })
				    	    });
				    	   	
				    	   	var formatJSON = new ol.format.GeoJSON(); 
							var vectorSource = new ol.source.Vector({
								format: formatJSON 
							});
							
							//http://openlayersbook.github.io/ch06-styling-vector-layers/example-07.html
							var vectorLayer = new ol.layer.Vector({
						         source: vectorSource,
						         style: function(feature, resolution) {
						        	 
						        	 //var textLabel = feature.get('nome');
						        	 //console.log( textLabel );
						        	 
						        	 return [defaultStyle];
						         }
							});			

							vectorLayer.set('alias', tableName);
							vectorLayer.set('name', tableName);
							vectorLayer.set('serialId', tableName);
							vectorLayer.set('ready', false);
							vectorLayer.set('baseLayer', false);							
							
							var featuresOl = formatJSON.readFeatures( jsonObj, {featureProjection: 'EPSG:4326'} );
							vectorSource.addFeatures( featuresOl ) ;
							me.map.addLayer( vectorLayer );				    	   
				    	   
				    	   
			    	   } catch ( err ) {
			    		   me.queryLayerError( response, layerName );
			    	   }
			       }
			});
			
		},
		// --------------------------------------------------------------------------------------------
		getLayers : function() {
			return this.map.getLayers();
		},
		// --------------------------------------------------------------------------------------------
		// Apenas para debug. Apagar assim que possível.
		getLayersDetails : function () {
			var layers = this.map.getLayers();
			var length = layers.getLength();
			
			var result = [];
			
			
			console.log("CAMADAS EXISTENTES NO MAPA: -----------------------");
			for (var i = 0; i < length; i++) {
				var layerName = layers.item(i).get('name');
				var serverUrl = layers.item(i).get('serverUrl');
				var serialId = layers.item(i).get('serialId');
				var alias = layers.item(i).get('alias');
				var layerOpacity = layers.item(i).getOpacity();
				
				var layerDetail = {
					layerName:layerName, 
					serverUrl:serverUrl, 
					serialId:serialId, 
					alias:alias,
					layerOpacity: layerOpacity
				};
				
				result.push( layerDetail );
				console.log( layerDetail );
			}
			console.log("---------------------------------------------------");
		},
		// --------------------------------------------------------------------------------------------
		
		
		
	}

});
