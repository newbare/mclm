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
	alert( bbox );
	layerStack.push( data );
	storeDos.loadData( layerStack );
}

function removeFromLayerStack( layerAlias ) {
	layerStack = layerStack.filter(function(el) {
	    return el.layerAlias !== layerAlias;
	});	
	storeDos.loadData( layerStack );
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
                        '<div style="float: left; width: 90%; padding:0px;">',
                            '<div style=" padding: 0px;"><b>{layerAlias}</b></div>',
                            '<div style=" padding: 5px 5px 2px 5px;">{description}</div>',
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
            	
            },
            rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        		var layerName = record.get('layerName');
        		var serviceUrl = record.get('serviceUrl');
        		var	bbox = getMapCurrentBbox();
        		var thumImg = serviceUrl + "?service=WMS&srs=EPSG:4326&width=100&height=50&version=1.1.1&request=GetMap&layers="+layerName+"&format=image/png&bbox="+bbox;
        		
        		myComponentImg1.body.update("<img style='height:150px' src='"+thumImg+"' />");
        		
        		selectLayer( layerName );
        		var opacity = getSelectedLayerOpacity();
        		var newOpacity = opacity * 10;
        		slider.setValue( 0, newOpacity );
            }
        }            
        
	});
	
    
	myComponentImg1 = Ext.create('Ext.panel.Panel',{
		height : 150,
		html: "<img style='height:150px' src='img/buoy.svg' alt='get File' />"
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
	            text: 'Teste 01',
	            //handler : function...
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