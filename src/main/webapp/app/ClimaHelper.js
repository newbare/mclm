Ext.define('MCLM.ClimaHelper', {
	
	statics: {

		getAlerts : function() {
			
    		Ext.Ajax.request({
                url: 'getAlerts',
                failure: function (response, opts) {
                	
                },
                success: function (response, opts) {
                	var respObj = Ext.decode(response.responseText);
                	var items = respObj.rss.channel.item;
                	console.log( items );
                	
                	var div = "<div style='font-size:9px;width:550px;'>" + 
            		"<table style='width:100%;padding:0px;margin:0px'>";
                	
                	for( var x=0; x<items.length;x++  ) {
                		var obj = items[x];
                		var titulo = obj.title;
                		var link = obj.link;
                		div = div + "<tr><td>"+ obj.link +"</td><td style='border-bottom:1px dotted black'>" + obj.description + "</td></tr>";
                	}                	
                	
                	"</table></div>";
                	var previsaoForm = Ext.getCmp('previsaoClima');
                	previsaoForm.update( div );
                	
                	
                	
	
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