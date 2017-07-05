Ext.define('MCLM.view.tools.RestWeather', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	id:'restWeather',    	
	xtype: 'restWeather',

    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    items: [{
	    iconCls: 'inmet-icon',
        handler: 'showForecast',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'showForecastID',
        xtype: 'button',
    },{
	    iconCls: 'cptec-icon',
        handler: 'enableQueryLocation',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'enableQueryLocationID',
        xtype: 'button',
    }],

	
});