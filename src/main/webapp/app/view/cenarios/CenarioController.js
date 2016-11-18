Ext.define('MCLM.view.cenarios.CenarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cenario',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addfolder.CenarioForm' 
            '#cenarioFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addfolder.CenarioForm' 
            '#closeCenarioWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var uploadTifWindow = Ext.getCmp('cenarioWindow');
    	uploadTifWindow.close();
    },
    
    submitForm : function( ) {
    	var me = this;
		var uploadTifForm = Ext.getCmp('cenarioForm');
		var form = uploadTifForm.getForm();        
        if( form.isValid() ){
	  		me.closeWindow();
        }
    }
    
    
    
});