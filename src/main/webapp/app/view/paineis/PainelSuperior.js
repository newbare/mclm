Ext.define('MCLM.view.paineis.PainelSuperior', {
	extend: 'Ext.Panel',
	xtype: 'painelSuperior',
	id: 'painelSuperior',
    region: 'north',
    floatable: false,
    margin: '0 0 0 0',
    height: 35,
    frame: false,
    collapsed: false,
    html : 	"<div id='topMainToolBar'>" +
    			"<a href='http://apolo.defesa.mil.br'><img style='margin-left:17px;' src='img/apolo_logo_small.png'></a>" +
    			/*"<a href='http://apolo.defesa.mil.br'><img id='topMainToolBarHomeIcon' src='img/home.svg'></a>" +*/
    			"<div id='topMainToolBarUserName'>&nbsp;</div>" +
    			
    		"</div>",
});
