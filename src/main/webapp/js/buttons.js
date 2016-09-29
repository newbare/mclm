/*
 * Desenha os botoes.
 * Os icones dos botoes devem ser definidos no arquivo 
 * "style.css" e linkados no atributo "cls" do botao. 
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
            alert("Ui");
        }       
    }, 
    '-', 
    {
    	xtype: 'button',
    	id: 'id112',
	    width: btnWidth,
	    height: btnHeight,
	    iconCls: 'server-icon',
        tooltip: 'This is a an example QuickTip for a toolbar item',
        handler: function() {
            alert("Ai");
        }       
}];


