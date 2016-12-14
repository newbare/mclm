Ext.define('MCLM.view.rotas.CalcRotaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.calcRota',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addfolder.NewFolderForm' 
            '#calcRotaFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addfolder.NewFolderForm' 
            '#closeRotaWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var rotaWindow = Ext.getCmp('rotaWindow');
    	rotaWindow.close();
    },
    
    submitForm : function( ) {
    	var me = this;
            me.closeWindow();
    		return true;
    }

    
});