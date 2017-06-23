Ext.define('MCLM.ClimaHelper', {
	
	statics: {
		climaLayer : null,
		climaSource : null,
		
		init : function() {
			var me = MCLM.ClimaHelper;
			
			this.climaSource = new ol.source.Vector();
			
			
	    	var areaStyle = new ol.style.Style({
	    		stroke: new ol.style.Stroke({
	    			color: 'green',
	    			width: 1
	    		}),
	    		fill : new ol.style.Fill({
	                color: 'rgba(0, 0, 255, 0.1)'
	            })
	    	});
	    	
			this.climaLayer = new ol.layer.Vector({
				source: this.climaSource,
				style: areaStyle
			});	
			
			this.climaLayer.set('name', 'climaLayer');
			this.climaLayer.set('alias', 'climaLayer');
			this.climaLayer.set('serialId', 'climaLayer');
			this.climaLayer.set('baseLayer', false);
			this.climaLayer.set('ready', true);		
			
			MCLM.Map.removeLayerByName('climaLayer');
			MCLM.Map.map.addLayer( this.climaLayer );			
	    	
		},
		
		
		getAlerts : function() {
			
    		Ext.Ajax.request({
                url: 'getAlerts',
                failure: function (response, opts) {
                	
                },
                success: function (response, opts) {
                	var respObj = Ext.decode(response.responseText);
                	var items = respObj.rss.channel.item;
                	var div = "<div style='font-size:10px;width:550px;margin:5px'><table style='width:100%;padding:0px;margin:0px'>";
                	
                	for( var x=0; x<items.length;x++  ) {
                		var obj = items[x];
                		var titulo = obj.title;
                		var link = obj.link;
                		var description = Ext.decode(obj.description);
                		
                		var tableDesc = "<table>";
                		$.each(description, function(k, v) {
                		    tableDesc = tableDesc + "<tr><td style='vertical-align:top;font-weight:bold;width:15%'>" + k + "</td><td>" + v + "</td></tr>";
                		    
                		});                		
                		tableDesc = tableDesc + "</table>";
                		
                		div = div + '<tr><td style="border-bottom:1px dotted black;text-align:center;vertical-align:top;width:40px"><img style="cursor:pointer;width: 28px;height:28px;" src="img/see-weather.png" onclick="MCLM.ClimaHelper.details(\''+ link +'\')"></td><td style="border-bottom:1px dotted black">' + tableDesc + '</td></tr>';
                	}                	
                	
                	div = div + "</table></div>";
                	var previsaoForm = Ext.getCmp('previsaoClima');
                	previsaoForm.update( div );
                	
                	
                	
	
                }
                
    		});
		},
		
		clear : function() {
			MCLM.Map.removeLayerByName('climaLayer');
		},
		
		details : function( link ) {
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

                	var detalheClima = Ext.getCmp('detalheClima');
                	if ( !detalheClima ) {
                		detalheClima = Ext.create('MCLM.view.clima.DetailWindow');
                	}
                	
                	var polyCoords = [];
                	for (var i in coords) {
                	  var coord = coords[i].split(',');
                	  
                      var lat = Number(coord[0].trim());
                      var lon = Number(coord[1].trim());
                      var coordinate = ol.proj.transform([lat, lon], 'EPSG:3857', 'EPSG:4326');                	  
                	  
                	  polyCoords.push( [lat, lon] );
                	}

                	console.log( polyCoords );
                	
                	var polygon = new ol.geom.Polygon([polyCoords]);
                	//polygon.transform('EPSG:3857','EPSG:4326');
                	
                	//console.log( polygon );
                	
                    var feature = new ol.Feature({
                        geometry: polygon
                    });                	
                    MCLM.ClimaHelper.climaSource.addFeature( feature );
                    
                	//detalheClima.update( description );
                	//detalheClima.show();
                	//detalheClima.setTitle( title );
                }
    		});
			
		},
		
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
		
		
		
	}

});