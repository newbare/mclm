package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.HashSet;
import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.SceneryLayer;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class SceneryLayerRepository extends BasicRepository {

	public SceneryLayerRepository() throws DatabaseConnectException {
		super();
	}

	public SceneryLayer insertSceneryLayer(SceneryLayer sceneryLayer) throws InsertException {
		DaoFactory<SceneryLayer> df = new DaoFactory<SceneryLayer>();
		IDao<SceneryLayer> fm = df.getDao(this.session, SceneryLayer.class);
		
		try {
			fm.insertDO(sceneryLayer);
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return sceneryLayer;
	}

	
	public void insertSceneryLayerList(Set<SceneryLayer> sceneryLayerList) throws Exception {
		/*
		DaoFactory<SceneryLayer> df = new DaoFactory<SceneryLayer>();
		IDao<SceneryLayer> fm = df.getDao(this.session, SceneryLayer.class);

		DaoFactory<Node> nf = new DaoFactory<Node>();
		IDao<Node> nd = nf.getDao(this.session, Node.class);
		
		
		try {
			for( SceneryLayer sl : sceneryLayerList ) {
				
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
	
	
	public Set<SceneryLayer> getList() throws Exception {
		DaoFactory<SceneryLayer> df = new DaoFactory<SceneryLayer>();
		IDao<SceneryLayer> fm = df.getDao(this.session, SceneryLayer.class);
		Set<SceneryLayer> sceneryLayer = null;
		try {
			sceneryLayer = new HashSet<SceneryLayer>( fm.getList("select * from scenery_layer") );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return sceneryLayer;
	}
	
	public void deleteSceneryLayer(SceneryLayer sceneryLayer) throws DeleteException {
		DaoFactory<SceneryLayer> df = new DaoFactory<SceneryLayer>();
		IDao<SceneryLayer> fm = df.getDao(this.session, SceneryLayer.class);
		try {
			fm.deleteDO(sceneryLayer);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}

	public SceneryLayer getSceneryLayer(int idSceneryLayer) throws Exception {
		DaoFactory<SceneryLayer> df = new DaoFactory<SceneryLayer>();
		IDao<SceneryLayer> fm = df.getDao(this.session, SceneryLayer.class);
		SceneryLayer sceneryLayer = null;
		try {
			sceneryLayer = fm.getDO(idSceneryLayer);
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return sceneryLayer;
	}		
}
