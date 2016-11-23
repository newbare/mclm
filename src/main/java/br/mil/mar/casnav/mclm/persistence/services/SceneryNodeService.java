package br.mil.mar.casnav.mclm.persistence.services;

import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.repository.SceneryNodeRepository;

public class SceneryNodeService {
	private SceneryNodeRepository rep;

	public SceneryNodeService() throws DatabaseConnectException {
		this.rep = new SceneryNodeRepository();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public void insertSceneryNodeList(Set<SceneryNode> SceneryNodeList) throws Exception {
		rep.insertSceneryNodeList( SceneryNodeList );
	}
	
	public SceneryNode insertSceneryNode(SceneryNode SceneryNode) throws InsertException {
		SceneryNode expRet = rep.insertSceneryNode( SceneryNode );
		return expRet ;
	}	

	public void deleteSceneryNode( int idSceneryNode ) throws DeleteException {
		try {
			SceneryNode SceneryNode = rep.getSceneryNode(idSceneryNode);
			rep.newTransaction();
			rep.deleteSceneryNode(SceneryNode);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public Set<SceneryNode> getList( ) throws Exception {
		return rep.getList( );
	}

	
}
