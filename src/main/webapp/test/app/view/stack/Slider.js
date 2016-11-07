Ext.define('MCLM.view.stack.Slider', {
	extend: 'Ext.slider.Single',
	xtype:'view.slider',
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