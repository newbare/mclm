package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.HashSet;
import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class NodeRepository extends BasicRepository {

	public NodeRepository() throws DatabaseConnectException {
		super();
	}

	public Set<NodeData> getList( ) throws Exception {
		DaoFactory<NodeData> df = new DaoFactory<NodeData>();
		IDao<NodeData> fm = df.getDao(this.session, NodeData.class);
		Set<NodeData> node = null;
		
		try {
			node = new HashSet<NodeData>( fm.getList("select * from node_data" ) );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		
		closeSession();
		return node;
	}

	
}
