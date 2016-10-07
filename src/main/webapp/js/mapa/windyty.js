var windytyWindow = false;

function changeToTemp() {
	Ext.getDom('iframe-win').src = "https://embed.windytv.com/?-13.808,-53.013,609,message,temp,marker,metric.wind.km/h";
}

function changeToWind() {
	Ext.getDom('iframe-win').src = "https://embed.windytv.com/?-13.808,-53.013,609,message,marker,metric.wind.km/h";
}

function changeToClouds() {
	Ext.getDom('iframe-win').src = "https://embed.windytv.com/?-13.808,-53.013,609,message,clouds,marker,metric.wind.km/h";
}

function changeToRain() {
	Ext.getDom('iframe-win').src = "https://embed.windytv.com/?-13.808,-53.013,609,message,rain,marker,metric.wind.km/h";
}

function changeToWaves() {
	Ext.getDom('iframe-win').src = "https://embed.windytv.com/?-13.808,-53.013,609,message,waves,marker,metric.wind.km/h";
}

function changeToPressure() {
	Ext.getDom('iframe-win').src = "https://embed.windytv.com/?-13.808,-53.013,609,message,pressure,marker,metric.wind.km/h";
}


function showTemperatureMap() {
	
	if ( windytyWindow ) return;
	
	Ext.create('Ext.Window',{
		title : "Previsão do Tempo",
		id : 'windytyWindow',
		width : 750,
		height: 500,
		layout : 'fit',
		constrain: true,
		renderTo: Ext.getBody(),
	    dockedItems: [{
	        xtype: 'toolbar',
	        items: [{
	            text: 'Temperatura',
	            handler : changeToTemp
	        }, {
	            text: 'Vento',
	            handler : changeToWind
	        }, {
	            text: 'Nuvens',
	            handler : changeToClouds
	        }, {
	            text: 'Chuva/Neve',
	            handler : changeToRain
	        }, {
	            text: 'Ondas',
	            handler : changeToWaves
	        }, {
	            text: 'Pressão',
	            handler : changeToPressure
	        }]
	    }],
		
		items : [{
			xtype : "component",
			id:'iframe-win',
			margin: '0 0 0 0',
	        frame: false,
	        border: false,			
			autoEl : {
				tag : "iframe",
				src : "https://embed.windytv.com/?-13.808,-53.013,609,message,marker,metric.wind.km/h"
			}
		}],
		
        listeners: {
            destroy: function (wnd, eOpts) {
                windytyWindow = false;
            },
            close: function (wnd, eOpts) {
                windytyWindow = false;
            },
            hide: function (wnd, eOpts) {
                windytyWindow = false;
            }
        }		
		
	}).show();

	windytyWindow = true;

}

/*
<iframe 
	src="https://embed.windytv.com/?-13.808,-53.013,609,temp,marker" 
	width="600" height="400" frameborder="0">
</iframe>

Ext.getDom('iframe-win').src = "http://www.yahoo.com";
*/