Ext.define('MCLM.view.rotas.RoutePoi', {
    extend: 'Ext.panel.Panel',
    
    id: 'routePoi',
    xtype: 'routePoi',
    layout: 'accordion',

    frame : false,
    border : false,
    
    defaults: {
        bodyPadding: 2
    },
    
    height: 200,
    
    items: [{
        title: 'Órgãos Policiais',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'police-button',
            	id: 'police-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'prf-button',
            	id: 'prf-button',
            	enableToggle: true,
            	
            }]
        }],	        
    }, {
        title: 'Estações de Transporte',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'rodoviaria-button',
            	id: 'rodoviaria-button',
            	enableToggle: true,
            },{
            	xtype : "button",
            	cls: 'helipad-button',
            	id: 'helipad-button',
            	enableToggle: true,
            }]
        }],	        
    }, {
        title: 'Obras de Arte',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'obras-button',
            	id: 'obras-button',
            	enableToggle: true,

            }]
        }],	        
    }, {
        title: 'Saúde',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'hospital-button',
            	id: 'hospital-button',
            	enableToggle: true,

            }]
        }],	        
    }, {
        title: 'Estádios / Escolas',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'estadio-button',
            	id: 'estadio-button',
            	enableToggle: true,

            }]
        }],	        
    }, {
        title: 'Diversos',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'toll-button',
            	id: 'toll-button',
            	enableToggle: true,

            }]
        }],	        
    }],
    
	listeners: {
		
		close : function() {
			Ext.tip.QuickTipManager.unregister('estadio-button');
			Ext.tip.QuickTipManager.unregister('toll-button');
			Ext.tip.QuickTipManager.unregister('hospital-button');
			Ext.tip.QuickTipManager.unregister('obras-button');
			Ext.tip.QuickTipManager.unregister('rodoviaria-button');
			Ext.tip.QuickTipManager.unregister('police-button');
			Ext.tip.QuickTipManager.unregister('prf-button');
			Ext.tip.QuickTipManager.unregister('helipad-button');
		},
		
		afterrender: function(component, eOpts) {
			
			var buttons = this.query('button');
			Ext.Array.each(buttons, function(button) {
			    button.setDisabled(true);
			    button.on('click', MCLM.RouteHelper.locatePois  );
			});			
			
		    Ext.tip.QuickTipManager.register({
		        target: 'prf-button',
		        title: 'Polícia Rodoviária Federal',
		        text: 'Localiza postos da PRF no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'police-button',
		        title: 'Delegacias de Polícia',
		        text: 'Localiza Delegacias de Polícia no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'estadio-button',
		        title: 'Estádios',
		        text: 'Localiza Estádios no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'rodoviaria-button',
		        title: 'Rodoviária',
		        text: 'Localiza Rodoviárias no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'helipad-button',
		        title: 'Pouso de Helicópteros',
		        text: 'Localiza Pontos de Pouso de Helicóptero no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    });
		    
		}
    
	}	
});
    