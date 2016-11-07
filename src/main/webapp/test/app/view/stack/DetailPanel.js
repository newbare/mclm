Ext.define('MCLM.view.stack.DetailPanel', {
	extend: 'Ext.Panel',
	xtype: 'view.detailPanel',
	region: 'center',
	requires: [
           'Ext.layout.container.VBox',
           'MCLM.view.stack.BaseLayerDetailPanel',
           'MCLM.view.stack.GridPanel',
    ],
    xtype: 'layout-vertical-box',
    layout: {
       type: 'vbox',
       pack: 'start',
       align: 'stretch'
    },
    
	items: [{
		xtype: 'baseLayerDetailPanel'
	},{
		xtype: 'gridPanel'
	}]    
    
});