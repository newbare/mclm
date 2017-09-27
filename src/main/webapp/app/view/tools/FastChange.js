Ext.define('MCLM.view.tools.FastChange', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	id:'fastChange',    	
	xtype: 'fastChange',

    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    items: [{
	    iconCls: 'one-icon',
        handler: 'loadOne',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'loadOneId',
        xtype: 'button',
        enableToggle: true,
    },{
	    iconCls: 'two-icon',
        handler: 'loadTwo',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'loadTwoId',
        xtype: 'button',
        enableToggle: true,
    },{
	    iconCls: 'three-icon',
        handler: 'loadThree',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'loadThreeId',
        xtype: 'button',
        enableToggle: true,
    },{
	    iconCls: 'four-icon',
        handler: 'loadFour',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'loadFourId',
        xtype: 'button',
        enableToggle: true,
    },{
	    iconCls: 'five-icon',
        handler: 'loadFive',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'loadFiveId',
        xtype: 'button',
        enableToggle: true,
    },{
	    iconCls: 'save-icon',
        handler: 'saveToCurrentSlot',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'saveToCurrentSlotId',
        xtype: 'button',
    }],

	
});