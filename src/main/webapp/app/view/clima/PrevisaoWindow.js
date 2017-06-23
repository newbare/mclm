Ext.define('MCLM.view.clima.PrevisaoWindow', {
	
	extend: 'Ext.Window',
	
	id:'previsaoClima',    	
	xtype: 'previsaoClima',
	title : "Avisos Meteorológicos",
	width : 600,
	height: 400,
	bodyStyle:"background:#FFFFFF;",
	resizable: true,
	constrain: true,
	renderTo: Ext.getBody(),

	autoScroll : true,
	
    listeners: {
		close : function() {
			MCLM.ClimaHelper.clear();
        	var detalheClima = Ext.getCmp('detalheClima');
        	if ( detalheClima ) {
        		detalheClima.close();
        	}			
		}
    }	

    
});