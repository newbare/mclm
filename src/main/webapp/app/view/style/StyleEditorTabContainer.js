Ext.define('MCLM.view.style.StyleEditorTabContainer', {
	extend: 'Ext.tab.Panel',
	xtype : 'view.styleEditorTC',
	id : 'styleEditorTC',

	plain: true,
    requires: [
       'MCLM.view.style.PointStyleEditorForm',
       'MCLM.view.style.PolyStyleEditorForm',
       'MCLM.view.style.LineStyleEditorForm',
	],	
	
	flex : 1,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},	

    items: [{
        	title: 'Pontos',
    		xtype: 'view.pointStyleEditorForm'
    	}, {
    		title: 'Linhas',
    		xtype: 'view.lineStyleEditorForm'
        }, {
        	title: 'Polígonos',
    		xtype: 'view.polyStyleEditorForm'
    }],

	
});
