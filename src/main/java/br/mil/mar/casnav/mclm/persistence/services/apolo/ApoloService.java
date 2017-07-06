package br.mil.mar.casnav.mclm.persistence.services.apolo;

import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.misc.WebClient;

public class ApoloService {
	
	
	private String getApoloUser( String idUser, String key ) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://apolo.defesa.mil.br/SIGLMD-web/MCLMSecurityServlet?userId="+idUser+"&securityCode=" + key;
		String result = wc.doGet(url);
		return result;
	}
	
	public User checkUser( String idUser, String key ) throws Exception {
		User user = new User();

		if( idUser != null && key != null) {
			
			String result = getApoloUser(idUser, key);
			
			System.out.println( result );
			
			user.setIdUser( Integer.valueOf( idUser ) );
			user.setUserName("Carlos Magno");
		} else {
			
			//throw new UnauthorizedException("");
			
			user.setIdUser( 99999 );
			user.setUserName("Convidado");
		}
		
		return user;
	}

}
