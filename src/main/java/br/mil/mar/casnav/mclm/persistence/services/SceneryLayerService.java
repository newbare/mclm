package br.mil.mar.casnav.mclm.persistence.services;

import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.SceneryLayer;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.repository.SceneryLayerRepository;

public class SceneryLayerService {
	private SceneryLayerRepository rep;

	public SceneryLayerService() throws DatabaseConnectException {
		this.rep = new SceneryLayerRepository();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public void insertSceneryLayerList(Set<SceneryLayer> sceneryLayerList) throws Exception {
		rep.insertSceneryLayerList( sceneryLayerList );
	}
	
	public SceneryLayer insertSceneryLayer(SceneryLayer sceneryLayer) throws InsertException {
		SceneryLayer expRet = rep.insertSceneryLayer( sceneryLayer );
		return expRet ;
	}	

	public void deleteSceneryLayer( int idSceneryLayer ) throws DeleteException {
		try {
			SceneryLayer sceneryLayer = rep.getSceneryLayer(idSceneryLayer);
			rep.newTransaction();
			rep.deleteSceneryLayer(sceneryLayer);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public Set<SceneryLayer> getList( ) throws Exception {
		return rep.getList( );
	}

	
}
