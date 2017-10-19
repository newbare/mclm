package br.mil.mar.casnav.mclm.persistence.services.apolo;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.misc.WebClient;

public class OrganizacoesMilitaresService extends BasicApoloService {

	public OrganizacoesMilitaresService() throws Exception {
		super();
	}

	
	public String getOrgMil( String orgid, User user ) throws Exception {
		
		String token = user.getHashKey();
		String idUser = user.getIdUser();
		String apolo = Configurator.getInstance().getApoloRESTAddress();
		
		//String urlApi = "http://apolo.defesa.mil.br//SIGLMD-web/api/v2/estruturas/organizacoes?user-hash=34CE32F4CACDD770D6BB0977E066F74724B170F3CCF7002BAA802170711F99DF&token=a7fb187e-185f-416a-9f28-010fecc23bc6";
		
		String urlApi = apolo + "/SIGLMD-web/api/v2/organizacoes/"+orgid+"?user-hash="+idUser+"&token="+token ;
		
		WebClient wc = new WebClient();
		String result = wc.doGet(urlApi);
		return result;
		
	}
	
}
