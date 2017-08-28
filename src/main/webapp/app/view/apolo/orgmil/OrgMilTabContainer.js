Ext.define('MCLM.view.apolo.orgmil.OrgMilTabContainer', {
	extend: 'Ext.tab.Panel',
	xtype : 'orgMilTabContainer',
	id : 'orgMilTabContainer',

	layoutOnTabChange: true, 
	deferredRender: false,
	plain: true,

	region: 'center',
	defaults:{ autoScroll:true },
	
	items: [{
		title:'Geral',
	    bodyPadding: '0',
		items:[{
	        xtype: 'panel',
	        padding: '5',
	        id : 'tab1',
	        layout:'fit',
	    }]    
	}],

    listeners: {
    	
        'afterrender' : function ( cmp ) {
        	//
        }

    }    	
});
