Ext.define('MCLM.view.paineis.PainelInferior', {
	extend: 'Ext.Panel',
	xtype: 'painelInferior',
	id: 'painelInferior',
    region: 'south',
    floatable: false,
    margin: '0 0 0 0',
    height: 30,
    collapsed: false,
    html : '<div id="mainLoadingIcon" style="display:none;float:right;margin-right:10px;margin-top:2px;">' +
    	'<img style="width:24px;height:23px;" src="img/loading.gif"></div>' + 
    	'<div id="mainLoadingInfo" style="float:left">adadasdasdasd</div>'
});
