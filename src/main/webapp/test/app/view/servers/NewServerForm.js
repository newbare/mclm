Ext.define('MCLM.view.servers.NewServerForm', {
	extend: 'Ext.form.Panel',
	xtype : 'newServerForm',
	id : 'newServerForm',
	bodyPadding: 5,
    defaultType: 'textfield',
    url: '../newExternalSource',
    items: [{
            fieldLabel: 'Nome',
            width: 350,
            msgTarget: 'under',
            id:'newServerName',
            name: 'name',
            allowBlank : false,
            invalidText: '',
        },
	    {
            fieldLabel: 'Endereço',
            width: 350,
            msgTarget: 'under',
            name: 'url',
            allowBlank : false,
            invalidText: '',
	    },
	    {
            fieldLabel: 'Versão',
            width: 350,
            msgTarget: 'under',
            name: 'version',
            value:'1.1.1',
            allowBlank : false,
            invalidText: '',
    }],
    buttons: [{
    	text: 'Fechar',
    	handler: 'closeWindow'
      },{
    	text: 'Gravar',
    	handler: 'commitForm'
    }],


});		

	