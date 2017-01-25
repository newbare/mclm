Ext.define('MCLM.view.style.PointStyleEditorForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.pointStyleEditorForm',
	id : 'pointStyleEditorForm',
    frame: false,
    flex : 1,
    fileUpload: true,
    bodyPadding: '10',
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'under',
        labelWidth: 90
    },
  
    items: [{
	    xtype: 'fieldcontainer',
	    layout: 'hbox',
	    margin: '10 0 0 0',
	    items: [{
	        xtype: 'textfield',
	        fieldLabel: 'Caminho do Ícone',
	    	allowBlank : false,
	        name : 'iconSrc',
	        id : 'iconSrc',
	        labelWidth: 90,
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
	    },{
	        xtype: 'component',
	        autoEl: 'div',
	        width: 40,
	        height: 40,
	        id : 'iconSrcContainer',
	        style: 'margin-left:5px;margin-bottom:10px'
	    }]
    },{
    	xtype: 'textfield',
    	fieldLabel: 'Ancoragem',
    	width: 100,
    	name: 'iconAnchor',
    	allowBlank : false,
    },{
    	xtype: 'textfield',
    	fieldLabel: 'Escala',
    	width: 50,
    	name: 'iconScale',
    	allowBlank : false,
    },{
    	xtype: 'textfield',
    	fieldLabel: 'Opacidade',
    	width: 50,
    	name: 'iconOpacity',
    	allowBlank : false,
    },{
    	xtype: 'textfield',
    	fieldLabel: 'Ancora X',
    	width: 50,
    	name: 'iconAnchorXUnits',
    	allowBlank : false,
    },{
    	xtype: 'textfield',
    	fieldLabel: 'Ancora Y',
    	width: 50,
    	name: 'iconAnchorYUnits',
    	allowBlank : false,
    },{
    	xtype: 'textfield',
    	fieldLabel: 'Rotação',
    	width: 50,
    	name: 'iconRotation',
    	allowBlank : false,
    },{
    	xtype: 'fieldcontainer',
	    layout: 'hbox',
	    margin: '10 0 0 0',
	    items: [{
	        xtype: 'textfield',
	        fieldLabel: 'Cor do Ícone',
	    	allowBlank : false,
	        name : 'iconColor',
	        id : 'iconColor',
	        value : '#CACACA',
	        labelWidth: 90
	    },{
	        xtype: 'component',
	        autoEl: 'div',
	        width: 32,
	        height: 32,
	        id : 'iconColorContainer',
	        style: 'margin-left:10px;'
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

        	this.body.on('click', function(e) {
        		console.log( e.target.id );
        		//$('#colorpickerHolder').ColorPickerHide();
        	});
        	
        	
        	
			var container = this.body.dom.id;
			var iconColor = Ext.getCmp("iconColor");
			var initialColor = iconColor.getValue();

        	var comp = Ext.getCmp("iconColorContainer");
        	var el = comp.getEl();
        	var iconColorContainerId = el.id;
			$("#"+iconColorContainerId).html('<div id="colorSelector">'+
					'<div style="background-color:'+initialColor+'"></div></div>');
        	
			$("#" + container).append('<div id="colorpickerHolder"></div>');
			        	
			$('#colorpickerHolder').ColorPicker({
				color : initialColor,
				flat: true,
				onSubmit: function(hsb, hex, rgb) {
					$('#colorSelector div').css('backgroundColor', '#' + hex);
					iconColor.setValue(hex);
					
				},
				onShow: function (colpkr) {
					$(colpkr).fadeIn(500);
					return false;
				},
				onHide: function (colpkr) {
					$(colpkr).fadeOut(500);
					return false;
				},				
			});
			
			
			var widt = false;
			$('#colorSelector').bind('click', function() {
				$('#colorpickerHolder').stop().animate({height: widt ? 0 : 173}, 500);
				widt = !widt;
			});
        	
        }
    }      
    
    
});
