Ext.define('MCLM.view.tools.ColorPickerWindow', {
	
	extend: 'Ext.Window',
	
	id:'colorPickerWindow',    	
	xtype: 'colorPickerWindow',
	title : "Seletor de Cor",
	width : 368,
	height: 210,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),
	
	color : null,

    items: [{
        xtype: 'component',
        autoEl: 'div',
        id : 'colorpickerWHolder',
    }],

    init : function( initialColor, component ) {
    	var me = this;
    	
		$('#colorpickerWHolder').ColorPicker({
			color : initialColor,
			flat: true,
			onChange: function (hsb, hex, rgb) {
				me.color = "#" + hex.toUpperCase();
				component.setValue( me.color );
			}
		});
    	
    },
    
    
    listeners: {
    	
    	
    	close : function() {
    		//
    	},
	    
	    afterrender : function ( cmp ) {    
	    	//
	    }
    }


});