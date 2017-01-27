Ext.define('MCLM.view.style.StyleEditorTabContainer', {
	extend: 'Ext.tab.Panel',
	xtype : 'view.styleEditorTC',
	id : 'styleEditorTC',

	layoutOnTabChange: true, 
	deferredRender: false,
	
	selectedColorField : 'polygonFillColor',
	
	plain: true,
	autoHeight:true,
	
	flex : 1,

	items: [{
		title:'Pontos',
	    layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },  		
	    bodyPadding: '0',
	    defaultType: 'textfield',
	    defaults: {
	        anchor: '100%',
	        msgTarget: 'under',
	        labelWidth: 90
	    },	    
	    
		items:[{
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
				xtype: 'combobox',
				reference: 'iconAnchorXUnits',
				publishes: 'iconAnchorXUnits',
				name: 'iconAnchorXUnits',
				fieldLabel: 'Ancora X',
				displayField: 'iconAnchorXUnits',	    	
				id: 'iconAnchorXUnits',
				store:['fraction','pixels'],	    	
		    },{
				xtype: 'combobox',
				reference: 'iconAnchorYUnits',
				publishes: 'iconAnchorYUnits',
				name: 'iconAnchorYUnits',
				fieldLabel: 'Ancora Y',
				displayField: 'iconAnchorYUnits',	    	
				id: 'iconAnchorYUnits',
				store:['fraction','pixels'],	    	
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
			        value: '#000000',
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
		}]    
	}, {
		title:'Linhas',
	    layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },  		
	    bodyPadding: '0',
	    defaultType: 'textfield',
	    defaults: {
	        anchor: '100%',
	        msgTarget: 'under',
	        labelWidth: 90
	    },	    

		items:[{
		     xtype: 'textfield',
		     fieldLabel: 'First Name',
		     name: 'lineFillColor',
		},{
		     xtype: 'textfield',
		     fieldLabel: 'First Name',
		     name: 'lineStrokeColor',
		},{
		     xtype: 'textfield',
		     fieldLabel: 'First Name',
		     name: 'lineStrokeWidth',
		},{
		     xtype: 'textfield',
		     fieldLabel: 'First Name',
		     name: 'lineLineDash',
		}]    
	}, {
		title:'Polígonos',
	    layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },  		
	    bodyPadding: '0',
	    defaultType: 'textfield',
	    defaults: {
	        anchor: '100%',
	        msgTarget: 'under',
	        labelWidth: 90
	    },	    

		items:[{
	        xtype: 'container',
	        padding: '10, 30, 10, 10',
	        layout: 'vbox',      
	        items: [{
		    	xtype: 'textfield',
		    	fieldLabel: 'Largura do Contorno',
		    	name: 'polygonStrokeWidth',
		    	id: 'polygonStrokeWidth',
		    	emptyText: '1',
		    	// change interceptado pelo controller 'MCLM.view.style.StyleEditorController'	    	
		    },{
		    	xtype: 'textfield',
		    	fieldLabel: 'Linha do Contorno',
		    	name: 'polygonLineDash',
		    	id: 'polygonLineDash',
		    	emptyText: '[1, 1]',
		    	// change interceptado pelo controller 'MCLM.view.style.StyleEditorController'	    	
		    },{
				xtype: 'combobox',
				reference: 'polygonStrokeLinecap',
				publishes: 'polygonStrokeLinecap',
				name: 'polygonStrokeLinecap',
				fieldLabel: 'Tipo de Contorno',
				displayField: 'polygonStrokeLinecap',	    	
				id: 'polygonStrokeLinecap',
				store:['butt','round','square'],
		    }/*,{
		        xtype: 'component',
		        autoEl: 'div',
		        width : 30,
		        height:30,
		        style : 'margin-left:3px',
		        html : '<canvas style="width:250px;height:50px;border:1px solid black" id="polyCanvas"></canvas>'
		    }*/]
	    }, {
	        xtype: 'container',
	        layout: 'vbox',    
	        padding: '10, 10, 10, 0',
		    items: [{
			    xtype: 'container',
			    layout: 'hbox',    
			    padding: '10, 10, 10, 0',
			    items: [{
			    	xtype: 'textfield',
			    	fieldLabel: 'Cor de Preenchimento',
			    	emptyText: '#000000',
			    	value: '#000000',
			    	name: 'polygonFillColor',
			    	id: 'polygonFillColor',
			        listeners: {
			        	change: function( element ) {
			        		$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
			        	},
					    focus: function( element ) {
					    	$( '#pfcId' ).css("display","block");
					    	$( '#pscId' ).css("display","none");
					    	Ext.getCmp("styleEditorTC").selectedColorField = 'polygonFillColor';
							$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
					    }
			        }
			    },{
			        xtype: 'component',
			        autoEl: 'div',
			        width : 30,
			        height:30,
			        style : 'margin-left:3px',
			        html : '<img id="pfcId" style="width:30px;height:30px" src="img/back-arrow.svg">'
			    }]
		    },{
			    xtype: 'container',
			    layout: 'hbox',    
			    padding: '10, 10, 10, 0',
			    items: [{
					xtype: 'textfield',
					fieldLabel: 'Cor do Contorno',
					name: 'polygonStrokeColor',
					id: 'polygonStrokeColor',
					emptyText: '#000000',
					value: '#000000',
					listeners: {
						change: function( element ) {
							$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
						},
					    focus: function( element ) {
							$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
							$( '#pfcId' ).css("display","none");
					    	$( '#pscId' ).css("display","block");
					    	Ext.getCmp("styleEditorTC").selectedColorField = 'polygonStrokeColor';
					    }
					}	
			    },{
			        xtype: 'component',
			        autoEl: 'div',
			        width : 30,
			        height:30,
			        style : 'margin-left:3px',
			        html : '<img id="pscId" style="display:none;width:30px;height:30px" src="img/back-arrow.svg">'
			    }]    	
		    }, {
		        xtype: 'component',
		        autoEl: 'div',
		        id : 'polyClrPickerHolder',
		    }]
		}]    
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
			
			// ======================================
			var polygonFillColor = Ext.getCmp("polygonFillColor");
			var initialColor = polygonFillColor.getValue();

			$('#polyClrPickerHolder').ColorPicker({
				color : initialColor,
				flat: true,
				onChange: function (hsb, hex, rgb) {
					var selColorField = Ext.getCmp("styleEditorTC").selectedColorField;
					
					var targetColorFieldId =  selColorField;
					var targetColorField = Ext.getCmp( targetColorFieldId );
					targetColorField.setValue( "#" + hex.toUpperCase() );
				}
			});
			
			
        }
    }    	
});
