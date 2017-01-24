Ext.define('MCLM.view.style.StyleEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.styleEditor',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.style.StyleEditorForm' 
            '#pointStyleEditorFormSubmit' : {
            	click: this.pointSubmitForm 
            },
            '#lineStyleEditorFormSubmit' : {
            	click: this.lineSubmitForm 
            },
            '#polyStyleEditorFormSubmit' : {
            	click: this.polySubmitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.style.StyleEditorForm' 
            '#closePointStyleEditorWindow' : {
            	click: this.closeWindow 
            },
            '#closeLineStyleEditorWindow' : {
            	click: this.closeWindow 
            },
            '#closePolyStyleEditorWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var styleEditorWindow = Ext.getCmp('styleEditorWindow');
    	styleEditorWindow.close();
    },
    
    polySubmitForm : function( ) {
    	
    },
    pointSubmitForm : function( ) {
    	
    },
    lineSubmitForm : function( ) {
    	var me = this;
    	
		var styleEditorForm = Ext.getCmp('styleEditorForm');
		var form = styleEditorForm.getForm();        
        
        if( form.isValid() ){
            
        	form.submit({
                url: 'newFeatureStyle',
                success: function( form, action ) {
                	/*
                	var layerTree = Ext.getCmp('layerTree');
        	  		var selectedTreeNode = layerTree.getSelectionModel().getSelection()[0];
			  		var layerTreeStore = Ext.getStore('store.layerTree');
			  		layerTreeStore.load( { node: selectedTreeNode } );
			  		*/
			  		me.closeWindow();
                	Ext.Msg.alert('Sucesso', action.result.msg);
                },
              	failure: function(form, action) {
              		me.closeWindow();
              		Ext.Msg.alert('Falha', action.result.msg);
                       
              	} 
            });
        	
        }
    }
    
    
    
});