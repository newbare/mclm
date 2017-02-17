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
            },{
            	xtype : "button",
            	cls: 'airport-button',
            	id: 'airport-button',
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

            },{
            	xtype : "button",
            	cls: 'ponte-button',
            	id: 'ponte-button',
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

            },{
            	xtype : "button",
            	cls: 'clinic-button',
            	id: 'clinic-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'blood-button',
            	id: 'blood-button',
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

            },{
            	xtype : "button",
            	cls: 'school-button',
            	id: 'school-button',
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

            },{
            	xtype : "button",
            	cls: 'gasolina-button',
            	id: 'gasolina-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'prison-button',
            	id: 'prison-button',
            	enableToggle: true,
            },{
            	xtype : "button",
            	cls: 'levelcrossing-button',
            	id: 'levelcrossing-button',
            	enableToggle: true,
            }]
        }],	        
    }],
    
	listeners: {
		
		close : function() {
			Ext.tip.QuickTipManager.unregister('estadio-button');
			Ext.tip.QuickTipManager.unregister('toll-button');
			Ext.tip.QuickTipManager.unregister('hospital-button');
			Ext.tip.QuickTipManager.unregister('clinic-button');
			Ext.tip.QuickTipManager.unregister('blood-button');
			Ext.tip.QuickTipManager.unregister('obras-button');
			Ext.tip.QuickTipManager.unregister('rodoviaria-button');
			Ext.tip.QuickTipManager.unregister('police-button');
			Ext.tip.QuickTipManager.unregister('prf-button');
			Ext.tip.QuickTipManager.unregister('helipad-button');
			Ext.tip.QuickTipManager.unregister('ponte-button');
			Ext.tip.QuickTipManager.unregister('gasolina-button');
			Ext.tip.QuickTipManager.unregister('prison-button');
			Ext.tip.QuickTipManager.unregister('airport-button');
			Ext.tip.QuickTipManager.unregister('levelcrossing-button');
			Ext.tip.QuickTipManager.unregister('school-button');
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
		        text: 'Localiza postos da PRF no trajeto da rota selecionada. No momento está vindo o mesmo que "Delegacias".',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'school-button',
		        title: 'Escolas',
		        text: 'Localiza escolas próximos à rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'airport-button',
		        title: 'Aeroportos',
		        text: 'Localiza aeroportos e aeródromos próximos à rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'prison-button',
		        title: 'Presídios',
		        text: 'Localiza presídios próximos à rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'obras-button',
		        title: 'Viadutos',
		        text: 'Localiza viadutos na rota selecionada, seja no trajeto ou cruzando a rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'police-button',
		        title: 'Delegacias de Polícia',
		        text: 'Localiza delegacias de polícia no trajeto da rota selecionada. No momento inclui postos da PRF.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'estadio-button',
		        title: 'Estádios',
		        text: 'Localiza estádios no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'rodoviaria-button',
		        title: 'Rodoviária',
		        text: 'Localiza rodoviárias no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'helipad-button',
		        title: 'Pouso de Helicópteros',
		        text: 'Localiza pontos de pouso de helicóptero no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'toll-button',
		        title: 'Pedágio',
		        text: 'Localiza postos de pedágio no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'hospital-button',
		        title: 'Hospital',
		        text: 'Localiza hospitais no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'clinic-button',
		        title: 'Clínica',
		        text: 'Localiza clínicas no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'blood-button',
		        title: 'Doação/Banco de Sangue',
		        text: 'Localiza pontos de doação ou banco de sangue no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'ponte-button',
		        title: 'Pontes',
		        text: 'Localiza pontes na rota selecionada, seja no trajeto ou cruzando a rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'gasolina-button',
		        title: 'Postos de Abastecimento',
		        text: 'Localiza postos de abastecimento (gasolina, diesel, etanol, gás, etc) no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'levelcrossing-button',
		        title: 'Passagem de Nível',
		        text: 'Localiza locais de cruzamento com linha férrea na rota.',
		        width: 190,
		        dismissDelay: 5000 
		    });
		    
		}
    
	}	
});
    