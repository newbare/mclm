Ext.define('MCLM.view.main.ToolBarPrincipal', {
	extend: 'Ext.toolbar.Toolbar',
	xtype: 'toolBarPrincipal',
    dock: 'right',
    overflowHandler: 'scroller',
    items: [{
		xtype: 'button',
		id: 'id111',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'setting-icon',
	    handler : 'testeFunction',
	    myVar : 'carlos magno abreu'
        /*
	    handler: function() {
        	//showConfig();
        } 
        */      
    }, 
    {
    	xtype: 'button',
    	id: 'id112',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'server-icon',
        handler: function() {
        	//manageServers();
        }       
    }, 
    {
    	xtype: 'button',
    	id: 'id113',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'forecast-icon',
        handler: function() {
        	//showTemperatureMap();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id114',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'buoy-icon',
	    enableToggle: true,
        handler: function() {
        	//toggleSeaMapLayer();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id115',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'grid-icon',
	    enableToggle: true,
        handler: function() {
        	//toggleMapGrid();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id116',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'layers-icon',
        handler: function() {
        	//showLayerStack();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id117',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    enableToggle: true,
	    iconCls: 'query-icon',
        handler: function() {
        	//toggleQueryTool();
        }
    }, 
    {
    	xtype: 'button',
    	id: 'id118',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'socket-icon',
        handler: function() {
        	//checkInternetConnection();
        }
    }]
});