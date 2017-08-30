Ext.define('MCLM.view.apolo.orgmil.WindowMaker', {

	// http://apolo.defesa.mil.br//SIGLMD-web/api/v1/organizacoes/militares/58040160808180912245?user-hash=34CE32F4CACDD770D6BB0977E066F74724B170F3CCF7002BAA802170711F99DF&token=1fa2c309-ef6b-4155-a672-ebde4905364b

	// -----------------------------------------------------------------------------------------
	createTab : function( theTitle, theContent ) {
		
		var theTab = {
				title: theTitle,
			    bodyPadding: '0',
				items:[{
			        xtype: 'panel',
			        padding: '5',
			        layout:'fit',
			        html : theContent	
				}]
		};  		
		
		return theTab;
	},

	getInfoTab : function( data ) {
		var table = "<table style='width:100%' class='dataWindow'>";

		var table = table + "<tr class='dataWindowLine'><td class='dataWindowLeft' colspan='6'>Dados Gerais</td></tr>";

		var table = table + "<tr class='dataWindowLine'><td class='dataWindowLeft'>&nbsp;</td><td class='dataWindowLeft'>&nbsp;</td><td class='dataWindowLeft'>&nbsp;</td><td class='dataWindowLeft'>&nbsp;</td><td class='dataWindowLeft'>&nbsp;</td><td class='dataWindowLeft'>&nbsp;</td></tr>";
		
		var table = table + "<tr class='dataWindowLine'><td colspan='6'>Endereço</td></tr>";
		
		return table;
	},
	
	
	// -----------------------------------------------------------------------------------------
	makeWindow : function( data ) {
		console.log( data );
		
		var orgMilWindow = Ext.getCmp('orgMilWindow');
		if( !orgMilWindow ) {
			orgMilWindow = Ext.create('MCLM.view.apolo.orgmil.OrgMilWindow');
		}
		
		var content = 'Bla';
		
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Informações', this.getInfoTab(data) ) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Contato', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Telefone', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Fun. Log.', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Cap. Log.', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Instalações', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Produtos', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Serviços', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Acordos Adm.', content) );
		
		
		orgMilWindow.show();
			
			
			/*
			var x = Math.floor( Object.keys(data).length / 2 ) + 1;
			var y = 0;
			var table2 = "<table style='width:100%' class='dataWindow'>";
			
		    for ( var key in data ) {
		    	
		        if ( data.hasOwnProperty( key ) ) {
		        	var value = data[key];
		        	if ( !value ) { 
		        		value = "";
		        	}
		        	
		        	if ( value === Object(value) ) {
		        		x--;
		        		var title = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
		        		var theTab = this.getTableFromObject( value, title );
		        		Ext.getCmp('orgMilTabContainer').add( theTab );
		        	} else {	
		        	
			        	if ( y < x ) {
				        	table1 = table1 + "<tr class='dataWindowLine'><td class='dataWindowLeft'>" + key + 
								"</td><td class='dataWindowMiddle'>" + value + "</td></tr>";
			        	} else {
				        	table2 = table2 + "<tr class='dataWindowLine'><td class='dataWindowLeft'>" + key + 
							"</td><td class='dataWindowMiddle'>" + value + "</td></tr>";
			        	}
			        	y++;
		        	
		        	}
		        	
		        } 
		    }		
		    
		    table1 = table1 + "</table>";
		    table2 = table2 + "</table>";
			var theContent = "<div style='float:left;width: 50%;'>"+table1+"</div><div style='float:left;width: 50%;'>" +table2+"</div>";  
			
			
			
			Ext.getCmp('tab1').update(theContent);
			*/
	},
	// -----------------------------------------------------------------------------------------
	

});
