Ext.define('MCLM.view.stack.LayerStackController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stack',
    listen : {
        controller : {
            '*' : { mountImagePreview : 'mountImagePreview' }
        }
    },    
    
    init : function(app) {
        this.control({
        	// Intercepta o metodo 'dragend' do slider 
            '#stackSlider' : {
            	dragend: this.sliderDragEnd 
            },
            // Intercepta metodos da grid (lista de camadas)
            '#stackGridPanel' : {
            	drop : this.gridDrop,
            	rowclick : this.gridRowClick
            }
        	
        });
    },
    
    // --------------------------------------------------------------------------------------------------------
    // Metodos interceptados de controles da view 
    sliderDragEnd : function( slider, thumb, value ) {
    	var opacity = slider.getValue(0) / 10;
    	this.setSelectedLayerOpacity( opacity );
    },
    
    gridDrop: function (node, data, dropRec, dropPosition) {
    	var layerStackStore = Ext.getStore('store.layerStack');
    	var totalLayerCount = layerStackStore.getCount();
    	var indx = totalLayerCount;
    	layerStackStore.each( function( rec ){
    		var layerName = rec.get('layerName');
    		var newIndex = ( totalLayerCount - indx ) + 1;
    	    MCLM.Map.setNewIndex( layerName , newIndex );
    	    indx--;
    	});            	
    	this.mountImagePreview();
    },    
    
    gridRowClick: function(grid, record, tr, rowIndex, e, eOpts) {
    	var layerName = record.get('layerName');
    	MCLM.Map.selectLayer( layerName );
		var opacity = MCLM.Map.getSelectedLayerOpacity();
		var newOpacity = opacity * 10;
		var stackSlider = Ext.getCmp('stackSlider');
		stackSlider.setValue( 0, newOpacity );
    },    
    // Fim dos metodos interceptados
    // --------------------------------------------------------------------------------------------------------
    
    setSelectedLayerOpacity : function( value ) {
    	MCLM.Map.setSelectedLayerOpacity( value );
    },
    // --------------------------------------------------------------------------------------------------------
    showLegend : function( button ) {
    	var stackGridPanel = Ext.getCmp('stackGridPanel');
    	
		if (stackGridPanel.getSelectionModel().hasSelection()) {
		   var row = stackGridPanel.getSelectionModel().getSelection()[0];
		   var layerName = row.get('layerName');
		   var serviceUrl = row.get('serviceUrl' );
		   var serialId = row.get('serialId' );
		   this.showLegendScreen( layerName, serviceUrl, serialId );
		} else {
			Ext.Msg.alert('Camada não selecionada','Selecione uma camada da lista antes de solicitar a legenda.' );
		}	    
    	
    },
    // --------------------------------------------------------------------------------------------------------
    showLegendScreen : function( layerName, serviceUrl, serialId ) {
    	var legendImageUrl = MCLM.Map.getLayerLegendImage( layerName, serviceUrl );
    	
    	var legendWindow = Ext.getCmp('legendWindow');
    	if ( legendWindow ) return;
    	legendWindow = Ext.create('MCLM.view.legend.LegendWindow',{title:"Legenda da Camada " + layerName});
    	legendWindow.show();

    	$("#legend_image").attr('src', legendImageUrl );
    	
    	$("#legend_image").one("load", function() {
    		$("#legend_image").css("display","block");
    		$("#legend_loading").css("display","none");
    	}).each(function() {
    		if(this.complete) $(this).load();
    	});    	
    	    	
    },
    // --------------------------------------------------------------------------------------------------------
    mountImagePreview : function() {
    	var baseLayerUrlPreview = MCLM.Map.getLayerImagePreview( MCLM.Globals.config.baseLayer, MCLM.Globals.config.geoserverUrl );

    	var layerMiniImage = Ext.getCmp('layerMiniImage');
    	layerMiniImage.body.update( "" );
    	
    	var content = "";
    	var zindex = 0;
    	
    	var imgElement = Ext.get( 'mclm_landlayer_cmoa' );
    	if( imgElement ) {
    		// Imagem pequena da lista de camadas
    		imgElement.dom.src = baseLayerUrlPreview;
    		// Imagem do painel grande
    		content = content + "<img class='minithumb mergeable' id='big_mclm_landlayer_cmoa' style='display:none;z-index:"+ zindex +";position: absolute;width:238px;height:150px' src='"+baseLayerUrlPreview+"' />";
    		zindex++;
    	}
    	
    	var layerStackStore = Ext.getStore('store.layerStack');
    	
    	layerStackStore.each( function( record ){
			var layerName = record.get('layerName');
			var serviceUrl = record.get('serviceUrl');
			var serialId = record.get('serialId');
			var thumImg = MCLM.Map.getLayerImagePreview ( layerName, serviceUrl );
			var imgElement = Ext.get( serialId );
			
			if( imgElement ) {
				// Imagem pequena da lista de camadas 
				imgElement.dom.src = thumImg;
				// Imagem do painel grande
				content = content + "<img class='minithumb mergeable' id='big_"+serialId+"' style='display:none;z-index:"+ zindex +";position: absolute;width:238px;height:150px' src='"+thumImg+"' />";
			}
			zindex++;
		});
		
    	
    	layerMiniImage.body.update( content );
    	this.checkPreviewImages();    	
    	
    },
    // --------------------------------------------------------------------------------------------------------
    checkPreviewImages : function() {
    	$('.minithumb').each(function(){
    		var me = $( this );
    	    var img = new Image();
    	    img.onload = function() {
    	        me.css("display","block");
    	    }
    	    img.src = $(this).attr('src');
    	});	
    }    
    
});