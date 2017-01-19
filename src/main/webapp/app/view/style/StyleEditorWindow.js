Ext.define('MCLM.view.style.StyleEditorWindow', {
	extend: 'Ext.Window',
	xtype : 'view.styleEditorWindow',
	id : 'styleEditorWindow',

    requires: [
        'MCLM.view.style.StyleEditorForm',
	],
	
    //controller : 'dataLayer',	
	
	width : 500,
	height: 380,
    scrollable: false,
    frame : false,
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.styleEditorForm'
	}],
	
	
});
