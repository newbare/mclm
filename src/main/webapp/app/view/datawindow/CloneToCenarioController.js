Ext.define('MCLM.view.datawindow.CloneToCenarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cloneToCenario',

    onCloseWindow : function() {
    	var saveCenarioWindow = Ext.getCmp('saveCenarioWindow');
    	saveCenarioWindow.close();
    },
    
    doClone : function( ) {
    	var styleCombo = Ext.getCmp("idFeicaoStyle").getValue();
    	var cloneToCenarioWindow = Ext.getCmp('cloneToCenarioWindow');
    	var feicao = Ext.encode( cloneToCenarioWindow.feicao );
    	var obj = cloneToCenarioWindow.feicao;
    	
		Ext.Ajax.request({
		       url: 'newFeicao',
		       params: {
		           'data': feicao,
		           'idFeatureStyle' : styleCombo
		       },       
		       success: function(response, opts) {
		    	   console.log( response.responseText );
		    	   var respObj = Ext.decode( response.responseText );
		    	   
		    	   if( respObj.success ) {
		    		   
		    		   
		    		   // A feicao foi gravada no banco. Cria um no para ela na arvore do cenario
		    		   var layerAlias = respObj.layerAlias;
		    		   var serialId = "FE" + MCLM.Functions.guid().substring(1, 8);
		    		   var trabalhoTree = Ext.getCmp('trabalhoTree');
		    		   
		    		   
		    		   var root = trabalhoTree.getRootNode();
		    		   var feiRootNode = null;
		    		   root.cascadeBy( function(n) { 
				    		var layertype = n.get('layertype');
				    		if ( layertype == 'CRN' ) feiRootNode = n;
		    		   });
		    		   
		    		   if ( !feiRootNode ) {
		    			   alert("Pasta de Feições não encontrada!");
		    		   }
		    		   
		    		   var idLayer = respObj.idLayer;
		    		   var newFeicao = respObj.feicao;
		    		   
		    		   var newId = 0;
		    		   root.cascadeBy( function(n) { 
				    		var temp = n.get('id');
				    		if ( temp > newId ) newId = temp;
		    		   });
		    		   newId++;
		    		   
		    		   newNode =  feiRootNode.appendChild({
		    			   'id' : newId,
		    			   'text' : obj.features[0].properties.feicaoNome,
		    			   'layerAlias' : layerAlias,
		    			   'layerName' : obj.features[0].properties.feicaoNome,
		    			   'layerType' : 'FEI',
		    			   'description' : obj.features[0].properties.feicaoDescricao,
		    			   'readOnly' : false,
		    			   'checked' : false,
		    			   'selected' : false,
		    			   'institute' : obj.features[0].properties.feicaoTipo,
		    			   'indexOrder' : 0,
		    			   'iconCls' : 'fei-icon',
		    			   'leaf' : true,
		    			   'idNodeParent' : 0,
		    			   'serialId' : serialId,
		    			   'idNodeData' : idLayer,
		    			   'feicao' : newFeicao
		    		   });			    		   
		    		   
		    		   // Torna a aba de cenario ativa, caso nao esteja
		    		   var painelEsquerdo = Ext.getCmp("painelesquerdo");
		    		   var tabTrabalho = Ext.getCmp("abaTrabalho"); 
		    		   painelEsquerdo.setActiveTab(tabTrabalho);
		    		   
		    		   Ext.Msg.alert('Sucesso','Elemento gravada com sucesso.');
		    		   
		    		   
		    		   
		    	   } else {
		    		   Ext.Msg.alert('Erro','Erro ao gravar Elemento: ' + respObj.msg );
		    	   }
		    	   
		       },
		       failure: function(response, opts) {
		    	   var respObj = Ext.decode( response.responseText );
		    	   Ext.Msg.alert('Erro','Erro ao gravar Elemento: ' + respObj.msg );
		       }		       
		});    	
		
    },
    
});