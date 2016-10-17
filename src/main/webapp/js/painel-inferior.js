

var painelInferior = Ext.create('Ext.Panel', {
	title: 'Painel Vazio',
    region: 'south',
    height: 250,
    minHeight: 75,
    maxHeight: 250,
    collapsed: true,
    animCollapse: false,   
    scrollable: true,
    scroll: 'both',    
    html : '<canvas id="myCanvas" width="200" height="100"></canvas>'
});