Ext.define('MCLM.view.style.StyleEditorWindow', {
	extend: 'Ext.Window',
	xtype : 'view.styleEditorWindow',
	id : 'styleEditorWindow',

    requires: [
        'MCLM.view.style.StyleEditorTabContainer',
        'MCLM.view.style.StyleEditorController',
	],
	
    controller : 'styleEditor',	
	
	width : 500,
	height: 380,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	
    scrollable: false,
    frame : false,
   
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.styleEditorTC'
	}],
	
	
});
