Ext.define('MCLM.view.cenarios.SaveCenarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.savecenario',

    onCloseWindow : function() {
    	var saveCenarioWindow = Ext.getCmp('saveCenarioWindow');
    	saveCenarioWindow.close();
    },
    
    onSubmitForm : function( button ) {
		var form = button.up('form').getForm();

		
    	// Passar tudo para o SUBMIT
		Ext.getCmp('mapCenterConfigField').setValue( MCLM.Map.getMapCenter() );
		Ext.getCmp('mapZoomConfigField').setValue( MCLM.Map.getMapZoom() );
		Ext.getCmp('mapaBaseID').setValue( MCLM.Map.getBaseMapName() );
		Ext.getCmp('servidorBaseID').setValue( MCLM.Map.getBaseServerURL() );
		Ext.getCmp('mapaBaseAtivoID').setValue( MCLM.Map.isBaseMapActive() );

		//var tree = Ext.getCmp('trabalhoTree');
		
		var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
		 
		/*
		var qtd = trabalhoTreeStore.getRange().length;
		var data = [];
		for ( x=0; x < qtd; x++ ) {
			data.push( trabalhoTreeStore.getRange()[x].data );
		}
		*/
		console.log( Ext.encode(Ext.pluck(trabalhoTreeStore.data.items, 'data') ) );		
		//MCLM.Map.getLayersDetails();		
		
		return true;
		
		
		
        if ( form.isValid() ) {
      	  form.submit({
              success: function(form, action) {
                 Ext.Msg.alert('Sucesso', action.result.msg, me.onCloseMessage);
              },
              failure: function(form, action) {
                 Ext.Msg.alert('Failed', action.result.msg, me.onCloseMessage);
              }                		  
      	  });
        } else { 
            Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
        }    	
    	
    	
    	
    }
    
});