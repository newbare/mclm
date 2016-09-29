package br.mil.mar.casnav.mclm.persistence.services;

import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.repository.GenericRepository;

public class GenericService {
	private GenericRepository rep;
	
	public GenericService() throws DatabaseConnectException {
		this.rep = new GenericRepository();
	}

	@SuppressWarnings("rawtypes")
	public Set<UserTableEntity> genericFetchList(String query) throws Exception {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
		Set<UserTableEntity> result = new LinkedHashSet<UserTableEntity>();
		for ( Object obj : rep.genericFetchList(query) ) {
			UserTableEntity ut = new UserTableEntity( (Map)obj );
			result.add(ut);
		}
		rep.closeSession();
		return result;
	}	
	
}
