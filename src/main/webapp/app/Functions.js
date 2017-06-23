Ext.define('MCLM.Functions', {
	
	statics: {
		countLog : 0,

		shortGuid : function() {
			  function s4() {
			    return Math.floor((1 + Math.random()) * 0x10000)
			      .toString(16)
			      .substring(1);
			  }
			  return "f" + s4() + s4();
		},		
		
		hexToRgbA : function(hex, transp){
		    var c;
		    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
		        c= hex.substring(1).split('');
		        if(c.length== 3){
		            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
		        }
		        c= '0x'+c.join('');
		        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+transp+')';
		    }
		    throw new Error('Bad Hex');
		},			
		
		guid : function() {
			  function s4() {
			    return Math.floor((1 + Math.random()) * 0x10000)
			      .toString(16)
			      .substring(1);
			  }
			  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			    s4() + '-' + s4() + s4() + s4();
		},
		
		hideMainLog : function () {
			$('#mainLogDisplayContainer').css('display','none');
			$('#mainLogDisplayTable tbody').empty();
		},
		
		mainLog : function ( message ) {
			$('#mainLogDisplayContainer').fadeIn(2000);
			this.countLog++;
			if ( this.countLog == 5 ) {
				this.countLog--;
				$('#mainLogDisplayTable tr:first').remove();
			}
			$("<tr><td>" + message + "</td></tr>").appendTo('#mainLogDisplayTable tbody').hide().fadeIn(2000);
		},

		makePattern : function( color, ptrHDist, ptrVDist, ptrLength, ptrHeight, ptrWidth ) {
			
			var newColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] +  ')';
			
			var cnv = document.createElement('canvas');
			var ctx = cnv.getContext('2d');
			cnv.width = ptrHDist;
			cnv.height = ptrVDist;
			
			ctx.globalAlpha = color[3];
			ctx.fillStyle = newColor;
		  
			// Comprimento nao pode ser maior que a dist H ou V.
			/*
			if ( (ptrLength > ptrHDist) || (ptrLength > ptrVDist) ) {
				// Iguala o comprimento a maior distancia
				if ( (ptrVDist > ptrHDist) ) ptrLength = prtVDist;
				if ( (ptrHDist > ptrVDist) ) ptrLength = prtHDist;
			}
			*/
			
			for(var i = 0; i < ptrLength; ++i) {
				ctx.fillRect(i, i, ptrWidth, ptrHeight);
			}
			return ctx.createPattern(cnv, 'repeat');
		},	
		
		openWindowData : function( record ) {
			
			if ( record.data_window == -1 ) {
				Ext.Msg.alert('Janela de Dados não encontrada','Não há janela de dados cadastrada para esta camada.' );
				return true;
			}
			
			MCLM.Functions.showMainLoadingIcon();
			MCLM.Functions.mainLog("Requisitando dados complementares da janela...");
			
			Ext.Ajax.request({
				url: 'getDataWindow',
				params: {
					'data': Ext.encode( record ),
				},       
				success: function(response, opts) {
					MCLM.Functions.hideMainLoadingIcon();
					var respText = Ext.decode(response.responseText);
					
					if ( respText.error ) {
						Ext.Msg.alert('Erro', respText.msg );
					} else {
						MCLM.Functions.createDataWindow( respText, record );
						MCLM.Functions.mainLog("Janela recebida: " + respText.windowName);
					}
					
				},
				failure: function(response, opts) {
					MCLM.Functions.hideMainLoadingIcon();
					Ext.Msg.alert('Erro','Erro ao receber dados.' );
				}
				
			});			
			
		},		
		
		createDataWindow( windowData, record ) {
			var symbolServerUrl = MCLM.Globals.config.symbolServerURL;
			var windowName = windowData.windowName;
			var windowPanels = windowData.panels;
			
			
			var	dataWindow = Ext.getCmp('dataWindow');
			if ( dataWindow ) {
				MCLM.Functions.removeDataWindowTooltip();
				dataWindow.destroy();
			} 
			
			dataWindow = Ext.create('Ext.Window', {
						id: 'dataWindow',    	
						xtype: 'dataWindow',
						title : windowName,
						width : 550,
						height: 500,
						bodyStyle:{"background-color":"white"},
						autoScroll: true,
						constrain: true,
						renderTo: Ext.getBody(),
						listeners : {
							 close : function() {
								 MCLM.Functions.removeDataWindowTooltip();
							 },
						}
			});
			
			var dataTabPanel = Ext.create('Ext.tab.Panel', {
                layout: 'card',
            });
			
			for (var i = 0; i < windowPanels.length; i++) {
				var fields = windowPanels[i].fields;
				
				var content = "<table class='dataWindow'>";
				var theColor = "000000";
				
				for (var x = 0; x < fields.length; x++) {
					var fieldValue = fields[x].fieldValue;
					var fieldType = fields[x].fieldType;
					if( fieldType == 'COLOR' ) {
						theColor = fieldValue.replace('#','');;
					}
				}

				for (var x = 0; x < fields.length; x++) {
					var fieldValue = fields[x].fieldValue;
					var fieldType = fields[x].fieldType;

					if( fieldType == 'SYMBOL' ) {
						var imageLink = symbolServerUrl + "?symbol=" + fieldValue + "&color=_" + theColor;
						var fieldValue = '<div style="width:52px;height:52px;border:1px solid #cacaca"><object id="iconPreview" style="width:50px;height:50px" type="image/svg+xml" data="'+imageLink+'"></object></div>';
						// http://10.5.115.136/SvgService/?symbol=500&color=_FF0000
					}
					
					
					if( fieldType == 'URL' ) {
						fieldValue = "<a target='__NEWWINDOW' href='"+fieldValue+"'>Link Externo</a>";
					}
					
					
					if( fieldType == 'COLOR' ) {
						fieldValue = "<div style='width:40px;height:20px;border:1px solid #cacaca;background-color:"+fieldValue+"'></div>";
					}
					
					
					if( fieldType == 'IMAGE' ) {
						fieldValue = "<img style='border:1px solid #cacaca;width:100px;height:100px' src='" + fieldValue + "'>";
					}
					
					content = content + "<tr class='dataWindowLine'><td class='dataWindowLeft'>" + fields[x].fieldCaption + 
					"</td><td class='dataWindowMiddle'>" + fieldValue + "</td></tr>";
				}
				content = content + "</table>";
				
				dataTabPanel.add({
				    title : windowPanels[i].panelName,
				    html  : content
				});
			}
			
			dataWindow.addDocked({
	            xtype: 'toolbar',
	            dock: 'top',
	            items: [{
	            	iconCls: 'scenery-icon',
	            	id: 'cloneToSceneryBtn',
	                handler: function(event, toolEl, panel){
	                    MCLM.Functions.cloneToScenery( windowData,record );
	                }	                
	            }, {
	            	iconCls: 'clima-icon',
	            	id: 'showWeatherBtn',
	                handler: function(event, toolEl, panel){
	                    MCLM.Functions.exibeClima( windowData, record );
	                }	                
	            }]
	        });
			
			dataWindow.show();
			dataWindow.add( dataTabPanel );			
			MCLM.Functions.bindDataWindowTooltips();
			
		},
		
		cloneToScenery : function( data, record ) {
			var feicao = {};
			var windowName = data.windowName;
			feicao["features"] = Ext.decode( record.mclm_metadata_property ).features;
			feicao.features[0].properties.feicaoNome = windowName;
			feicao.features[0].properties.feicaoDescricao = windowName;
			feicao["type"] = "FeatureCollection";
			
			var cloneToCenarioWindow = Ext.getCmp('cloneToCenarioWindow');
			if ( !cloneToCenarioWindow ) cloneToCenarioWindow = Ext.create('MCLM.view.datawindow.CloneToCenarioWindow');
			cloneToCenarioWindow.show();
			cloneToCenarioWindow.feicao = feicao;
		},
		
		exibeClima : function( data ) {
			console.log( data );
		},
		
		removeDataWindowTooltip : function() {
		 	 Ext.tip.QuickTipManager.unregister('cloneToSceneryBtn');
		 	 Ext.tip.QuickTipManager.unregister('showWeatherBtn');
		},
		bindDataWindowTooltips : function() {
		    Ext.tip.QuickTipManager.register({
		        target: 'cloneToSceneryBtn',
		        title: 'Copiar para o Cenário',
		        text: 'Copia os dados do elemento para o Cenário como uma Feição.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'showWeatherBtn',
		        title: 'Exibir Previsão',
		        text: 'Consulta a previsão do tempo para o local deste elemento.',
		        width: 150,
		        dismissDelay: 5000 
		    });			
		},
		
		showMainLoadingIcon : function( action ) {
    		$("#mainLoadingIcon").css('display','block');
    		$("#mainLoadingInfo").text( action );
    		$('#mainLoadingIcon').hide().show(0);
    		//console.log( action );
    	},
    	
		hideMainLoadingIcon : function() {
    		$("#mainLoadingInfo").text( "" );
    		$("#mainLoadingIcon").css('display','none');			
		},
		
		inicializaDicas : function() {
		    Ext.tip.QuickTipManager.init();
		    
		    Ext.tip.QuickTipManager.register(
		    
			{
			  target: 'id011',
			  title: 'Expandir Tudo',
			  text: 'Expande toda a árvore. Poderá demorar.',
			  width: 150,
			  dismissDelay: 5000 
			  	      
		    },     	
		    {
		      target: 'id012',
		      title: 'Recolher Tudo',
		      text: 'Recolhe toda a árvore.',
		      width: 150,
		      dismissDelay: 5000 
		    	      
		    },{
		      target: 'id111',
		      title: 'Configurações',
		      text: 'Configura aspectos gerais do sistema.',
		      width: 150,
		      dismissDelay: 5000 
		    }, {
		        target: 'id112',
		        title: 'Fontes Externas',
		        text: 'Gerencia os servidores de fontes externas de mapas.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'id115',
		        title: 'Grade Auxiliar',
		        text: 'Exibe a grade auxiliar do mapa.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id116',
		        title: 'Controle de Camadas',
		        text: 'Controla a disposição e visualizaçao das camadas ativas no mapa.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id117',
		        title: 'Interrogar Camadas',
		        text: 'Interroga as camadas ativas no mapa em determinada posição.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'id118',
		        title: 'Verificar Conectividade',
		        text: 'Verifica se o Sistema possui acesso externo à Ineternet (não o usuário).',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id119',
		        title: 'Ocultar/Exibir Base',
		        text: 'Oculta ou exibe a camada de base do mapa.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id120',
		        title: 'Calcular Rota',
		        text: 'Calcula a rota entre dois pontos.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'btnStyle',
		        title: 'Gerenciar Estilos',
		        text: 'Gerencia os estilos a serem aplicados nas camadas de dados.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'drawFeicaoBtn',
		        title: 'Desenhar Feições',
		        text: 'Exibe a barra de ferramentas de desenho de feições.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'reloadTreeBtn',
		        title: 'Atualizar a Árvore',
		        text: 'Atualiza toda a árvore carregando os dados do servidor novamente.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'showRestToolsBtn',
		        title: 'Serviços Externos',
		        text: 'Exibe ferramentas adicionais para utitilzação de serviços oferecidos por fontes externas.',
		        width: 150,
		        dismissDelay: 5000 
		    }); 	
		},

	}

});
