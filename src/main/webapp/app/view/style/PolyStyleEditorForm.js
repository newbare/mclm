Ext.define('MCLM.view.style.PolyStyleEditorForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.polyStyleEditorForm',
	id : 'polyStyleEditorForm',
	
    frame: false,
    
    selectedColorField : 'polygonFillColor',
    
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
	    	fieldLabel: 'Largura do Contorno',
	    	name: 'polygonStrokeWidth',
	    	emptyText: '1',
	    },{
	    	xtype: 'textfield',
	    	fieldLabel: 'Linha do Contorno',
	    	name: 'polygonLineDash',
	    	emptyText: '[1, 1]',
	    },{
	    	xtype: 'textfield',
	    	fieldLabel: 'Tipo de Contorno',
	    	name: 'polygonStrokeLinecap',
	    	emptyText: 'butt ou round ou square',
	    },{
	        xtype: 'component',
	        autoEl: 'div',
	        width : 30,
	        height:30,
	        style : 'margin-left:3px',
	        html : '<canvas style="width:250px;height:50px;border:1px solid black" id="polyCanvas"></canvas>'
	    }]
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
		    	name: 'polygonFillColor',
		    	id: 'polygonFillColor',
		        listeners: {
		        	change: function( element ) {
		        		$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
		        	},
				    focus: function( element ) {
				    	$( '#pfcId' ).css("display","block");
				    	$( '#pscId' ).css("display","none");
				    	Ext.getCmp("polyStyleEditorForm").selectedColorField = 'polygonFillColor';
						$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
						
						  MCLM.Functions.updateStylePreview(8,'round','1');
						  
						  /*
		        	      var canvas = document.getElementById('polyCanvas');
		        	      var context = canvas.getContext('2d');

		        	      context.beginPath();
		        	      context.moveTo(10,50);
		        	      context.lineWidth = 4;
		        	      context.lineTo(280, 50);
		        	      context.stroke();								
						  */
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
				listeners: {
					change: function( element ) {
						$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
					},
				    focus: function( element ) {
						$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
						$( '#pfcId' ).css("display","none");
				    	$( '#pscId' ).css("display","block");
				    	Ext.getCmp("polyStyleEditorForm").selectedColorField = 'polygonStrokeColor';
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
    }],

    
    buttons: [{
    	text: 'Fechar',
    	id: 'closePolyStyleEditorWindow'
   	},{
        text: 'Enviar',
        id : 'polyStyleEditorFormSubmit'
    }],
    
    listeners: {

        'afterrender' : function ( cmp ) {
			var polygonFillColor = Ext.getCmp("polygonFillColor");
			var initialColor = polygonFillColor.getValue();

			$('#polyClrPickerHolder').ColorPicker({
				color : initialColor,
				flat: true,
				onChange: function (hsb, hex, rgb) {
					var targetColorFieldId =  Ext.getCmp("polyStyleEditorForm").selectedColorField;
					var targetColorField = Ext.getCmp( targetColorFieldId );
					targetColorField.setValue( "#" + hex.toUpperCase() );
				}
			});
			        	
        }
    }       
    
});
