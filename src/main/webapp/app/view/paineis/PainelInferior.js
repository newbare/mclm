Ext.define('MCLM.view.paineis.PainelInferior', {
	extend: 'Ext.Panel',
	xtype: 'painelInferior',
	id: 'painelInferior',
    region: 'south',
    floatable: false,
    margin: '0 0 0 0',
    height: 28,
    collapsed: false,
    html : 	"<div id='statusBarDiv' ><div style='float:right'>" + 
     	"<table id='statusBarTable'><tr>" + 
     		 /* "<td class='statusBarName'>OSM:</td><td class='statusBarValue' style='width:200px' id='osmSource'>&nbsp;</td>" + */ 
     		"<td class='statusBarName'>Escala:</td><td class='statusBarValue' style='width:50px' id='mapScale'>&nbsp;</td>" + 
     		"<td class='statusBarName'>Serv.:</td><td class='statusBarValue' style='width:120px' id='serverHostName'>&nbsp;</td>" + 
     		"<td class='statusBarName'>HDMS:</td><td class='statusBarValue' id='coord_hdms'>&nbsp;</td>" + 
     		"<td class='statusBarName'>UTM :</td><td style='width:110px' class='statusBarValue' id='coord_utm'>&nbsp;</td>" + 
     		"<td class='statusBarName'>Mapa:</td><td style='width:110px' class='statusBarValue' id='coord_map'>&nbsp;</td>" + 
     		"<td class='statusBarName'>Zoom: </td><td style='width:55px' class='statusBarValue'>" +
     			"<img id='zoomDefault' onclick='MCLM.Map.toDefault();' style='cursor:pointer;margin-right:5px;' src='img/zoom-in.png'> " +
     			"<img id='zoomMinimum' onclick='MCLM.Map.toWorld();'style='cursor:pointer' src='img/zoom-out.png'></td>" + 
     	"</tr></table>" + 
     "</div></div>",
});
