/*
 * Desenha os botoes.
 * Os icones dos botoes devem ser definidos no arquivo 
 * "style.css" e linkados no atributo "cls" do botao. 
 * 
 * As dicas dos botoes estao no arquivo tips.js
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
        	showTemperatureMap();
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
    }
];


