Ext.define('MCLM.view.style.StyleEditorWindow', {
	extend: 'Ext.Window',
	xtype : 'view.styleEditorWindow',
	id : 'styleEditorWindow',
	title:'Editor de Estilos',
    requires: [
        'MCLM.view.style.StyleEditorTabContainer',
        'MCLM.view.style.StyleEditorController',
	],
	
    controller : 'styleEditor',	
	
	width : 600,
	height: 450,

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
		xtype: 'textfield',
    	fieldLabel: 'Nome do Estilo',
    	width: 100,
    	name: 'layerStyleName',
    	id: 'layerStyleName',
    	height:22,
    	margin: '5 130 20 10',
    	allowBlank : false,
    },{
		xtype: 'view.styleEditorTC'
	}],
	

        
});
