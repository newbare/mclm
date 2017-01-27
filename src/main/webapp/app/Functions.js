Ext.define('MCLM.Functions', {
	
	statics: {
		
		guid : function() {
			  function s4() {
			    return Math.floor((1 + Math.random()) * 0x10000)
			      .toString(16)
			      .substring(1);
			  }
			  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			    s4() + '-' + s4() + s4() + s4();
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
		    }); 	
		},

		// Deixei comentado porque estava dando muito trabalho criar um preview da linha
		// no editor de estilos.
		// Quando for a hora, ir em 'MCLM.view.style.PolyStyleEditorForm' e habilitar o CANVAS.
		// Ir em 'MCLM.view.style.StyleEditorController' e habilitar os eventos e métodos
		// correnpondentes.
		/*
		updateRectStylePreview : function(canvas,width,height,fillStyle,strokeStyle, color) {
			if ( !canvas ) return false;
			
			var ctx = canvas.getContext('2d');
			ctx.strokeStyle = color;
			ctx.clearRect( 0, 0, canvas.width, canvas.height );
			
			ctx.fillStyle = fillStyle;
			ctx.strokeStyle = strokeStyle;
			
		},
		updateLineStylePreview : function(canvas,width,linecap,dashes, color) {
			// http://phrogz.net/tmp/canvas_dashed_line.html
			if ( !canvas ) return false;
			
			var ctx = canvas.getContext('2d');
			ctx.strokeStyle = color;

			var xy1     = "10 50",
			    xy2     = "250 50";
			
			var x1y1 = xy1.split(/\D+/);
			var x2y2 = xy2.split(/\D+/);
			ctx.clearRect( 0, 0, canvas.width, canvas.height );
			var dashGapArray = dashes.replace(/^\s+|\s+$/g,'').split(/\s+/);
			if (!dashGapArray[0] || (dashGapArray.length==1 && dashGapArray[0]==0)) return;

			ctx.lineWidth = width;
			ctx.lineCap   = linecap;
			ctx.beginPath();
			
			ctx.dashedLine( x1y1[0]*1, x1y1[1]*1, x2y2[0]*1, x2y2[1]*1, dashGapArray );
			ctx.stroke();
		}
		*/
	}

});
