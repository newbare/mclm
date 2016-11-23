package br.mil.mar.casnav.mclm.persistence.services;

import java.util.Set;

import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.persistence.entity.Scenery;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.SceneryRepository;

public class SceneryService {
	private SceneryRepository rep;

	public SceneryService() throws DatabaseConnectException {
		this.rep = new SceneryRepository();
	}

	
	public void clone( int idScenery, String sceneryName, String mapCenter, String zoomLevel, User user ) throws Exception {
		/*
		Scenery source = getScenery(idScenery);
		Scenery target = new Scenery();
		
		target.setActive( true );
		target.setSceneryName(sceneryName);
		target.setUser(user);
		target.setZoomLevel( Integer.valueOf( zoomLevel ) );
		target.setMapCenter(mapCenter);
		
		for ( SceneryLayer sl : source.getLayers() ) {
			target.addNode( sl.getNode() );
		}
		
		newTransaction();
		target = insertScenery(target);
		
		newTransaction();
		source.setActive( false );
		updateScenery(source);
		
		user.addScenery( target );
		user.deactivateScenery( source );
	*/
	}
	
	public void updateScenery(Scenery scenery) throws UpdateException {
		/*
		Scenery oldScenery;

		try {
			oldScenery = rep.getScenery( scenery.getIdScenery() );
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldScenery.setActive( scenery.isActive() );
		oldScenery.setSceneryName( scenery.getSceneryName() );
		oldScenery.setZoomLevel( scenery.getZoomLevel() );
		oldScenery.setMapCenter( scenery.getMapCenter() );
		oldScenery.setGraticule( scenery.getGraticule() );
		
		oldScenery.getLayers().clear();
		for ( SceneryLayer sl : scenery.getLayers() ) {
			oldScenery.addNode( sl.getNode() );
		}		

		rep.newTransaction();
		rep.updateScenery(oldScenery);
	*/
	}	

	public Scenery getScenery(int idScenery) throws Exception{
		return rep.getScenery(idScenery);
	}

	public Scenery getScenery(String name) throws Exception{
		return rep.getScenery(name);
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public Scenery insertScenery(Scenery scenery) throws Exception {
		Scenery expRet = rep.insertScenery( scenery );
		return expRet ;
	}	

	public void deleteScenery( int idScenery ) throws DeleteException {
		try {
			Scenery scenery = rep.getScenery(idScenery);
			rep.newTransaction();
			rep.deleteScenery(scenery);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public Set<Scenery> getList( ) throws Exception {
		return rep.getList();
	}

	public Set<Scenery> getList( int idUser ) throws Exception {
		return rep.getList( idUser );
	}
	
}
