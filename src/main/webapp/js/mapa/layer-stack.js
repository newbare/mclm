/*
 * 
 * Controla os aspectos visuais das camadas ativas no mapa
 * As funcoes de controle de camadas estao concentradas no arquivo wms.js
 * 
 * O Store storeDos recebe os dados dos nos ativos (selecionados) da arvore
 * e carrega no painel de selecao.
 * 
 * O arquivo layer-tree-tree.js contem as chamadas a addToLayerStack e a 
 * removeFromLayerStack quando se marca e desmarca um no na arvore.
 *  
 */

var layerStack = [];
var layerStackWindow = false;
var gridPanel = null;
var layerMiniImage = null; 

var storeDos = Ext.create('Ext.data.Store', {
    requires: ['Ext.data.proxy.Memory'],
    fields: [{name: 'layerAlias'},{name: 'description'} ], 
    proxy: { type: 'memory' }
});

// Adiciona uma nova camada na lista.
// Eh invocado pelo metodo "toggleNode()" no arquivo "layer-tree-tree.js"
// quando o usuario marca um no da arvore.
function addToLayerStack( data ) {
	// adiciona a nova camada no array de camadas ativas
	layerStack.push( data );
	// Atualiza o store da grid com o array de camadas ativas.
	// Isso faz com que a lista de camadas seja criada automaticamente pelo 
	// ExtJS. Nesse ponto a grid "gridPanel" já está com as camadas carregadas
	// mas as mini imagens de preview não apareceram ainda ( O HTML no atributo "tpl" da "gridPanel").
	// Temos o ícone "loading" sendo mostrado...
	storeDos.loadData( layerStack );
	// Agora vamos atualizar as imagens de preview das camadas.
	// Quem controla a exibicao do icone "loading" de cada imagem sao os eventos 
	// "tileloadstart", "tileloadend" definidos no arquivo "wms.js". O icone de erro 
	// eh controlado pelo evento "tileloaderror".
	mountImagePreview();
}

// remove uma camada da lista de camadas. eh chamada pelo metodo "toggleNode()" no arquivo "layer-tree-tree.js"
// quando o usuario desmarca um no da arvore
function removeFromLayerStack( layerAlias ) {
	layerStack = layerStack.filter(function(el) {
	    return el.layerAlias !== layerAlias;
	});	
	storeDos.loadData( layerStack );
	mountImagePreview();
}

// Atualiza as imagens das camadas na lista e no painel maior na lateral direita.
// O painel lateral é formado pela sobreposição de PNG transparente das mesmas imagens 
// pequenas da lista de camadas.
function mountImagePreview() {
	
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
}


// Verifica cada imagem de preview se ela ja foi completamente carregada e entao
// permite que ela seja exibida. Sem isso ficaria um icone de "imagem quebrada" no lugar da
// imagem ate que ele fosse carregada. Todas as imagens classe "minithumb" sao criadas
// escondidas ( display:none ) porque seu "src" eh definido a posteriori.
function checkPreviewImages() {
	$('.minithumb').each(function(){
		var me = $( this );
	    var img = new Image();
	    img.onload = function() {
	        me.css("display","block");
	    }
	    img.src = $(this).attr('src');
	});	
}

