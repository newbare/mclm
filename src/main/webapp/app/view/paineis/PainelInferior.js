Ext.define('MCLM.view.paineis.PainelInferior', {
	extend: 'Ext.Panel',
	xtype: 'painelInferior',
	id: 'painelInferior',
    region: 'south',
    floatable: false,
    margin: '0 0 0 0',
    height: 25,
    collapsed: false,
    html : 	"<div id='statusBarDiv' ><div style='float:right'>" + 
     	"<table id='statusBarTable'><tr>" + 
     		"<td class='statusBarName'>HDMS:</td><td class='statusBarValue' id='coord_hdms'>&nbsp;</td>" + 
     		"<td class='statusBarName'>UTM :</td><td class='statusBarValue' id='coord_utm'>&nbsp;</td>" + 
     		"<td class='statusBarName'>Mapa:</td><td class='statusBarValue' id='coord_map'>&nbsp;</td>" + 
     		"<td class='statusBarName'>Versão:</td><td class='statusBarValue' >1.0.273 24/06/2017</td>" + 
     	"</tr></table>" + 
     "</div></div>",
});
