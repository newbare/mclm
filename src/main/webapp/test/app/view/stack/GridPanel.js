Ext.define('MCLM.view.stack.GridPanel', {
	extend: 'Ext.grid.Panel',
	xtype: 'view.gridPanel',

    store : 'store.layerStack',
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
                    '<div class="alert-icon" id="alert_{serialId}" style="position:absolute;top:2px;left:2px"><img style="width:24px;height:24px;" src="img/loading.gif"></div>',
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
