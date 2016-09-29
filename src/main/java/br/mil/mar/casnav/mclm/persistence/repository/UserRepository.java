package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.User;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class UserRepository extends BasicRepository {

	public UserRepository() throws DatabaseConnectException {
		super();
	}

	public Set<User> getList() throws NotFoundException {
		DaoFactory<User> df = new DaoFactory<User>();
		IDao<User> fm = df.getDao(this.session, User.class);
		Set<User> users = null;
		try {
			users = new HashSet<User>( fm.getList("select * from users ") );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return users;
	}

	public User getUserByName( String userName ) throws NotFoundException {
		DaoFactory<User> df = new DaoFactory<User>();
		IDao<User> fm = df.getDao(this.session, User.class);
		List<User> users = null;
		try {
			users = fm.getList("select * from users where username = '" + userName + "'" );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return users.get(0);
	}

	public User login( String loginName, String password ) throws NotFoundException {
		DaoFactory<User> df = new DaoFactory<User>();
		IDao<User> fm = df.getDao(this.session, User.class);
		List<User> users = null;
		try {
			users = fm.getList("select * from users where loginname = '" + loginName + "' and password = '" + password + "'" );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return users.get(0);
	}
	
	public void updateUser( User user ) throws UpdateException {
		DaoFactory<User> df = new DaoFactory<User>();
		IDao<User> fm = df.getDao(this.session, User.class);
		try {
			fm.updateDO(user);
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}
	
	public User insertUser(User user) throws InsertException {
		DaoFactory<User> df = new DaoFactory<User>();
		IDao<User> fm = df.getDao(this.session, User.class);
		
		try {
			fm.insertDO(user);
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return user;
	}
	

	public User getUser(int idUser) throws NotFoundException {
		DaoFactory<User> df = new DaoFactory<User>();
		IDao<User> fm = df.getDao(this.session, User.class);
		User user = null;
		try {
			user = fm.getDO(idUser);
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return user;
	}
	

	public void deleteUser(User user) throws DeleteException {
		DaoFactory<User> df = new DaoFactory<User>();
		IDao<User> fm = df.getDao(this.session, User.class);
		try {
			fm.deleteDO(user);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}	
	
}
