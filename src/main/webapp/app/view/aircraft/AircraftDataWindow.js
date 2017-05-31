Ext.define('MCLM.view.aircraft.AircraftDataWindow', {
	extend: 'Ext.Window',
	id:'aircraftDataWindow',    	
	xtype: 'aircraftDataWindow',
	title : "Dados da Aeronave",
	width : 800,
	height: 450,
	
	layout:'border',
	constrain: true,
	renderTo: Ext.getBody(),

	html : '',
    
});