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
var myComponentImg1 = null; 

var storeDos = Ext.create('Ext.data.Store', {
    requires: ['Ext.data.proxy.Memory'],
    fields: [{name: 'layerAlias'},{name: 'description'} ], 
    proxy: { type: 'memory' }
});

function addToLayerStack( data ) {
	layerStack.push( data );
	storeDos.loadData( layerStack );
	mountImagePreview();
}

// remove uma camada da lista de camadas. eh chamada quando o usuario desmarca um no da arvore
function removeFromLayerStack( layerAlias ) {
	layerStack = layerStack.filter(function(el) {
	    return el.layerAlias !== layerAlias;
	});	
	storeDos.loadData( layerStack );
	mountImagePreview();
}

// Atualiza as imagens das camadas na lista 
function mountImagePreview() {
	myComponentImg1.body.update("");
	var content = "";
	var zindex = 0;
	storeDos.each( function( record ){
		var layerName = record.get('layerName');
		var serviceUrl = record.get('serviceUrl');
		var thumImg = getLayerImagePreview (layerName, serviceUrl);
		Ext.get( layerName ).dom.src = thumImg;
		content = content + "<img style='z-index:"+zindex+";position: absolute;height:150px' src='"+thumImg+"' />";
	});          		
	myComponentImg1.body.update(content);
}

function showLayerStack() {
	if ( layerStackWindow ) return;

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
	    region: 'center',
        frame: false,

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
                        '<div style="float: left; width: 100%; padding:0px;">',
	                        '<div style="float: left;width:100px"><div style="padding: 0px;"><img style="border:1px solid black;width:100px;height:50px" id="{layerName}" src=""></div></div>',
	                        '<div style="float: left;margin-left:5px">',
	                            '<div style=" padding: 0px;"><b>{layerAlias}</b></div>',
	                            '<div style=" padding: 2px 5px 2px 5px;">{description}</div>',
	                        '</div>',    
                        '</div>',
                 '</tpl>'
                ]
        }],

        listeners: {
            drop: function (node, data, dropRec, dropPosition) {
            	var indx = 0;
            	storeDos.each( function( rec ){
            		var layerName = rec.get('layerName');
            	    setNewIndex( layerName , indx );
            	    indx++;
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
	
    
	myComponentImg1 = Ext.create('Ext.panel.Panel',{
		height : 150,
		html: "<img style='height:150px' src='img/defesa.jpg' />"
	});	

	var layerControl = Ext.create('Ext.panel.Panel',{
		region : 'east',
		width : 250,
		border:false,
		frame: true,
		items : [ myComponentImg1, slider ]
	});
	
	
	Ext.create('Ext.Window',{
		title : "Camadas Ativas",
		width : 700,
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
	            text: 'Teste 02',
	            //handler : function...
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
		
		items : [ gridPanel,layerControl ]
	}).show();
	
	layerStackWindow = true;
};	