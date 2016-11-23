package br.mil.mar.casnav.mclm.misc;

import java.util.HashSet;
import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.Scenery;


public class User {

	private int idUser;
	
    private Set<Scenery> sceneries;	
	
    public User() {
    	sceneries = new HashSet<Scenery>();
	}
    
    public void removeScenery( Scenery scn ) {
    	sceneries.remove( scn );
    }
    
    public void addScenery( Scenery scn ) {
    	scn.setIdUser( this.getIdUser() );
    	sceneries.add( scn );
    }
    
	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public Set<Scenery> getSceneries() {
		return sceneries;
	}
	
	public void setSceneries(Set<Scenery> sceneries) {
		this.sceneries = sceneries;
	}
	
}
