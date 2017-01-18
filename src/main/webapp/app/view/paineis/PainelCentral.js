Ext.define('MCLM.view.paineis.PainelCentral', {
	extend: 'Ext.Panel',
	xtype: 'painelCentral',
	collapsible: false,
	region: 'center',
	margin: '0 0 0 0',
	layout:'fit',
	id: 'painelCentral',
	
	requires: [
	  'MCLM.Map'
	],
	
	listeners:{
    	resize: function () {
    		MCLM.Map.map.updateSize();
        },
        
        afterrender:function(){
			var container = this.body.dom.id;
			MCLM.Map.loadMap( container ); 
			
			$("#" + container).append('<div id="mainLoadingIcon" style="position:absolute;top:10px;left:60px;">' +
			    	'<img style="width:30px;height:30px;" src="img/hourglass.svg"></div>');
			
		}
	} 
   
	
});

