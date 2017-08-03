Ext.define('MCLM.view.tools.RestToolsWindow', {
	
	extend: 'Ext.Window',
	
	id:'restToolsWindow',    	
	xtype: 'restToolsWindow',
	title : "Serviços Externos / Camadas Externas",
	width : 330,
	height: 70,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

    requires: [
       'MCLM.view.tools.RestToolsController',
       'MCLM.view.tools.RestTools',
    ],	
    
    controller : 'restToolsController',
	
    items: [{
        xtype: 'restTools',
    }],

    listeners: {

    	close : function() {
		 	Ext.tip.QuickTipManager.unregister('maritmTrID');    	
		 	Ext.tip.QuickTipManager.unregister('aeroplaneID');    	
		 	Ext.tip.QuickTipManager.unregister('photoID');    	
		 	Ext.tip.QuickTipManager.unregister('seaMapID');    
		 	Ext.tip.QuickTipManager.unregister('marineTrafficID'); 
		 	
		 	Ext.tip.QuickTipManager.unregister('toggleTopoID');
		 	Ext.tip.QuickTipManager.unregister('toggleOceanID');
		 	Ext.tip.QuickTipManager.unregister('toggleHillshadeID');
		 	Ext.tip.QuickTipManager.unregister('toggleImageryID');
		 	
		 	
		 	MCLM.Map.shipsHelper.deleteShips();
		 	MCLM.Map.aircraftHelper.deleteAircrafts();
		 	MCLM.Map.aeroTrafficEnabled = false;
		 	MCLM.Map.shipTrafficEnabled = false;
		 	MCLM.Map.streetPhotoEnabled = false;
		 	
		 	//MCLM.Map.topoEnabled = false;
		 	//MCLM.Map.oceanEnabled = false;
		 	//MCLM.Map.hillshadeEnabled = false;
		 	//MCLM.Map.imageryEnabled = false;		 	
		 	
		 	
		 	
		 	MCLM.view.photo.PhotoHelper.clearPhotos();
		 	MCLM.Map.unbindMapClick();
		 	MCLM.Map.removeLayer( 'mclm_openseamap_cmoa' );
    	},
	    
	    afterrender : function ( cmp ) {
	    	
	    	
	    	Ext.getCmp('toggleTopoID').toggle( MCLM.Map.topoEnabled );
	    	Ext.getCmp('toggleOceanID').toggle( MCLM.Map.oceanEnabled );
	    	Ext.getCmp('toggleHillshadeID').toggle( MCLM.Map.hillshadeEnabled );
	    	Ext.getCmp('toggleImageryID').toggle( MCLM.Map.imageryEnabled );
	    	
        	
    	    Ext.tip.QuickTipManager.register({
    	        target: 'maritmTrID',
    	        title: 'Tráfego Marítimo',
    	        text: 'Exibe dados de tráfego marítimo AIS via SISTRAM.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'aeroplaneID',
    	        title: 'Tráfego Aéreo',
    	        text: 'Exibe tráfego aéreo.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'seaMapID',
    	        title: 'Elementos de Navegação',
    	        text: 'Exibe elementos de carta náutica que auxiliam a navegação. Necessário nível de zoom apropriado.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	    	target: 'marineTrafficID',
    	    	title: 'Tráfego Marítimo',
    	    	text: 'Exibe mapa com o tráfego marítimo oriundo do site MarineTraffic.',
    	    	width: 150,
    	    	dismissDelay: 5000 
    	    },{
    	        target: 'photoID',
    	        title: 'Fotos de Rua',
    	        text: 'Permite consultar fotos criadas por usuários do Mapilary.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleTopoID',
    	        title: 'Topografia',
    	        text: 'Ativa/Desativa camada de topografia do ArcGIS.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleOceanID',
    	        title: 'Leito Marinho',
    	        text: 'Ativa/Desativa camada de relevo do leito marinho do ArcGIS.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleHillshadeID',
    	        title: 'Relevo',
    	        text: 'Ativa/Desativa camada de relevo do ArcGIS.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleImageryID',
    	        title: 'Imagens de Satélite',
    	        text: 'Ativa/Desativa camada de imagens de satélite do ArcGIS.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    });			
        	
        }
	
    },	
	
    
});