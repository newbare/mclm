Ext.define('MCLM.view.tools.FastChangeWindow', {
	
	extend: 'Ext.Window',
	
	id:'fastChangeWindow',    	
	xtype: 'fastChangeWindow',
	title : "Troca Rápida de Cenários",
	width : 218,
	height: 70,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

    requires: [
       'MCLM.view.tools.FastChangeController',
       'MCLM.view.tools.FastChange',
    ],	
    
    controller : 'fastChangeController',
	
    items: [{
        xtype: 'fastChange',
    }],

    listeners: {

    	close : function() {
    		/*
    		Ext.tip.QuickTipManager.unregister('showForecastID');    	
    		Ext.tip.QuickTipManager.unregister('enableQueryLocationID');
    		*/    	
    	},
	    
	    afterrender : function ( cmp ) {
        	/*
    	    Ext.tip.QuickTipManager.register({
    	        target: 'togglePrecipitationID',
    	        title: 'Chuva',
    	        text: 'Exibe / Oculta camada de chuva OpenWeatherMap.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    });			
        	*/
	    	
        }
	
    },	
	
    
});