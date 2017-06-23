Ext.define('MCLM.ClimaHelper', {
	
	statics: {
		climaLayer : null,
		climaSource : null,
		icons : [],
		
		init : function() {
			var me = MCLM.ClimaHelper;
			
			me.climaSource = new ol.source.Vector();
			
			me.climaLayer = new ol.layer.Vector({
				source: me.climaSource,
			});	
			
			me.climaLayer.set('name', 'climaLayer');
			me.climaLayer.set('alias', 'climaLayer');
			me.climaLayer.set('serialId', 'climaLayer');
			me.climaLayer.set('baseLayer', false);
			me.climaLayer.set('ready', true);		
			
			MCLM.Map.removeLayerByName('climaLayer');
			MCLM.Map.map.addLayer( me.climaLayer );		
			
			me.icons["Ventos Costeiros"] = 'icon_alert-1.png';
			me.icons["Ressaca"] = 'icon_alert-2.png';
			me.icons["Onda de Frio"] = 'icon_alert-3.png';
			me.icons["Tornados"] = 'icon_alert-4.png';
			me.icons["Tempestade de Raios"] = 'icon_alert-5.png';
			me.icons["Granizo"] = 'icon_alert-6.png';
			me.icons["Chuvas Intensas"] = 'icon_alert-7.png';
			me.icons["Vendaval"] = 'icon_alert-8.png';
			me.icons["Onda de Calor"] = 'icon_alert-9.png';
			me.icons["Friagem"] = 'icon_alert-10.png';
			me.icons["Geada"] = 'icon_alert-11.png';
			me.icons["Estiagem"] = 'icon_alert-12.png';
			me.icons["Seca"] = 'icon_alert-13.png';
			me.icons["Incêndios"] = 'icon_alert-14.png';
			me.icons["Baixa Umidade"] = 'icon_alert-15.png';
			me.icons["Neve"] = 'icon_alert-16.png';
			me.icons["Declínio de Temperatura"] = 'icon_alert-17.png';
			me.icons["Acumulado de Chuva"] = 'icon_alert-18.png';
			me.icons["Tempestade"] = 'icon_alert-19.png';
	    	
		},
		
		getStytle : function( colorStyle ) {
			var rgba = MCLM.Functions.hexToRgbA( colorStyle, '0.2');
			
	    	var areaStyle = new ol.style.Style({
	    		stroke: new ol.style.Stroke({
	    			color: colorStyle,
	    			width: 1
	    		}),
	    		fill : new ol.style.Fill({
	                color: rgba
	            })
	    	});
	    	return areaStyle;
		},
		
		getAlerts : function() {
			
    		Ext.Ajax.request({
                url: 'getAlerts',
                failure: function (response, opts) {
                	
                },
                success: function (response, opts) {
                	var respObj = Ext.decode(response.responseText);
                	var items = respObj.rss.channel.item;
                	var div = "<div style='font-size:10px;width:99%;margin:5px'><table id='avisoMetTable'>";
                	
                	for( var x=0; x<items.length;x++  ) {
                		var obj = items[x];
                		var titulo = obj.title;
                		var link = obj.link;
                		var description = Ext.decode(obj.description);
                		
                		var tableDesc = "<table class='tableDesc'>";
                		$.each(description, function(k, v) {
                		    tableDesc = tableDesc + "<tr><td style='vertical-align:top;font-weight:bold;width:15%'>" + k + "</td><td>" + v + "</td></tr>";
                		    
                		});                		
                		var avisoMetLine = "avisoMetLine" + x;
                		tableDesc = tableDesc + "</table>";
                		div = div + '<tr class="avisoMetLine" id="'+avisoMetLine+'"><td class="avisoMetLeft"><img style="cursor:pointer;width: 28px;height:28px;" src="img/see-weather.png" onclick="MCLM.ClimaHelper.details(\''+avisoMetLine+'\',\''+ link +'\')"></td><td class="avisoMetRight">' + tableDesc + '</td></tr>';
                	}                	
                	
                	div = div + "</table></div>";
                	var previsaoForm = Ext.getCmp('previsaoClima');
                	previsaoForm.update( div );
                	
                }
                
    		});
		},
		
		clear : function() {
			MCLM.Map.removeLayerByName('climaLayer');
			var button = Ext.getCmp('id117');
			if ( button ) button.toggle( false, false );
	 		MCLM.Map.unbindMapClick();
	 		MCLM.Map.queryToolEnabled = false;			
		},
		
	    deleteAlertsAreas : function() {
	    	var features = MCLM.ClimaHelper.climaSource.getFeatures();
	    	for ( x=0; x < features.length; x++ ) {
	    		var feature = features[x];
	    		MCLM.ClimaHelper.climaSource.removeFeature( feature );
	    	}
	    },			
		
	    getCityLevels : function( lat, lon ) {

    		Ext.Ajax.request({
                url: 'getCityAlertLevels',
 		        params: {
 		           'lat': lat,
 		           'lon' : lon,
 		        },                  
                failure: function (response, opts) {
                	
                },
                success: function (response, opts) {
                	var respObj = Ext.decode(response.responseText);
                	console.log( respObj );
                }
    		});
	    	
	    },
	    
		details : function( avisoMetLine, link ) {
			
			$('.avisoMetLine').css('background-color', '#FFFFFF');
			$('#'+avisoMetLine).css('background-color', '#e8e8e8');
			
        	var detalheClima = Ext.getCmp('detalheClima');
        	if ( detalheClima ) {
        		detalheClima.close();
        	}			
			
    		Ext.Ajax.request({
                url: 'getWarningDetail',
 		        params: {
 		           'source': link
 		        },                  
                failure: function (response, opts) {
                	
                },
                success: function (response, opts) {
                	var respObj = Ext.decode(response.responseText);
                	var description = respObj.alert.info.description;
                	var coords = respObj.alert.info.area.polygon.split(' ');
                	var title = respObj.alert.info.event;

                	var parameter = respObj.alert.info.parameter; 
                	var colorRisk = parameter[0].value;
                	var municipios = parameter[3].value;
                	var estados = parameter[4].value;
                	
                	var msgType = respObj.alert.msgType;
                	var status = respObj.alert.status;
                	var sender = respObj.alert.sender;
                	var scope = respObj.alert.scope;
                	var sent = respObj.alert.sent;

                	var category = respObj.alert.info.category;
                	var certainty = respObj.alert.info.certainty;
                	var contact = respObj.alert.info.contact;
                	var event = respObj.alert.info.event;
                	var expires = respObj.alert.info.expires;
                	var headline = respObj.alert.info.headline;
                	var instruction = respObj.alert.info.instruction;
                	var severity = respObj.alert.info.severity;
                	var responseType = respObj.alert.info.responseType;
                	var senderName = respObj.alert.info.senderName;
                	var urgency = respObj.alert.info.urgency;
                	var web = respObj.alert.info.web;
                	
                	var polyCoords = [];
                	for (var i in coords) {
                	  var coord = coords[i].split(',');
                      var lat = Number(coord[0].trim());
                      var lon = Number(coord[1].trim());
                	  polyCoords.push( [lon, lat] );
                	}

                	var polygon = new ol.geom.Polygon([polyCoords]);
                	polygon.transform('EPSG:4326','EPSG:3857');
                	
                    var feature = new ol.Feature({
                        geometry: polygon
                    });
                    
                
                    feature.set('title', title );
                    feature.set('description', description );
                	feature.set('msgType', msgType );
                	feature.set('status', status );
                	feature.set('sender', sender );
                	feature.set('scope', scope );
                	feature.set('sent', sent );
                	feature.set('category', category );
                	feature.set('certainty', certainty );
                	feature.set('contact', contact );
                	feature.set('event', event );
                	feature.set('expires', expires );
                	feature.set('headline', headline );
                	feature.set('instruction', instruction );
                	feature.set('severity', severity );
                	feature.set('responseType', responseType );
                	feature.set('senderName', senderName );
                	feature.set('urgency', urgency );
                	feature.set('web', web );
                	feature.set('colorRisk', colorRisk );
                	feature.set('municipios', municipios );
                	feature.set('estados', estados );
                	feature.set('icon', MCLM.ClimaHelper.icons[event] );
                	
                	feature.setStyle( MCLM.ClimaHelper.getStytle( colorRisk ) );
                	
                    MCLM.ClimaHelper.deleteAlertsAreas();
                    MCLM.ClimaHelper.climaSource.addFeature( feature );
                    MCLM.Map.map.getView().fit( MCLM.ClimaHelper.climaSource.getExtent(), {duration: 2000, maxZoom: 14} );

                }
    		});
			
		},

		showDetails : function( feature, coordinate ) {
			
			var coordinateNew = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
			MCLM.ClimaHelper.getCityLevels( coordinateNew[1], coordinateNew[0]);
			
            var title = feature.get('title');
            var description = feature.get('description');
        	var msgType = feature.get('msgType');
        	var status = feature.get('status');
        	var sender = feature.get('sender');
        	var scope = feature.get('scope');
        	var sent = feature.get('sent');
        	var category = feature.get('category');
        	var certainty = feature.get('certainty');
        	var contact = feature.get('contact');
        	var event = feature.get('event');
        	var expires = feature.get('expires');
        	var headline = feature.get('headline');
        	var instruction = feature.get('instruction');
        	var severity = feature.get('severity');
        	var responseType = feature.get('responseType');
        	var senderName = feature.get('senderName');
        	var urgency = feature.get('urgency');
        	var web = feature.get('web');	
        	var colorRisk = feature.get('colorRisk');
        	var municipios = feature.get('municipios');
        	var estados = feature.get('estados');
        	var icon = feature.get('icon');
        	

        	var link = "<a target='__BLANK' href='"+web+"'>" + web + "</a>";
        	var div = "<div style='padding:3px;text-align:center;font-size:9px;font-weight:bold;width:100%;height:15px'>" + headline + "</div>" + 
        	"<div style='padding:5px;border-bottom:1px dotted #cacaca;text-align:center;font-size:9px;width:100%;height:20px'>" + sender + "</div>" +
        	"<div style='position:absolute;top:5px;left:10px;'><img src='img/clima/"+icon+"'></div>";
        	var table = "<table style='padding:3px;border:0px;margin:0px;'>";
        	table = table + "<tr><td style='border-bottom:1px dotted #cacaca;vertical-align:top;width:80px;'>Estados</td><td><div style='border-bottom:1px dotted #cacaca;height:20px;'>" + estados + "</div></td></tr>" +
        		"<tr><td style='border-bottom:1px dotted #cacaca;vertical-align:top;width:80px;'>Municípios</td><td><div style='border-bottom:1px dotted #cacaca;height:100px;overflow-y:scroll'>" + municipios + "</div></td></tr>" +
        		"<tr><td style='vertical-align:top;width:80px;'>Instruções</td><td><div style='height:100px;overflow-y:scroll;'>" + instruction + "</div></td></tr>";
        		
        	table = table + "</table>";
        	div = div + "<div style='font-size:9px;width:100%;height:240px;'>"+table+"</div>"; 
        	
        	
        	div = div + "<div style='padding-top:5px;font-size:9px;text-align:center;border-top:1px dotted #cacaca;width:100%;height:20px;'>"+senderName+"<br>"+contact+"<br>"+link+"</div>"; 
        	
        	var detalheClima = Ext.getCmp('detalheClima');
        	if ( !detalheClima ) {
        		detalheClima = Ext.create('MCLM.view.clima.DetailWindow');
        	}
        	
        	detalheClima.update( div );
        	detalheClima.show();
        	
		}
		
		/*
		searchCidade : function( nome ) {
			
    		Ext.Ajax.request({
                url: 'searchCidade',
 		        params: {
		           'nome': nome
		        },       
                failure: function (response, opts) {
                	
                },
                success: function (response, opts) {
                	var respObj = Ext.decode(response.responseText);
                	console.log( respObj );
                	
                	var previsaoForm = Ext.getCmp('previsaoForm');
                	previsaoForm.update( div );
                	
                	
                }
                
    		});			
		},
		*/
		
		
	}

});