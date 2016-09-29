package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="scenery_layer") 
public class SceneryLayer {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_layer")
	private int idLayer;	
	
	@Column
	private int index = 0;

	@Column
	private int transparency = 1;
	
	@ManyToOne()
	@JoinColumn(name="id_node", foreignKey = @ForeignKey(name = "fk_scenery_layer_node"))
	private Node node;
	
	@ManyToOne()
	@JoinColumn(name="id_scenery", foreignKey = @ForeignKey(name = "fk_scenery_layer_scenery"))
	private Scenery scenery;	
	
	public Node getNode() {
		return node;
	}
	
	public void setNode(Node node) {
		this.node = node;
	}
	
	public Scenery getScenery() {
		return scenery;
	}
	
	public void setScenery(Scenery scenery) {
		this.scenery = scenery;
	}
	
	public int getIdLayer() {
		return idLayer;
	}
	
	public void setIdLayer(int idLayer) {
		this.idLayer = idLayer;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getTransparency() {
		return transparency;
	}

	public void setTransparency(int transparency) {
		this.transparency = transparency;
	}

	
	
}
