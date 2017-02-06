Ext.define('MCLM.view.apolo.feicoes.AreasNotaveisForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.areasNotaveisForm',
	id : 'areasNotaveisForm',
	
    frame: false,
    
    flex : 1,
    bodyPadding: '0',
   
    layout: {
        type: 'hbox',
        align: 'stretch'
    },      
  
    items: [{
    	xtype: 'container',
		layout: 'vbox',    
		padding: '5',

		items: [{
			xtype: 'hidden',
	    	fieldLabel: 'Json Data',
	    	name: 'anData',
	    	id: 'anData',
	    	allowBlank : false,
	    },{
			xtype: 'hidden',
	    	fieldLabel: 'Código da Categoria', //INT - Interesse, END - Endemias ou Condições Sanitárias adversas, AGR - Agrícola, PEC - Produção Pecuária, BIO - Insumos de Biocombustíveis.
	    	name: 'cat_code',
	    	id: 'cat_code',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Código da Área Notável',
	    	name: 'codigo',
	    	id: 'codigo',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Nome',
	    	name: 'nome',
	    	id: 'nome',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'orgid_controladora',
	    	name: 'orgid_controladora',
	    	id: 'orgid_controladora',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Contato',
	    	name: 'inf_contato',
	    	id: 'inf_contato',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Informações Adicionais',
	    	name: 'inf_adicionais',
	    	id: 'inf_adicionais',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Link WEB',
	    	name: 'link_web',
	    	id: 'link_web',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'simb_poligono_id',
	    	name: 'simb_poligono_id',
	    	id: 'simb_poligono_id',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'mappolycolor',
	    	name: 'mappolycolor',
	    	id: 'mappolycolor',
	    	allowBlank : false,
	    }]
	},{
    	xtype: 'container',
		layout: 'vbox',    
		padding: '5',

		items: [{
			xtype: 'textfield',
	    	fieldLabel: 'Json Data 2',
	    	name: 'anData2',
	    	id: 'anData2',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Json Data 3',
	    	name: 'anData3',
	    	id: 'anData3',
	    	allowBlank : false,
	    }]

	}]
});
