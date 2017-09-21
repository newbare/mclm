Ext.define('MCLM.view.tools.EditFeicao', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	id:'editFeicao',    	
	xtype: 'editFeicao',

    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    items: [{
	    iconCls: 'save-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    handler: 'saveFeicao',
        id : 'saveFeicaoID',
        xtype: 'button',
    },{
	    iconCls: 'cancel-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    handler: 'cancelEditFeicao',
        id : 'cancelEditFeicaoID',
        xtype: 'button',
    }],

	
});