Ext.define('MCLM.view.draw.DrawToolBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drawToolBar',

    // Eh necessario uma camada para ter onde desenhar!
    addDrawableLayer : function() {
    	var addDrawableLayer = Ext.getCmp("addDrawableLayer");
    	if ( !addDrawableLayer ) { 
    		addDrawableLayer = Ext.create('MCLM.view.draw.AddDrawableLayerDialog');
    	}
    	addDrawableLayer.show();	    	
    }, 
    
    // Desenha uma linha na camada
    drawLine : function() {
    	var drawToolBar = Ext.getCmp("drawToolBar");
    	if ( !drawToolBar ) { 
    		drawToolBar = Ext.create('MCLM.view.draw.DrawToolBarWindow');
    	}
    	drawToolBar.show();	
    },
    
    // Fecha a janela de adicionar nova camada desenhavel
    closeAddDrawableLayer : function() {
    	Ext.getCmp("addDrawableLayer").close();
    },
    
    // Cria (pergunta) uma nova camada desenhavel
    submitAddDrawableLayer : function() {
    	var feicaoNome = Ext.getCmp("feicaoNome").getValue();
    	var feicaoDescricao = Ext.getCmp("feicaoDescricao").getValue();
    	var idEstilo = Ext.getCmp("idFeicaoStyle").getValue();
    	var feicaoDestinoId = Ext.getCmp("feicaoDestino").getValue();
    	var feicaoDestino = Ext.getCmp("feicaoDestino").getRawValue();
    	
    	this.closeAddDrawableLayer();
    	var me = this;
    	
    	if( !feicaoNome || !feicaoDescricao  ) {
			Ext.Msg.alert('Operação Inválida', 'É necessário fornecer um nome e uma descrição para a camada de desenho.' );
			return true;
    	}
    	
    	if ( MCLM.DrawHelper.dirty ) {
    		
    		Ext.Msg.confirm('Atenção', 'Existe uma camada sendo utilizada e que não foi salva. Deseja apagar seu conteúdo?', function(e) {
    			if( e == 'no' ) {
    				return true;
    			} else {
    	    		me.addNewDrawableLayer(feicaoNome, feicaoDescricao, idEstilo, feicaoDestinoId, feicaoDestino);
    	    	}
    		});    		
    		
    	} else {
    		me.addNewDrawableLayer(feicaoNome, feicaoDescricao, idEstilo, feicaoDestinoId, feicaoDestino);
    	}
    	
    },

    // Efetivamente cria uma nova camada desenhavel
    addNewDrawableLayer : function(feicaoNome, feicaoDescricao, idEstilo, feicaoDestinoId, feicaoDestino) {
    	Ext.getCmp('drawLineBtn').enable();
    	Ext.getCmp('drawBoxBtn').enable();
    	Ext.getCmp('drawPolygonBtn').enable();
    	Ext.getCmp('drawPointBtn').enable();
    	Ext.getCmp('drawSquareBtn').enable();
    	Ext.getCmp('drawCircleBtn').enable();
    	Ext.getCmp('saveDrawableBtn').enable();
    	
    	MCLM.DrawHelper.init(feicaoNome, feicaoDescricao, idEstilo, feicaoDestinoId,feicaoDestino);
    	
    	var styleCombo = Ext.getCmp("idFeicaoStyle");
    	var estiloNome = styleCombo.getRawValue();
    	
    	var record = styleCombo.getStore().findRecord('idFeatureStyle', idEstilo);
    	
    	MCLM.DrawHelper.updateStyle( record.data );
    	
		Ext.getCmp("drawToolBar").update( "<b>Nome: </b>" + feicaoNome + 
				"<br><b>Destino: </b>" + feicaoDestino + 
				"<br><b>Estilo: </b>" + estiloNome + "<br><b>Descrição: </b>"+feicaoDescricao  );
    },
    
    // Desenha uma linha
    drawLine : function() {
    	MCLM.DrawHelper.setDrawType('LineString');
    },
    
    drawBox : function() {
    	MCLM.DrawHelper.setDrawType('Box');
    },

    drawPolygon : function() {
    	MCLM.DrawHelper.setDrawType('Polygon');
    },

    drawPoint : function() {
    	MCLM.DrawHelper.setDrawType('Point');
    },
    
    drawSquare : function() {
    	MCLM.DrawHelper.setDrawType('Square');
    },
    
    drawCircle : function() {
    	MCLM.DrawHelper.setDrawType('Circle');
    },
    
    saveDrawableLayer : function() {
    	var me = this;
    	var data = MCLM.DrawHelper.asJson;
    	
    	if ( !data ) {
    		Ext.Msg.alert('Erro','Não existem dados a serem salvos. Desenhe ao menos um objeto nesta Feição.' );
    		return true;
    	}
    	
    	var obj = JSON.parse( data );
    	
    	var anWindow = Ext.getCmp("anWindow");
    	if ( !anWindow ) { 
    		anWindow = Ext.create('MCLM.view.apolo.feicoes.AreasNotaveisWindow');
    	}
    	anWindow.show();	  
    	
    	console.log( obj );
    	
    	Ext.getCmp("anData").setValue( data );
    	Ext.getCmp("mappolycolor").setValue( obj.properties.feicaoEstilo.polygonFillColor );
    	
    	switch ( obj.properties.feicaoDestinoId ) {
    	  case 'AN.A':
    		  anWindow.setTitle( "Áreas Agrícolas" );
    		  Ext.getCmp("cat_code").setValue( "AGR" );
    	    break;
    	  case 'AN.E':
    		  anWindow.setTitle( "Áreas de Endemias" );
    		  Ext.getCmp("cat_code").setValue( "END" );
    	    break;
    	  case 'AN.I':
    		  anWindow.setTitle( "Áreas de Interesse" );
    		  Ext.getCmp("cat_code").setValue( "INT" );
      	    break;
    	  case 'AN.IB':
    		  anWindow.setTitle( "Áreas de Insumos Biocombustíveis" );
    		  Ext.getCmp("cat_code").setValue( "BIO" );
    		  break;
    	  case 'AN.PP':
    		  anWindow.setTitle( "Áreas de Produção Pecuária" );
    		  Ext.getCmp("cat_code").setValue( "PEC" );
    		  break;
    	  case 'OC':
    		  //
    		  break;
    	  case 'CE':
    		  //
    		  break;
    	  case 'NE':
    		  //
    		  break;
    	  default:
    	      //
    	      break;
    	}    	
    	
    	// Passar para o controller de 'MCLM.view.apolo.feicoes.AreasNotaveisWindow'
    	/*
		Ext.Ajax.request({
		       url: 'newFeicao',
		       params: {
		           'data': data,
		       },       
		       success: function(response, opts) {
		    	   Ext.Msg.alert('Sucesso','Feição gravada com sucesso.' );
		    	   Ext.getCmp("drawToolBar").close();
		       },
		       failure: function(response, opts) {
		    	   Ext.Msg.alert('Erro','Erro ao gravar Feição.' );
		       }
		});
    	*/
    	
    }
    
});