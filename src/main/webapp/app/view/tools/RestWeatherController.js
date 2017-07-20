Ext.define('MCLM.view.tools.RestWeatherController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.restWeatherController',
    precEnabled : false,
    pressureEnabled : false,
    windEnabled : false,
    tempEnabled : false,
    
    togglePrecipitation : function() {
    	
    	if( this.precEnabled ) {
    		this.precEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_owm_precip' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.precipitacaoLayer );
    		this.precEnabled = true;
    	}
    	
    },

    togglePressure : function() {
    	
    	if( this.pressureEnabled ) {
    		this.pressureEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_owm_pressure' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.pressureLayer );
    		this.pressureEnabled = true;
    	}
    	
    },    

    toggleWind : function() {
    	
    	if( this.windEnabled ) {
    		this.windEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_owm_wind' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.windLayer );
    		this.windEnabled = true;
    	}
    	
    },       

    toggleTemp : function() {
    	
    	if( this.tempEnabled ) {
    		this.tempEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_owm_temperature' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.tempLayer );
    		this.tempEnabled = true;
    	}
    	
    },   
    
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
    },
    
    showWindyWindow : function() {
    	MCLM.Map.showWindyWindow();
    },
    
});