/*
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
*/

function showTemperatureMap() {

	new Ext.Window({
		title : "Previsão do Tempo",
		width : 790,
		height: 650,
		renderTo: Ext.getBody(),
		layout : 'fit',
		items : [{
			xtype : "component",
			id:'iframe-win',
			margin: '0 0 0 0',
            frame: false,
            border: false,			
			autoEl : {
				tag : "iframe",
				src : "https://embed.windytv.com/?-13.808,-53.013,609,menu,message,marker,metric.wind.km/h"
			}
		}]
	}).show();
	
}

/*
 
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
 
 
 
 */


/*
<iframe 
	src="https://embed.windytv.com/?-13.808,-53.013,609,temp,marker" 
	width="600" height="400" frameborder="0">
</iframe>

Ext.getDom('iframe-win').src = "http://www.yahoo.com";
*/