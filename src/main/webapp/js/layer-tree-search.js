var searchBar = {
        labelWidth: 130,
        xtype: 'triggerfield',
        fieldLabel: '',
        triggerCls: 'x-form-clear-trigger',
        onTriggerClick: function() {
        	layerTree.reset();
        },
        listeners: {
            change: function() {
            	//
            }
        }
}