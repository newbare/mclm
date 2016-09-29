package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Type;

@Entity
@Table(name="sceneries", indexes = {
	       @Index(columnList = "id_scenery", name = "scenery_hndx")
}) 
public class Scenery {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_scenery")
	private int idScenery;
	
	@Column
	private boolean active;
	
	@Column(name="creation_date")
	@Type(type="timestamp")
	private Date creationDate;
	
	@Column(name="scenery_name", length=100)
	private String sceneryName;	
	
	@Column(name="zoom_level")
	private int zoomLevel = 4;	

	@Column(name="map_center", length=100)
	private String mapCenter = "-48.12,-15.8";	
	
	@ManyToOne()
	@Cascade(org.hibernate.annotations.CascadeType.ALL)
	@JoinColumn(name="id_user", foreignKey = @ForeignKey(name = "fk_user_scenery"))
	private User user;	
	
    @OneToMany(orphanRemoval=true,  mappedBy="scenery", fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<SceneryLayer> layers;

    @Column(length=10)
	private String graticule = "false";

    public Scenery() {
		creationDate = Calendar.getInstance().getTime();
		layers = new HashSet<SceneryLayer>();
	}
    
    public boolean isNodeInThisScenery( int nodeId ) {
    	/*
    	for ( SceneryLayer layer : layers ) {
    		if ( layer.getNode().getIdNode() == nodeId ) return true;
    	}
    	*/
    	return false;
    }
    
    /*
    public void addNode( Node node ) {
    	SceneryLayer sl = new SceneryLayer();
    	sl.setScenery( this );
    	sl.setNode( node );
    	layers.add( sl );
    }
    
    public void removeNode( int idNode ) {
    	for ( SceneryLayer layer : layers ) {
    		Node node = layer.getNode(); 
    		if ( node.getIdNode() == idNode ) {
    			layers.remove( layer );
    			break;
    		}
    	}
    }
    */
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public int getIdScenery() {
		return idScenery;
	}

	public void setIdScenery(int idScenery) {
		this.idScenery = idScenery;
	}

	public Set<SceneryLayer> getLayers() {
		return layers;
	}
	
	public void setLayers(Set<SceneryLayer> layers) {
		this.layers = layers;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}	
	
	@Override
	public boolean equals(Object obj) {
	    if (this == obj) return true;
	    if (null == obj) return false;
	    if ( getClass() != obj.getClass() ) return false;
	    Scenery scenery = (Scenery) obj;
		return getIdScenery() == scenery.getIdScenery();
	}

	public String getSceneryName() {
		return sceneryName;
	}

	public void setSceneryName(String sceneryName) {
		this.sceneryName = sceneryName;
	}

	public int getZoomLevel() {
		return zoomLevel;
	}

	public void setZoomLevel(int zoomLevel) {
		this.zoomLevel = zoomLevel;
	}

	public String getMapCenter() {
		return mapCenter;
	}

	public void setMapCenter(String mapCenter) {
		this.mapCenter = mapCenter;
	}

	public void setGraticule(String graticule) {
		this.graticule = graticule;
		
	}

	public String getGraticule() {
		return graticule;
	}
}
