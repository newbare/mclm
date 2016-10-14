/*
 * Desenha os botoes.
 * Os icones dos botoes devem ser definidos no arquivo 
 * "style.css" e linkados no atributo "cls" do botao. 
 * 
 * as funcoes estao em wms.js
 * 
 */

var btnHeight = 32;
var btnWidth = 32;

var buttons = [{
		xtype: 'button',
		id: 'id111',
	    width: btnWidth,
	    height: btnHeight,
	    iconCls: 'setting-icon',
        handler: function() {
        	queryMap();
        }       
    }, 
    {
    	xtype: 'button',
    	id: 'id112',
	    width: btnWidth,
	    height: btnHeight,
	    iconCls: 'server-icon',
        handler: function() {
        	//
        }       
    }, 
    {
    	xtype: 'button',
    	id: 'id113',
	    width: btnWidth,
	    height: btnHeight,
	    iconCls: 'forecast-icon',
        handler: function() {
        	showTemperatureMap();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id114',
	    width: btnWidth,
	    height: btnHeight,
	    iconCls: 'buoy-icon',
	    enableToggle: true,
        handler: function() {
        	toggleSeaMapLayer();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id115',
	    width: btnWidth,
	    height: btnHeight,
	    iconCls: 'grid-icon',
	    enableToggle: true,
        handler: function() {
        	toggleMapGrid();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id116',
	    width: btnWidth,
	    height: btnHeight,
	    iconCls: 'layers-icon',
        handler: function() {
        	showLayerStack();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id117',
	    width: btnWidth,
	    height: btnHeight,
	    enableToggle: true,
	    iconCls: 'query-icon',
        handler: function() {
        	toggleQueryTool();
        }
    }
];

function initTips() {
	
    Ext.tip.QuickTipManager.init();

    Ext.tip.QuickTipManager.register({
      target: 'id111',
      title: 'Configurações',
      text: 'Configura aspectos gerais do sistema.',
      width: 150,
      dismissDelay: 5000 
    }, {
        target: 'id112',
        title: 'Fonte de Dados',
        text: 'Gerencia os servidores de fontes de mapas.',
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
    });	
	
}