function showLayerStack() {
	if ( layerStackWindow ) return;

	layerMiniImage = Ext.create('Ext.panel.Panel',{
		height : 150,
		html: ""
	});		

	// Slider para ajustar a opacidade da camada
    var slider = Ext.create('Ext.slider.Single', {
        width: 240,
        hideLabel: false,
        useTips: true,

        increment: 1,
        minValue: 0,
        maxValue: 10,
        value:0,
        
        listeners : {
            change: function(slider, thumb, newValue, oldValue){
            	//
            },
            dragend: function(slider, thumb, value){
            	var opacity = slider.getValue(0) / 10;
            	setSelectedLayerOpacity( opacity );
            }
        }        
    });
	
	// Painel com os nomes das camadas que permite ajustar a ordem de exibicao
	gridPanel = Ext.create('Ext.grid.Panel',{
	    store : storeDos,
	    border:false,
	    
        frame: false,
        flex:1,
        viewConfig: {
        	stripeRows: false,
            plugins: {
                ptype: 'gridviewdragdrop',
                dragText: 'Arraste para reordenar'
            }
        },
	    
        columns: [{
        	cellWrap: true,
            flex: 1,
            sortable: false,
            hideable: false,
            xtype: 'templatecolumn',
            tpl: [
                '<tpl for=".">',
                        '<div data-qtip="Arraste para alterar <br> a ordem das camadas." style="position:relative;float: left; width: 100%; padding:0px;">',
	                        '<div style="margin-right:5px;border:1px solid black;float:left;width:102px;height:52px">', 
	                        '<img class="minithumb" style="display:none;width:100px;height:50px" id="{serialId}" src=""></div>',
	                        '<div style="float: left;margin-left:5px;width:75%">',
	                            '<div style=" padding: 0px;"><b>{layerAlias}</b></div>',
	                            '<div style=" padding: 2px 5px 2px 5px;">{description}</div>',
	                        '</div>',    
                        '</div>',
                        '<div id="error_{serialId}" style="display:none;position:absolute;top:2px;left:2px"><img style="width:24px;height:24px;" src="img/alert.png"></div>',
                        '<div class="alert-icon" id="alert_{serialId}" style="display:none;position:absolute;top:2px;left:2px"><img style="width:24px;height:24px;" src="img/loading.gif"></div>',
                 '</tpl>'
                ]
        }],

        listeners: {
            drop: function (node, data, dropRec, dropPosition) {
            	var totalLayerCount = storeDos.getCount();
            	var indx = totalLayerCount;
            	storeDos.each( function( rec ){
            		var layerName = rec.get('layerName');
            		var newIndex = ( totalLayerCount - indx ) + 1;
            	    setNewIndex( layerName , newIndex );
            	    indx--;
            	});            	
            	mountImagePreview();
            },
            rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
            	var layerName = record.get('layerName');
            	selectLayer( layerName );
        		var opacity = getSelectedLayerOpacity();
        		var newOpacity = opacity * 10;
        		slider.setValue( 0, newOpacity );
            }
        }            
        
	});
	
	var layerControl = Ext.create('Ext.panel.Panel',{
		region : 'east',
		width : 250,
		border:false,
		frame: true,
		items : [ layerMiniImage, slider ]
	});
	
	var baseLayerDetailPanel = Ext.create('Ext.panel.Panel',{
		height : 60,
		border: false,
		bodyPadding: 5,
		html: '<div data-qtip="A Camada de Base não pode <br> ter sua ordem modificada." style="position:relative;float: left; width: 100%; padding:0px;">' +
        '<div style="margin-right:5px;border:1px solid black;float:left;width:102px;height:52px">' +
        	'<img class="minithumb" style="display:none;width:100px;height:50px" id="mclm_landlayer_cmoa" src="img/loading2.gif">' +
        '</div>' +
        '<div style="float: left;margin-left:5px;width:75%">'+
            '<div style="padding: 0px;"><b>Camada de Base</b></div>'+
            '<div id="mclm_landlayer_cmoa_layer" style="padding: 2px 5px 2px 5px;">A camada de base do mapa.</div>'+
        '</div></div>'+
        '<div id="error_mclm_landlayer_cmoa" style="display:none;position:absolute;top:2px;left:2px"><img style="width:24px;height:24px;" src="img/alert.png"></div>'+
        '<div class="alert-icon" id="alert_mclm_landlayer_cmoa" style="display:none;position:absolute;top:2px;left:2px"><img style="width:24px;height:24px;" src="img/loading.gif"></div>',
	});	
	
	var layersDetailPanel = Ext.create('Ext.panel.Panel',{
		region: 'center',
		requires: [
               'Ext.layout.container.VBox'
        ],
	    xtype: 'layout-vertical-box',
	    layout: {
	       type: 'vbox',
	       pack: 'start',
	       align: 'stretch'
	    },        
	    items : [ baseLayerDetailPanel, gridPanel ]
	});
           
	
	Ext.create('Ext.Window',{
		title : "Camadas Ativas",
		width : 750,
		height: 400,
		layout : 'border',
		constrain: true,
		renderTo: Ext.getBody(),
		
	    dockedItems: [{
	        xtype: 'toolbar',
	        items: [{
	            text: 'Atualizar',
	            handler : mountImagePreview
	        }, {
	            text: 'MERGE',
	            handler : imageMerge
	        }]
	    }],	

        listeners: {
            destroy: function (wnd, eOpts) {
            	layerStackWindow = false;
            },
            close: function (wnd, eOpts) {
            	layerStackWindow = false;
            },
            hide: function (wnd, eOpts) {
            	layerStackWindow = false;
            }
        },	    
		
		items : [ layersDetailPanel,layerControl ]
	}).show();
	
	
	// Exibe os dados da camada base
	var baseLayerNameElement = Ext.get( 'mclm_landlayer_cmoa_layer' );
	if( baseLayerNameElement ) {
		baseLayerNameElement.update( baseLayer + "<br>" + geoserverUrl );
	}	
	
	layerStackWindow = true;
	mountImagePreview();	
	
	
};	