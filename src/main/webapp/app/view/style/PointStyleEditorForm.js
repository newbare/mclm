Ext.define('MCLM.view.style.PointStyleEditorForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.pointStyleEditorForm',
	id : 'pointStyleEditorForm',
    frame: false,
    flex : 1,
    bodyPadding: '0',
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'under',
        labelWidth: 90
    },
    
    layout: {
        type: 'hbox',
        align: 'stretch'
    },    
  
    items: [{
        xtype: 'container',
        padding: '10, 30, 10, 10',
        layout: 'vbox',    
	    items: [{
	        xtype: 'textfield',
	        fieldLabel: 'Caminho do Ícone',
	        name : 'iconSrc',
	        id : 'iconSrc',
	        listeners: {
	        	change: function(element) {
	        		var imagePath = element.getValue();
	        		var svgImage = '<object style="width:39px;height:39px" type="image/svg+xml" data="'+imagePath+'" class="logo"></object>';
	        		var image = "<img style='width:39px;height:39px' src='" + imagePath + "'>"
	        		if ( imagePath.search(".svg") ) {
	        			$("#iconSrcContainer").html( svgImage );
	        		} else {
	        			$("#iconSrcContainer").html( image );
	        		}
	        	}
	        }	        
	    }, {
	        xtype: 'component',
	        autoEl: 'div',
	        width: 40,
	        height: 40,
	        id : 'iconSrcContainer',
	    }, {
	    	xtype: 'textfield',
	    	fieldLabel: 'Escala',
	    	name: 'iconScale',
	    	emptyText: '0.6',
	    },{
	    	xtype: 'textfield',
	    	fieldLabel: 'Opacidade',
	    	name: 'iconOpacity',
	    	emptyText: '1',
	    },{
	    	xtype: 'textfield',
	    	fieldLabel: 'Ancoragem',
	    	name: 'iconAnchor',
	    	emptyText: '[0.5, 46]',
	    },{
	    	xtype: 'textfield',
	    	fieldLabel: 'Ancora X',
	    	name: 'iconAnchorXUnits',
	    	emptyText: 'fraction ou pixels',
	    },{
	    	xtype: 'textfield',
	    	fieldLabel: 'Ancora Y',
	    	name: 'iconAnchorYUnits',
	    	emptyText: 'fraction ou pixels',
	    },{
	    	xtype: 'textfield',
	    	fieldLabel: 'Rotação',
	    	emptyText: '0',
	    	name: 'iconRotation',
	    }]
    }, {
        xtype: 'container',
        layout: 'vbox',    
        padding: '10, 10, 10, 0',
        items: [{
		        xtype: 'textfield',
		        fieldLabel: 'Cor',
		    	allowBlank : false,
		        name : 'iconColor',
		        id : 'iconColor',
		        value : '#CACACA',
		        labelWidth: 90,
		        emptyText: '#000000',
		        listeners: {
		        	change: function( element ) {
		        		$( '#colorpickerHolder' ).ColorPickerSetColor( element.getValue() );
		        	}
		        }	        
		    },{
		        xtype: 'component',
		        autoEl: 'div',
		        id : 'colorpickerHolder',
		    },{
		    	xtype : 'hidden',
		        name : 'idFeatureStyle',
		        id : 'idFeatureStyle',
		    }]
    }],

    buttons: [{
    	text: 'Fechar',
    	id: 'closePointStyleEditorWindow'
   	},{
        text: 'Enviar',
        id : 'pointStyleEditorFormSubmit'
    }],
    
    
    listeners: {

        'afterrender' : function ( cmp ) {
			var iconColor = Ext.getCmp("iconColor");
			var initialColor = iconColor.getValue();

			$('#colorpickerHolder').ColorPicker({
				color : initialColor,
				flat: true,
				onChange: function (hsb, hex, rgb) {
					iconColor.setValue( "#" + hex.toUpperCase() );
				}
			});
			        	
        }
    }      
    
    
});
