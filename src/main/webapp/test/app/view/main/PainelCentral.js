Ext.define('MCLM.view.main.PainelCentral', {
	extend: 'Ext.Panel',
	xtype: 'painelCentral',
	collapsible: false,
	region: 'center',
	margin: '0 0 0 0',
	layout:'fit',
	id: 'painelCentral',
	listeners:{
    	resize: function () {
            //map.updateSize();
        },
        afterrender:function(){
        	//
		}
	}, 
   
	html : 'Central'
});

