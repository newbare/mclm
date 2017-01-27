Ext.define('MCLM.view.style.StyleEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.styleEditor',

    init : function(app) {
        this.control({
            // Para saber o motivo de isto estar comentado vá em MCLM.Functions e procure "updateLineStylePreview" 
            /*
            '#polygonStrokeWidth' : {
            	change : this.updateLinePreview
            },
            '#polygonLineDash' : {
            	change : this.updateLinePreview
            },
            '#polygonStrokeLinecap' : {
            	change : this.updateLinePreview
            },
            */
            
  
            '#styleEditorFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.style.StyleEditorForm' 
            '#closeStyleEditorWindow' : {
            	click: this.closeWindow 
            },

            
        })
    },
    
    closeWindow : function() {
    	var styleEditorWindow = Ext.getCmp('styleEditorWindow');
    	styleEditorWindow.close();
    },
    
    // Para saber o motivo de isto estar comentado vá em MCLM.Functions e procure "updateLineStylePreview" 
    /*
    updateLinePreview : function() {
    	var width = Ext.getCmp("polygonStrokeWidth").getValue();
    	var dash = Ext.getCmp("polygonLineDash").getValue();
    	var stroke = Ext.getCmp("polygonStrokeLinecap").getValue();
    	var strokeColor = Ext.getCmp("polygonStrokeColor").getValue();
		var canvas = document.getElementById('polyCanvas');
		MCLM.Functions.updateLineStylePreview(canvas, width,stroke,dash,strokeColor);
    },
    */
    

    submitForm : function( ) {
    	var me = this;
    	
		var styleEditorForm = Ext.getCmp('styleEditorForm');
		var form = styleEditorForm.getForm();        
        
        if( form.isValid() ){
            
        	form.submit({
                url: 'newFeatureStyle',
                success: function( form, action ) {
			  		me.closeWindow();
                	Ext.Msg.alert('Sucesso', 'As alterações terão efeito quando você atualizar a página.');
                },
              	failure: function(form, action) {
              		me.closeWindow();
              		Ext.Msg.alert('Falha', action.result.msg);
                       
              	} 
            });
        	
        }
    }
    
    
    
});