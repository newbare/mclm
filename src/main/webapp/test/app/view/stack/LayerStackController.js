Ext.define('MCLM.view.stack.LayerStackController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stack',
    listen : {
        controller : {
            '*' : {
            	removeFromLayerStack : 'removeFromLayerStack',
            	addToLayerStack : 'addToLayerStack',
            	mountImagePreview : 'mountImagePreview'
            }
        }
    },    
    
    mountImagePreview : function( button ) {
    	alert("aaa");
    },
    
    showLegend : function( button ) {
    	alert("bbb");
    },
    
    addToLayerStack : function( data ) {
    	var layerStackStore = Ext.data.StoreManager.lookup('store.layerStack');
    	var layerStack = layerStackStore.getRange();
    	
    	layerStack.push( data );
		
		layerStackStore.loadData( layerStack );    	
		this.mountImagePreview();
    },
    
    removeFromLayerStack : function( layerAlias ) {
    	var layerStackStore = Ext.data.StoreManager.lookup('store.layerStack');
    	var layerStack = layerStackStore.getRange();
    	
    	layerStack = layerStack.filter(function(el) {
    	    return el.layerAlias !== layerAlias;
    	});	
		
		layerStackStore.loadData( layerStack );  
    	
    	this.mountImagePreview();
    },
    
    mountImagePreview : function() {
    	alert("LayerStackController: moutImagePreview");
    	/*
    	
	
	// Se a tela nao esta visivel, nao atualiza nada.
	if ( !layerStackWindow ) return;
	
	// apaga todas as imagens do painel maior lateral direito.
	layerMiniImage.body.update("");
	var content = "";
	var zindex = 0;
	
	// Atualiza a imagem da camada base. "getLayerImagePreview()" estah em "wms.js"
	var baseLayerUrlPreview = getLayerImagePreview( baseLayer, geoserverUrl);
	var imgElement = Ext.get( 'mclm_landlayer_cmoa' );
	if( imgElement ) {
		// Imagem pequena da lista de camadas
		imgElement.dom.src = baseLayerUrlPreview;
		// Imagem do painel grande
		content = content + "<img class='minithumb mergeable' id='big_mclm_landlayer_cmoa' style='display:none;z-index:"+ zindex +";position: absolute;width:238px;height:150px' src='"+baseLayerUrlPreview+"' />";
		zindex++;
		
	}	
	
	// Atualiza as imagens de preview das camadas na lista de camadas
	// "getLayerImagePreview()" estah em "wms.js" e fornece a URL da imagem
	// de uma camada do geoserver dado o seu nome e a URL do servidor.
	storeDos.each( function( record ){
		var layerName = record.get('layerName');
		var serviceUrl = record.get('serviceUrl');
		var serialId = record.get('serialId');
		var thumImg = getLayerImagePreview ( layerName, serviceUrl );
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
	checkPreviewImages();
    	
    	*/
    },
    
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