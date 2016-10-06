
function showTemperatureMap() {
	
	new Ext.Window({
		title : "Temperatura",
		width : 600,
		height: 400,
		renderTo: Ext.getBody(),
		layout : 'fit',
		autoEl : {
		   tag : "iframe",
		   src : "https://embed.windytv.com/?-13.808,-53.013,609,temp,marker"
		}
	}).show();

}
	
/*
<iframe 
	src="https://embed.windytv.com/?-13.808,-53.013,609,temp,marker" 
	width="600" height="400" frameborder="0">
</iframe>
*/