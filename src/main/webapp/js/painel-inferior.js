

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
    html : 'This is not the panel you are looking for. Move Along.'
});