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
			
			var me = this;
			setInterval( function(){ me.checkLayerIsReady(); }, 5000);
			
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
					console.log("tile '"+serialId+"' load start");
					$("#alert_" + serialId).css("display","block");
					$("#error_" + serialId).css("display","none");
					layer.set('ready', false);
					
				});
			
				// Tile Carregado. Temos ao menos alguma coisa da camada.
				// Oculta os icones de alerta e loading. 
				layer.getSource().on('tileloadend', function(event) {
					console.log("tile '"+serialId+"' load end");
					$("#alert_" + serialId).css("display","none");
					$("#error_" + serialId).css("display","none");
					layer.set('ready', true);
					
				});
				
				layer.getSource().on('tileloaderror', function(event) {
					console.log("tile '"+serialId+"' load error");
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
		// Adiciona uma nova camada ao mapa
		addLayer : function( serverUrl, serverLayers, layerName, serialId ) {
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
			newLayer.set('alias', layerName);
			newLayer.set('name', serverLayers);
			newLayer.set('serverUrl', serverUrl);
			newLayer.set('serialId', serialId);
			newLayer.set('ready', false);
			newLayer.set('baseLayer', false);
			
			this.bindTileEvent( newLayer );
			this.map.addLayer( newLayer );

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
		// --------------------------------------------------------------------------------------------
		// Remove uma camada do mapa
		removeLayer : function ( layerAlias ) {
			var me = this;
			this.map.getLayers().forEach( function ( layer ) {
				if( layer.U.alias == layerAlias ) {
					me.map.removeLayer( layer );	
					return;
				}
			});
		},
		// --------------------------------------------------------------------------------------------
		// De tempo em tempo verifica se as camadas estao prontas e remove o icone de loading.
		// Provavel bug no evento "tileLoadEnd" da camada. 
		checkLayerIsReady : function () {
			this.map.getLayers().forEach( function ( layer ) {
				var ready = layer.get('ready');
				if ( ready ) {
					var serialId = layer.get('serialId');
					$("#alert_" + serialId).css("display","none");
				}
			});
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
			this.selectedLayer = findByName( layerName );
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
				this.selectedLayer.setOpacity( opacity );
			} 
		},
		// --------------------------------------------------------------------------------------------
		// Modifica o indice de uma camada no mapa (nivel)
		setNewIndex : function ( layerName , newIndex ) {
			var layer = this.findByName( layerName );
			var layers = this.map.getLayers();
			var length = layers.getLength();
			var index = indexOf(layers, layer);
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
		       url: 'proxyRequest',
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
		queryLayerError : function( response, layerName ) {
			//Ext.Msg.alert('Não é possível interrogar a camada de base','Não existem camadas a serem interrogadas.' );
			console.log( "queryLayerError Error: " + response + " " + layerName );
		},
		
		
		
		
		// --------------------------------------------------------------------------------------------
		// Apenas para debug. Apagar assim que possível.
		listLayers : function () {
			var layers = this.map.getLayers();
			var length = layers.getLength();
			console.log("CAMADAS EXISTENTES NO MAPA: -----------------------");
			for (var i = 0; i < length; i++) {
				var layerName = layers.item(i).get('name');
				var serverUrl = layers.item(i).get('serverUrl');
				var serialId = layers.item(i).get('serialId');
				console.log("   > [" + i + "] " + layerName + "   " + serverUrl + "   " + serialId);
			}
			console.log("---------------------------------------------------");
		},
		// --------------------------------------------------------------------------------------------
		
		
		
	}

});
