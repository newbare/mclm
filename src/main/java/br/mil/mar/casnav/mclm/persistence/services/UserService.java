package br.mil.mar.casnav.mclm.persistence.services;

import java.security.MessageDigest;
import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.User;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.UserRepository;

public class UserService {
	private UserRepository rep;
	

	public UserService() throws DatabaseConnectException {
		this.rep = new UserRepository();
	}

	private String convertPassword( byte[] password ) throws Exception {
		MessageDigest md = MessageDigest.getInstance("SHA-1");
		byte[] digest = md.digest( password );
		
		String result = "";
		for (int i=0; i < digest.length; i++) {
			result +=
				Integer.toString( ( digest[i] & 0xff ) + 0x100, 16).substring( 1 );
		}
		return result;
	}
	
	public void updateUser(User user) throws UpdateException {
		User oldUser;
		String sha1Password = "";
		
		try {
			oldUser = rep.getUser( user.getIdUser() );
			oldUser.setFullName( user.getFullName() );
			if ( ( user.getPassword() != null ) && ( !user.getPassword().equals("") ) ) {
				sha1Password = convertPassword( user.getPassword().getBytes() );
				oldUser.setPassword( sha1Password );
			}
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}
		
		oldUser.setLoginName( user.getLoginName() );
		oldUser.setUserMail( user.getUserMail() );
		
		rep.newTransaction();
		rep.updateUser(oldUser);

	}	

	public User login( String loginName, String password ) throws Exception {
		String sha1Password = convertPassword( password.getBytes() );
		return rep.login( loginName, sha1Password);
	}
	
	public User getUser(int idUser) throws NotFoundException{
		return rep.getUser(idUser);
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public User insertUser(User user) throws InsertException {
		try {
			String sha1Password = convertPassword( user.getPassword().getBytes() );
			user.setPassword( sha1Password );
		} catch ( Exception e ) {
			throw new InsertException( e.getMessage() );
		}

		User expRet = rep.insertUser( user );
		return expRet ;
	}	

	public User requestAccess( String fullName, String username, String password, String mailAddress ) throws InsertException {
		User user = new User();
		user.setFullName( fullName );
		user.setLoginName( username );
		user.setPassword( password );
		user.setUserMail( mailAddress );
		
		try {
			String sha1Password = convertPassword( user.getPassword().getBytes() );
			user.setPassword( sha1Password );
			rep.insertUser( user );

			
		} catch ( Exception e ) {
			throw new InsertException( e.getMessage() );
		}
		
		return user;
	}	
	
	public void deleteUser( int idUser ) throws DeleteException {
		try {
			User user = rep.getUser(idUser);
			rep.newTransaction();
			rep.deleteUser(user);
		} catch (NotFoundException e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public Set<User> getList( ) throws NotFoundException {
		return rep.getList( );
	}

	
}
