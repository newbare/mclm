package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.DataSourcesCollection;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.persistence.entity.DataSource;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.DataSourceRepository;

public class DataSourceService {
	private DataSourceRepository rep;

	public DataSourceService() throws DatabaseConnectException {
		this.rep = new DataSourceRepository();
	}

	public void updateDataSource(DataSource dataSource) throws UpdateException {
		DataSource oldDataSource;

		try {
			oldDataSource = rep.getDataSource( dataSource.getIdDataSource() );
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldDataSource.setDataSourceName( dataSource.getDataSourceName() );
		oldDataSource.setHint( dataSource.getHint() );
		oldDataSource.setTableName( dataSource.getTableName() );
		
		rep.newTransaction();
		rep.updateDataSource(oldDataSource);

	}	

	public DataSource getDataSource(int idDataSource) throws Exception{
		return rep.getDataSource(idDataSource);
	}


	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	
	public String insertDataSource(String dataSourceName, String hint, String tableName, String institute, 
			Integer layerFolderID, String database, String whereClause, String geometryColumn, String propertiesColumns) throws InsertException {
		String result = "{ \"success\": true, \"msg\": \"Camada de Dados criada com sucesso.\" }";
		
		try {
			DataSource dataSource = new DataSource(dataSourceName, hint, tableName, database, whereClause, geometryColumn, propertiesColumns);
			dataSource = rep.insertDataSource( dataSource );
			
			String layerAlias = tableName + ":" + dataSource.getIdDataSource();
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "", hint, institute, layerAlias, dataSourceName, LayerType.DTA);
			ns.addNode( node );				
			
			
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
	}
		

	public void deleteDataSource( int idDataSource ) throws DeleteException {
		try {
			DataSource dataSource = rep.getDataSource(idDataSource);
			rep.newTransaction();
			rep.deleteDataSource(dataSource);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public List<DataSource> getList( ) throws Exception {
		return rep.getList( );
	}

	public String getAsJson() throws Exception {
		List<DataSource> dataSources = getList();
		DataSourcesCollection esc = new DataSourcesCollection( dataSources );
		JSONObject itemObj = new JSONObject( esc );
		return itemObj.toString();		
	}

	
}
