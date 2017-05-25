Ext.define('MCLM.view.geocode.GeoCodeWindow', {
	extend: 'Ext.Window',
	
	requires: [
	   'MCLM.view.geocode.GeoCodeController',
	   'MCLM.view.geocode.GeoCodePanel',
	   'MCLM.view.geocode.GeoCodeSelStreetPanel',
	   'MCLM.view.geocode.GeoCodeMapPanel',
	],  
	
	controller : 'geocode',
	
	id:'geocodeWindow',    	
	xtype: 'geocodeWindow',
	title : "GeoCode",
	width : 750,
	height: 450,
	
	layout:'border',
	constrain: true,
	renderTo: Ext.getBody(),
	
    items : [{
        xtype: 'geoCodeMapPanel',
    },{
        xtype: 'geoCodeSelStreetPanel',
    },{
        xtype: 'geoCodePanel',
    }],
    
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'add-external-icon',
        	id: 'id311',
            handler : 'getAddress'
        }]
    }],	    
    
});