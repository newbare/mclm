function showConfig() {

	// Resposta deve ser: { "success": true, "msg": "User added successfully" }

	var configModel = Ext.create('Ext.data.Model', {
	    fields: ['firstName', 'lastName', 'birthDate'],
	    proxy: {
	        type: 'ajax',
	        api: {
	            read: 'loadConfig',
	            update: 'updateConfig'
	        },
	        reader: {
	            type: 'json',
	            root: 'users'
	        }
	    }
	});	
	
	var configPanel = Ext.create('Ext.form.Panel', {
	    bodyPadding: 10,
	    defaultType: 'textfield',
	    url: 'updateConfig',
	    reader: {
	        type : 'json',
	        model: configModel
	    },	    
	    
	    items: [
	        {
	            fieldLabel: 'First Name',
	            msgTarget: 'under',
	            name: 'firstName',
	            invalidText: 'Hora Incorreta',
	            regex: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i,
	            maskRe: /[\d\s:amp]/i,	            
	        },
	        {
	            fieldLabel: 'Last Name',
	            msgTarget: 'under',
	            name: 'lastName',
	            invalidText: ''
	        },
	        {
	            xtype: 'datefield',
	            fieldLabel: 'Date of Birth',
	            msgTarget: 'under',
	            name: 'birthDate',
	            invalidText: 'Data Incorreta'
	        }
	    ],
	    buttons: [{
              text: 'Gravar',
              handler: function() {
                  var form = this.up('form'), // get the form panel
                      record = form.getRecord(); // get the underlying model instance
                  if (form.isValid()) { // make sure the form contains valid data before submitting
                      form.updateRecord(record); // update the record with the form data
                      record.save({ // save the record to the server
                          success: function(user) {
                              Ext.Msg.alert('Success', 'User saved successfully.')
                          },
                          failure: function(user) {
                              Ext.Msg.alert('Failure', 'Failed to save user.')
                          }
                      });
                  } else { // display error alert if the data is invalid
                      Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
                  }
              }
	    }]
	
	});	
	
	
	Ext.create('Ext.Window',{
		title : "Configurações",
		width : 450,
		height: 400,
	    scrollable: false,
	    frame : false,
		layout : 'fit',
		constrain: true,
		bodyStyle:"background:#FFFFFF;",
		renderTo: Ext.getBody(),
		items : [ configPanel ]
	}).show();		
	
	
	configModel.load(1, { // load user with ID of "1"
	    success: function( user ) {
	        userForm.loadRecord(user); // when user is loaded successfully, load the data into the form
	    }
	});
	
}