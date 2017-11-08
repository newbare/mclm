Ext.define('MCLM.view.ships.ShipsHUDWindow', {
	extend: 'Ext.Window',
	id:'shipsHUDWindow',    	
	xtype: 'shipsHUDWindow',
	title : "Navegação",
	width : 300,
	height: 300,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),
	frame : false,
	border : false,
	html : '<img style="position:absolute;top:27px;left:125px" src="img/compasspointer.png"><img id="imgCompass" style="position:absolute; top:15px;left:-109px;width:500px;height:500px" src="img/compass.png">' +
	'<div style="padding:10px;border-top:1px solid #cacaca;width:290px;height:180px;background-color:white;position:absolute;bottom:0px">' +
	'<table>' +
	'<tr><td colspan="3"><span id="shipPosition" style="width:290px"></span></td></tr>' +
	'<tr><td><span id="shipRudder"></span></td><td><span id="shipHeading"></span></td><td><span id="shipSpeed"></span></td></tr>' +
	'</table>' +
	'<img id="theRudder" style="position: absolute;bottom: -150px;left: 15px;" src="img/rudder.ico">' +
	'<div style="position:absolute;width:100px;height:100px;bottom:1px;right:1px;cursor:pointer" id="rudderToRight"></div>' + 
	'<div style="position:absolute;width:100px;height:100px;bottom:1px;left:1px;cursor:pointer" id="rudderToLeft"></div>' +
	'</div>',
    
});