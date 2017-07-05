Ext.define('MCLM.view.tools.RestWeatherController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.restWeatherController',
   
    showForecast : function() {
		var previsaoClima = Ext.getCmp('previsaoClima');
		if ( !previsaoClima ) {
			previsaoClima = Ext.create('MCLM.view.clima.PrevisaoWindow');
		}
		previsaoClima.show();
		previsaoClima.alignTo(Ext.getBody(), "tl-tl", [0, 0]);
		MCLM.ClimaHelper.init();
		MCLM.ClimaHelper.getAlerts();
    },
    
    enableQueryLocation : function() {
    	MCLM.Map.enableQueryLocation();
    }
    
});