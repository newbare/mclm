package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.HashSet;
import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class SceneryNodeRepository extends BasicRepository {

	public SceneryNodeRepository() throws DatabaseConnectException {
		super();
	}

	public SceneryNode insertSceneryNode(SceneryNode SceneryNode) throws InsertException {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		
		try {
			fm.insertDO(SceneryNode);
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return SceneryNode;
	}

	
	public void insertSceneryNodeList(Set<SceneryNode> SceneryNodeList) throws Exception {
		/*
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);

		DaoFactory<Node> nf = new DaoFactory<Node>();
		IDao<Node> nd = nf.getDao(this.session, Node.class);
		
		
		try {
			for( SceneryNode sl : SceneryNodeList ) {
				
				try {
					Node node = nd.getDO( sl.getNode().getIdNode() );
					sl.setNode(node);
					System.out.println(">>> " + node.getIdNode() );
				} catch ( Exception nfe ) { 
					//
				}
				fm.insertDO( sl );
				
			}
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		*/
	}
	
	
	public Set<SceneryNode> getList() throws Exception {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		Set<SceneryNode> SceneryNode = null;
		try {
			SceneryNode = new HashSet<SceneryNode>( fm.getList("select * from scenery_layer") );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return SceneryNode;
	}
	
	public void deleteSceneryNode(SceneryNode SceneryNode) throws DeleteException {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		try {
			fm.deleteDO(SceneryNode);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}

	public SceneryNode getSceneryNode(int idSceneryNode) throws Exception {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		SceneryNode SceneryNode = null;
		try {
			SceneryNode = fm.getDO(idSceneryNode);
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return SceneryNode;
	}		
}
