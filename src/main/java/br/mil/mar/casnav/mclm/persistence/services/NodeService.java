package br.mil.mar.casnav.mclm.persistence.services;

import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.repository.NodeRepository;

public class NodeService {
	private NodeRepository rep;

	public NodeService() throws DatabaseConnectException {
		this.rep = new NodeRepository();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}

	public Set<NodeData> getList( int idParent ) throws Exception {
		return rep.getList( idParent );
	}


	
}
