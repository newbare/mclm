Ext.define('MCLM.view.geocode.GeoCodeMapPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'geoCodeMapPanel',
	id: 'geoCodeMapPanel',
	
	region: 'north',
	
	height: 400,

    frame: false,
    margin: "0",		
	
	html: '<div style="width: 100%;height: 100%;" id="geocodeMap"></div>'
});	