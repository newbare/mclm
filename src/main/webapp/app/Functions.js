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
						MCLM.Functions.createDataWindow( respText );
					}
					
				},
				failure: function(response, opts) {
					MCLM.Functions.hideMainLoadingIcon();
					Ext.Msg.alert('Erro','Erro ao receber dados.' );
				}
				
			});			
			
		},		
		
		createDataWindow( windowData ) {
			console.log( windowData );
			var windowName = windowData.windowName;
			var windowPanels = windowData.panels;
			var windowId = MCLM.Functions.shortGuid();
			
			
			// Usar a mesma janela !!!!
			
			var	dataWindow = Ext.create('Ext.Window', {
					id: windowId,    	
					xtype: windowId,
					title : windowName,
					width : 550,
					height: 500,
					bodyStyle:{"background-color":"white"},
					autoScroll: true,
					constrain: true,
					renderTo: Ext.getBody(),
			});			
			
			var dataTabPanel = Ext.create('Ext.tab.Panel', {
                layout: 'card',
            });
			
			for (var i = 0; i < windowPanels.length; i++) {
				var fields = windowPanels[i].fields;
				
				var content = "<table class='dataWindow'>";
				for (var x = 0; x < fields.length; x++) {
					content = content + "<tr class='dataWindowLine'><td class='dataWindowLeft'>" + fields[x].fieldCaption + 
					"</td><td class='dataWindowMiddle'>" + fields[x].fieldValue + "</td></tr>";
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
	                text: 'user 1',
	                handler: function(event, toolEl, panel){
	                    MCLM.Functions.processCustomButton( toolEl );
	                }	                
	            }, {
	                text: 'user 2',
	                handler: function(event, toolEl, panel){
	                    MCLM.Functions.processCustomButton( toolEl );
	                }	                
	            }]
	        });
			
			//var toolbar = dataWindow.down('toolbar');
			//toolbar.add('<div>Hi</div>');
			
			dataWindow.show();
			dataWindow.add( dataTabPanel );			
			
		},
		processCustomButton : function( data ) {
			alert( data );
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
		    }, {
		        target: 'id113',
		        title: 'Previsão do Tempo',
		        text: 'Diversos aspectos climáticos em tempo real. Necessita acesso à Internet.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id114',
		        title: 'Elementos de Navegação',
		        text: 'Exibe elementos de carta náutica que auxiliam a navegação. Necessário nível de zoom apropriado.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
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
		    }); 	
		},

	}

});
