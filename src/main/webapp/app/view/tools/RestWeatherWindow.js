Ext.define('MCLM.view.tools.RestWeatherWindow', {
	
	extend: 'Ext.Window',
	
	id:'restWeatherWindow',    	
	xtype: 'restWeatherWindow',
	title : "Serviços Meteorológicos",
	width : 220,
	height: 70,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

    requires: [
       'MCLM.view.tools.RestWeatherController',
       'MCLM.view.tools.RestWeather',
    ],	
    
    controller : 'restWeatherController',
	
    items: [{
        xtype: 'restWeather',
    }],

    listeners: {

    	close : function() {
    		Ext.tip.QuickTipManager.unregister('showForecastID');    	
    		MCLM.Map.unbindMapClick();
    	},
	    
	    afterrender : function ( cmp ) {
        	
    	    Ext.tip.QuickTipManager.register({
    	        target: 'showForecastID',
    	        title: 'Avisos Meteorológicos INMET',
    	        text: 'Centro Virtual para Avisos Meteorológicos Severos - INMET.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'enableQueryLocationID',
    	        title: 'Previsão para coordenadas',
    	        text: 'Previsão do tempo CPTEC para município em coordenada do mapa. Clique no mapa.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    });			
        	
        }
	
    },	
	
    
});