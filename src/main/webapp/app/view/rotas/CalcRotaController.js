Ext.define('MCLM.view.rotas.CalcRotaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.calcRota',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addfolder.NewFolderForm' 
            '#calcRotaFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addfolder.NewFolderForm' 
            '#closeRotaWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var rotaWindow = Ext.getCmp('rotaWindow');
    	rotaWindow.close();
    	MCLM.Globals.routeBlinkEnabled = false;
    	MCLM.Map.unbindMapClick();
    	
    	MCLM.Globals.selectRouteActiveIcon = 'selectSourceIcon';
    	$("#selectTargetIcon").css("display","none");    	
    },
    
    submitForm : function( ) {
    	var me = this;
    	var source = $("#sourceValue").val();
    	var target = $("#targetValue").val();
    	//var	bbox = MCLM.Map.getMapCurrentBbox();

    	if ( !source || !target ) {
    		Ext.Msg.alert('Erro','Selecione uma origem e um destino para a rota.' );
    		return true;
    	}
    	
    	Ext.Ajax.setTimeout(120000);
    	
		Ext.Ajax.request({
	       url: 'calcRoute',
	       params: {
	           'source': source,
	           'target' : target,
	           'kpaths' : 1,
	           'directed' : true
	       },       
	       success: function(response, opts) {
	    	   var respText = Ext.decode(response.responseText);
	    	   var routeResultStore = Ext.data.StoreManager.lookup('store.RouteResult');
	    	   routeResultStore.loadData( respText );
	    	   me.getFeaturesFromRouteData( respText );
	       },
	       failure: function(response, opts) {
	    	   Ext.Msg.alert('Erro','Erro ao calcular a rota.' );
	       }
		});
    	
        
    	return true;
    },
    
    
    getFeaturesFromRouteData : function( routeData ) {
    	var geojsonObject = "{\"type\": \"FeatureCollection\",\"crs\": {\"type\": \"name\",\"properties\": {\"name\": \"EPSG:4326\"} },\"features\": ["; 
    	var prefix = "";
    	for(x=0; x < routeData.length; x++ ) {
    		var featureProperties = "{}";
    		geojsonObject = geojsonObject + prefix + "{\"type\": \"Feature\",\"properties\": "+featureProperties+
    			",\"geometry\":" +JSON.stringify( routeData[x].geometry ) + "}";
    		prefix = ",";
    	}
    	
    	geojsonObject = geojsonObject + "]}";
    	
    	/*
        var styleFunction = function(feature, resolution) {
            return MCLM.Functions.getFeatureStyle( feature.getGeometry().getType() );
        };    	
    	
        var vectorSource = new ol.source.Vector({
        	projection : 'EPSG:4326',
            features: ( new ol.format.GeoJSON() ).readFeatures( featuresText )
        });    	
        
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            //style: styleFunction
        });   
        */
    	
        // --------------------------------------------------

    	
    	var geojsonObject = {
    		    'type': 'FeatureCollection',
    		    'crs': {
    		        'type': 'name',
    		        'properties': {
    		            'name': 'EPSG:4326'
    		        }
    		    },
    		    'features': [
    		        {
    		            'type': 'Feature',
    		            'geometry': {
    		                'type': 'Point',
    		                'coordinates': [-43.1772348,-22.9345027]
    		            }
    		        }
    		    ]
    	};    	
    	
    	var features = new ol.format.GeoJSON().readFeatures(geojsonObject, {
    	    featureProjection: 'EPSG:4326'
    	});    	
    	
    	var featureStyle = new ol.style.Style({
    		stroke: new ol.style.Stroke({
    			color: 'green',
    			width: 50
    		})
    	});
    	var vectorSource = new ol.source.Vector({
    		  features: features
    	});    	

		var vectorLayer = new ol.layer.Vector({
		      source: vectorSource,
		});    	

		console.log( vectorLayer );		
		
    	/*
	   	var formatJSON = new ol.format.GeoJSON();
		formatJSON.readFeatures( geojsonObject );
	   	
		var vectorSource = new ol.source.Vector({
			format: formatJSON,
		});			
		
		*/
		
		/*
		vectorLayer.set('alias', 'route');
		vectorLayer.set('name', 'route');
		vectorLayer.set('serialId', 'route');
		vectorLayer.set('ready', false);
		vectorLayer.set('baseLayer', false);	        
        */
        // --------------------------------------------------
        
        
        MCLM.Map.map.addLayer( vectorLayer );
        
    }

    
});