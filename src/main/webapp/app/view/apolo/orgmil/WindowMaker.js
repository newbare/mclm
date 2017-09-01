Ext.define('MCLM.view.apolo.orgmil.WindowMaker', {

	// http://apolo.defesa.mil.br//SIGLMD-web/api/v1/organizacoes/militares/58040160808180912245?user-hash=34CE32F4CACDD770D6BB0977E066F74724B170F3CCF7002BAA802170711F99DF&token=1fa2c309-ef6b-4155-a672-ebde4905364b

	// -----------------------------------------------------------------------------------------
	createTab : function( theTitle, theContent ) {
		
		var theTab = {
				title: theTitle,
			    bodyPadding: 0,
			    
				items:[{
			        xtype: 'panel',
			        padding: 3,
			        border: 0,
			        layout:'fit',
			        html : theContent	
				}]
		};  		
		
		return theTab;
	},

	noData : function() {
		var table = "<table style='width:100%;' class='dataWindow'>";
		table = table + "<tr class='dataWindowLine'><td class='lineSeparator' colspan='6'>Sem Informações</td></tr>";
		table = table + "</table>";
		return table;
	},
	
	
	getFunLogTab : function( data ) {
		var funLogs = data.associations.funcoesLogisticas;
		if( funLogs.length == 0 ) {
			return this.noData();
		}
		
		var table = "<table style='width:100%;' class='dataWindow'>";
		for (x=0; x< funLogs.length; x++ ) {
			
		}
		
		table = table + "</table>";
		return table;
		
	},
	
	getTelefoneTab : function( data ) {
		
		
		var telefones = data.associations.telefones;
		if( telefones.length == 0 ) {
			return this.noData();
		}
		
		var table = "<table style='width:100%;' class='dataWindow'>";
		for (x=0; x< telefones.length; x++ ) {
			var setor = telefones[x].setor;
			var telefone = telefones[x].telefone;
			
			var principal = 'Não';
			if ( telefones[x].principal === true ) principal = 'Sim'; 
				
			table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Setor</td><td class='dataWindowValue'>"+setor+"</td>"+
            	"<td class='dataWindowAttibute'>Telefone</td><td class='dataWindowValue'>"+telefone+"</td>" +
            	"<td class='dataWindowAttibute'>Principal</td><td class='dataWindowValue'>"+principal+"</td></tr>";
			
		}

		table = table + "</table>";
		return table;
	},
	
	getContatoTab : function( data ) {
		var contatos = data.associations.contatos;
		
		if( contatos.length == 0 ) {
			return this.noData();
		}

		var table = "<table style='width:100%;' class='dataWindow'>";
		for (x=0; x< contatos.length; x++ ) {
			var contato = contatos[x];
			var nome = contato.nome;
			var cargo = contato.cargo;
			var celular = contato.celular;
			var email = contato.email;
			var telefone = contato.telefone;
			var princContato = contato.stringPrincipalContato;

			table = table + "<tr class='dataWindowLine'><td class='lineSeparator' colspan='6'>"+nome+ " (" + cargo + ")</td></tr>";
			table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Telefones</td><td class='dataWindowValue'>Fixo: "+telefone+"<br>Celular: " + celular + "</td>"+
                "<td class='dataWindowAttibute'>Email</td><td class='dataWindowValue'>"+email+"</td>" +
                "<td class='dataWindowAttibute'>Contato Principal</td><td class='dataWindowValue'>"+princContato+"</td></tr>";
			
		}
		
		table = table + "</table>";
		return table;
	},
	
	getInfoTab : function( data ) {
		
		var sigla = data.sigla;
		var nome = data.nome;
		var codOM = data.codom;
		var forca = data.forca.nome;
		var comImSup = data.comImSup.nome;
		var comImTec = data.comImTec.nome;
		var cnpj = data.cnpj;
		var tipoOm = data.tipo.nome;
		var codUGR = data.codigoUgr;
		var cep = data.cep;
		var logradouro = data.logradouro;
		var numeroEnd = data.numeroEnd;
		var complemento = data.complemento;
		var bairro = data.bairro;
		var pais = data.pais.nome;
		var estado = data.estado.nome;
		var cidade = data.cidade.nome;
		var coordenadas = "***";
		var comandante = data.comandante;
		var efetivoOficiais = data.efetivoOf; 	
		var efetivoPracas = data.efetivoPr;
		var solServLog = 'Não';
		var isOperativa = 'Não';
		var subordinacao = data.subordinacao;
		var designacao = data.designacao;
		var caractNotaveis = data.caractNotaveis; 
		var paginaWeb = '***';
		var corMapa = '***';
		var ramosAtividade = data.associations.ramosAtividade;
		
		if ( data.operativa === true ) isOPerativa = 'Sim';
		if ( data.omSolicitanteLog === true ) solServLog = 'Sim';
		
		if( !comImSup ) comImSup = '';
		if( !comImTec ) comImTec = '';
		
		console.log( data );
		
		var table = "<table style='width:100%;' class='dataWindow'>";

		table = table + "<tr class='dataWindowLine'><td class='lineSeparator' colspan='6'>Dados Gerais</td></tr>";
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Nome</td><td colspan='5' class='dataWindowValue'>"+nome+"</td></tr>" +
				"<tr class='dataWindowLine'><td class='dataWindowAttibute'>Código OM</td><td class='dataWindowValue'>"+codOM+"</td>" +
				                      "<td class='dataWindowAttibute'>Sigla</td><td class='dataWindowValue'>"+sigla+"</td>" +
				                      "<td class='dataWindowAttibute'>Código UGR</td><td class='dataWindowValue'>"+codUGR+"</td></tr>";
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Força</td><td colspan='5' class='dataWindowValue'>"+forca+"</td>";

		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>CNPJ</td><td class='dataWindowValue'>"+cnpj+"</td>" +
				                      "<td class='dataWindowAttibute'>Tipo OM</td><td class='dataWindowValue'>"+tipoOm+"</td>" +
				                      "<td class='dataWindowAttibute'>Operativa</td><td class='dataWindowValue'>"+isOperativa+"</td></tr>";
		
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Com. Sup. Operacional</td><td colspan='5' class='dataWindowValue'>"+comImSup+"</td></tr>" +
				                      "<tr><td class='dataWindowAttibute'>Com. Sup. Técnico</td><td colspan='5' class='dataWindowValue'>"+comImTec+"</td></tr>";
				                      

		
		table = table + "<tr class='dataWindowLine'><td class='lineSeparator' colspan='6'>Endereço</td></tr>";
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>CEP</td><td class='dataWindowValue'>"+cep+"</td>" +
		  	                          "<td class='dataWindowAttibute'>Logradouro</td><td class='dataWindowValue'>"+logradouro+"</td>" +
				                      "<td class='dataWindowAttibute'>Número</td><td class='dataWindowValue'>"+numeroEnd+"</td></tr>";
		
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Complemento</td><td class='dataWindowValue'>"+complemento+"</td>" +
				                      "<td class='dataWindowAttibute'>Bairro</td><td class='dataWindowValue'>"+bairro+"</td>" +
				                      "<td class='dataWindowAttibute'>País</td><td class='dataWindowValue'>"+pais+"</td></tr>";
		
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Estado</td><td class='dataWindowValue'>"+estado+"</td>" +
				                      "<td class='dataWindowAttibute'>Cidade</td><td class='dataWindowValue'>"+cidade+"</td>" +
				                      "<td class='dataWindowAttibute'>Coordenadas</td><td class='dataWindowValue'>"+coordenadas+"</td></tr>";

		
		table = table + "<tr class='dataWindowLine'><td class='lineSeparator' colspan='6'>Informações Complementares</td></tr>";
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Comandante</td><td colspan='5' class='dataWindowValue'>"+comandante+"</td>";

		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Efetivo Oficiais</td><td class='dataWindowValue'>"+efetivoOficiais+"</td>" +
									  "<td class='dataWindowAttibute'>Efetivo Praças</td><td class='dataWindowValue'>"+efetivoPracas+"</td>" + 
                                	  "<td class='dataWindowValue'>&nbsp;</td><td class='dataWindowValue'>&nbsp;</td></tr>";
		
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Designação</td><td class='dataWindowValue'>"+designacao+"</td>" +
				                      "<td class='dataWindowAttibute'>Subordinação</td><td class='dataWindowValue'>"+subordinacao+"</td>" +
				                      "<td class='dataWindowAttibute'>Sol. Serv. Logísticos</td><td class='dataWindowValue'>"+solServLog+"</td></tr>";
		
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Cor no Mapa</td><td class='dataWindowValue'>"+corMapa+"</td>" +
				                      "<td class='dataWindowAttibute'>Página WEB</td><td class='dataWindowValue'>"+paginaWeb+"</td>" +
				                      "<td class='dataWindowAttibute'>Carac. Notáveis</td><td class='dataWindowValue'>"+caractNotaveis+"</td></tr>";
		
		table = table + "<tr class='dataWindowLine'><td class='lineSeparator' colspan='6'>Ramos de Atividade</td></tr>";
		
				for (x=0; x< ramosAtividade.length; x++ ) {
					var ramoAtt = ramosAtividade[x];
					var desc = ramoAtt.descricao;
					var princ = 'Não';
					var interesse = 'Não';
					
					if( ramoAtt.principalAtividade === true ) princ = 'Sim';
					if( ramoAtt.atividade.interesse === true ) interesse = 'Sim';
					
					var table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>Descrição</td><td class='dataWindowValue'>"+desc+"</td>"+
	                    "<td class='dataWindowAttibute'>Principal Atividade</td><td class='dataWindowValue'>"+princ+"</td>" +
	                    "<td class='dataWindowAttibute'>Interesse</td><td class='dataWindowValue'>"+interesse+"</td></tr>";
				}
		
		
		
		table = table + "<tr class='dataWindowLine'><td class='lineSeparator' colspan='6'>Participação no Processo de Empresas Mobilizáveis</td></tr>";
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>&nbsp;</td><td class='dataWindowValue'>&nbsp;</td><td class='dataWindowAttibute'>&nbsp;</td><td class='dataWindowValue'>&nbsp;</td><td class='dataWindowAttibute'>&nbsp;</td><td class='dataWindowValue'>&nbsp;</td></tr>";
		
		table = table + "<tr class='dataWindowLine'><td class='lineSeparator' colspan='6'>Responsabilidade pelo Cadastro</td></tr>";
		table = table + "<tr class='dataWindowLine'><td class='dataWindowAttibute'>&nbsp;</td><td class='dataWindowValue'>&nbsp;</td><td class='dataWindowAttibute'>&nbsp;</td><td class='dataWindowValue'>&nbsp;</td><td class='dataWindowAttibute'>&nbsp;</td><td class='dataWindowValue'>&nbsp;</td></tr>";

		table = table + "</table>";
		
		return table;
	},
	
	
	// -----------------------------------------------------------------------------------------
	makeWindow : function( data ) {
		
		var orgMilWindow = Ext.getCmp('orgMilWindow');
		if( !orgMilWindow ) {
			orgMilWindow = Ext.create('MCLM.view.apolo.orgmil.OrgMilWindow');
		}
		
		var content = 'Nenhum conteúdo ainda...';
		
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Informações', this.getInfoTab(data) ) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Contato', this.getContatoTab(data) ) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Telefone', this.getTelefoneTab(data) ) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Fun. Log.', this.getFunLogTab(data) ) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Cap. Log.', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Instalações', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Produtos', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Serviços', content) );
		Ext.getCmp('orgMilTabContainer').add( this.createTab('Acordos Adm.', content) );
		
		orgMilWindow.show();
			
	},
	// -----------------------------------------------------------------------------------------
	

});
