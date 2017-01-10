package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.DataSource;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class DataSourceRepository extends BasicRepository {

	public DataSourceRepository() throws DatabaseConnectException {
		super();
	}

	public void updateDataSource( DataSource dataSource ) throws UpdateException {
		DaoFactory<DataSource> df = new DaoFactory<DataSource>();
		IDao<DataSource> fm = df.getDao(this.session, DataSource.class);
		try {
			fm.updateDO( dataSource );
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}
	
	public DataSource insertDataSource( DataSource dataSource ) throws InsertException {
		DaoFactory<DataSource> df = new DaoFactory<DataSource>();
		IDao<DataSource> fm = df.getDao(this.session, DataSource.class);
		
		try {
			fm.insertDO( dataSource );
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return dataSource;
	}
	
	public DataSource getDataSource( int idDataSource ) throws Exception {
		DaoFactory<DataSource> df = new DaoFactory<DataSource>();
		IDao<DataSource> fm = df.getDao(this.session, DataSource.class);
		DataSource server = null;
		try {
			server = fm.getDO( idDataSource );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return server;
	}

	public List<DataSource> getList() throws Exception {
		DaoFactory<DataSource> df = new DaoFactory<DataSource>();
		IDao<DataSource> fm = df.getDao(this.session, DataSource.class);
		List<DataSource> server = null;
		try {
			server = fm.getList("select * from data_sources");
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return server;
	}

	
	public void deleteDataSource(DataSource server) throws DeleteException {
		DaoFactory<DataSource> df = new DaoFactory<DataSource>();
		IDao<DataSource> fm = df.getDao(this.session, DataSource.class);
		try {
			fm.deleteDO(server);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}		
}
