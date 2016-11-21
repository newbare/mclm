Ext.define('MCLM.view.addfolder.NewFolderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.newFolder',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addfolder.NewFolderForm' 
            '#newFolderFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addfolder.NewFolderForm' 
            '#closeNewFolderWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var uploadTifWindow = Ext.getCmp('newFolderWindow');
    	uploadTifWindow.close();
    },
    
    submitForm : function( ) {
    	var me = this;
    	
    	// Se criar pasta na aba trabalho...
		var trabalhoAddFolder = Ext.getCmp('trabalhoAddFolder');
		var trabalhoAddFolderValue = trabalhoAddFolder.getValue( );      	
    	if ( trabalhoAddFolderValue == 'true' ) {
    		var trabalhoTree = Ext.getCmp('trabalhoTree');
    		var newFolderName = Ext.getCmp('newFolderName');
    		var newFolderNameValue = newFolderName.getValue();
    		
    		var selectedTreeNode = trabalhoTree.getSelectionModel().getSelection()[0];
    		
            var n = selectedTreeNode.appendChild({
                text:newFolderNameValue,
                leaf: false,
                checked: false
            });     		
    		
            me.closeWindow();
    		return true;
    	}

    	
    	// Daqui para baixo esta criando pasta na aba Catalogo
		var uploadTifForm = Ext.getCmp('newFolderForm');
		var form = uploadTifForm.getForm();        
        
        if( form.isValid() ){
            
        	form.submit({
                url: 'newFolder',
                success: function( form, action ) {
                	var layerTree = Ext.getCmp('layerTree');
        	  		var selectedTreeNode = layerTree.getSelectionModel().getSelection()[0];
			  		var layerTreeStore = Ext.getStore('store.layerTree');
			  		layerTreeStore.load( { node: selectedTreeNode } );
			  		
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