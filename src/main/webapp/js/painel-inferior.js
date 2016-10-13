
/*
var dummyGrid = Ext.create('Ext.grid.Panel', {
	border:false,
    frame: false,
    flex:1,
    columns: []
});
*/


var painelInferior =  Ext.create('Ext.Panel', {
	title: 'Footer',
    region: 'south',
    height: 100,
    minHeight: 75,
    maxHeight: 150,
    collapsed: true,
    animCollapse: false,            	            
    html : 'lalalal'
});