package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.List;

import javax.management.relation.Relation;

import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class GenericRepository extends BasicRepository {

	public GenericRepository() throws DatabaseConnectException {
		super();
	}
	
	
	public List<?> genericFetchList( String query ) throws Exception {
		DaoFactory<Relation> df = new DaoFactory<Relation>();
		IDao<Relation> fm = df.getDao(this.session, Relation.class);
		List<?> retorno = null;
		try {
			retorno = fm.genericAccess( query );
		} catch (Exception e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return retorno;
	}
	
}
