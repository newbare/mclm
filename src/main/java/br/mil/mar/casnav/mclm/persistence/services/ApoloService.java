package br.mil.mar.casnav.mclm.persistence.services;

import br.mil.mar.casnav.mclm.misc.User;

public class ApoloService {
	
	public User checkUser( String idUser ) throws Exception {
		User user = new User();

		// Lancar um erro se nao achar o usuario.
		
		if( idUser != null ) {
			user.setIdUser( Integer.valueOf( idUser ) );
			user.setUserName("Carlos Magno");
		} else {
			user.setIdUser( 99999 );
			user.setUserName("Convidado");
		}
		
		return user;
	}

}
