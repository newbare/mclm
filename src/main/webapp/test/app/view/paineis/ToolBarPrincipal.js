Ext.define('MCLM.view.paineis.ToolBarPrincipal', {
	extend: 'Ext.toolbar.Toolbar',
	xtype: 'toolBarPrincipal',
    dock: 'right',
    overflowHandler: 'scroller',
    border : false,
    style: {
        background: '#FFFFFF'
    },    
    items: [{
		xtype: 'button',
		id: 'id111',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'setting-icon',
	    handler : 'showConfig',
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
        handler: 'toggleSeaMapLayer',
    }, 
    {
    	xtype: 'button',
    	id: 'id115',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'grid-icon',
	    enableToggle: true,
        handler: 'toggleMapGrid'
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
        handler: 'toggleQueryTool'
    }, 
    {
    	xtype: 'button',
    	id: 'id118',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'socket-icon',
        handler: 'checkInternetConnection'
    }]
});