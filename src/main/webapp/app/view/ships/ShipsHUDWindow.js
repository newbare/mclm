Ext.define('MCLM.view.ships.ShipsHUDWindow', {
	extend: 'Ext.Window',
	id:'shipsHUDWindow',    	
	xtype: 'shipsHUDWindow',
	title : "Dados do Navio",
	width : 300,
	height: 300,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),
	frame : false,
	border : false,
	html : '<img style="position:absolute;top:27px;left:130px" src="img/compasspointer.png"><img id="imgCompass" style="position:absolute; top:15px;left:-105px;width:500px;height:500px" src="img/compass.png">' +
	'<div style="padding:10px;border-top:1px solid #cacaca;width:290px;height:180px;background-color:white;position:absolute;bottom:0px">' +
	'<table>' +
	'<tr><td><span id="shipPosition" style="width:290px"></span></td></tr>' +
	'<tr><td><span id="shipRudder" style="width:290px"></span></td></tr>' +
	'</table>' +
	'</div>',
    
});