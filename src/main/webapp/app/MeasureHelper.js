Ext.define('MCLM.MeasureHelper', {
	
	statics: {
		source : null,
		vector : null,
		
		init : function() {
			var me = MCLM.MeasureHelper;
			
			me.source = new ol.source.Vector();
			me.vector = new ol.layer.Vector({
				source: me.source,
				style: new ol.style.Style({
					fill: new ol.style.Fill({
						color: 'rgba(255, 255, 255, 0.2)'
					}),
					stroke: new ol.style.Stroke({
						color: '#ffcc33',
						width: 2
					}),
					image: new ol.style.Circle({
						radius: 7,
						fill: new ol.style.Fill({
							color: '#ffcc33'
						})
					})
				})
			});			
			
			
			
			
			
		}
		
		
		
	}

});