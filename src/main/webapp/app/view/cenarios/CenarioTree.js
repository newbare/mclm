Ext.define('MCLM.view.cenarios.CenarioTree', {
	extend: 'Ext.tree.Panel',
	xtype: 'view.cenarioTree',
	id: 'cenarioTree',
    
    store: 'store.layerTree',
   
    
    rootVisible: true,

    scrollable: true,
    scroll: 'both',

    region:'center',
    
    
    useArrows: true,
    border:false,
    frame : false,
  
    
});