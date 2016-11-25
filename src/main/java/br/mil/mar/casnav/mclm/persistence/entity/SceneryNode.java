package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import br.mil.mar.casnav.mclm.misc.LayerType;


@Entity
@Table(name="scenery_node") 
public class SceneryNode {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_scenery_node")
	private int idSceneryNode;

	@Column(name="id_node_parent")
	private int idNodeParent;

	@Column(name="id_node")
	private int id;

	@Column(name="index_order")
	private int indexOrder;	
	
	@Column(length=5)
	@Enumerated(EnumType.STRING)
	private LayerType layerType;
	
	@Transient
	private int children;

	@Column(length=250)
	private String serviceUrl;
	
	@Column(length=250)
	private String originalServiceUrl;

	@Column(length=250)
	private String description;
	
	@Column(length=250)
	private String institute;
	
	@Column(length=150)
	private String layerName;
	
	@Column(length=150)
	private String layerAlias;

	@Column(length=10, name = "serialid")
	private String serialId;	
	
	@Column(name = "read_only")
	private boolean readOnly;

	@Column
	private boolean selected;	
	
	@Column
	private int layerStackIndex = 0;

	@Column
	private int transparency = 1;	
	
	public SceneryNode() {
		// TODO Auto-generated constructor stub
	}
	
	@ManyToOne()
	@JoinColumn(name="id_scenery", foreignKey = @ForeignKey(name = "fk_scenery_layer_scenery"))
	private Scenery scenery;		
	
	public SceneryNode( int idNodeParent, String originalServiceUrl, String description, String institute, String layerName, 
			String layerAlias, LayerType layerType ) {
		this.idNodeParent = idNodeParent;
		this.originalServiceUrl = originalServiceUrl;
		this.description = description;
		this.institute = institute;
		this.layerName = layerName;
		this.layerAlias = layerAlias;
		this.layerType = layerType;
		this.readOnly = false;
		this.serialId = "LR" + UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8);
	}

	public int getTransparency() {
		return transparency;
	}

	public void setTransparency(int transparency) {
		this.transparency = transparency;
	}	
	
	public int getIdSceneryNode() {
		return idSceneryNode;
	}

	public void setIdSceneryNode(int idSceneryNode) {
		this.idSceneryNode = idSceneryNode;
	}

	public int getLayerStackIndex() {
		return layerStackIndex;
	}

	public void setLayerStackIndex(int layerStackIndex) {
		this.layerStackIndex = layerStackIndex;
	}

	public String getServiceUrl() {
		return serviceUrl;
	}

	public void setServiceUrl(String serviceUrl) {
		this.serviceUrl = serviceUrl;
	}

	public String getLayerName() {
		return layerName;
	}

	public void setLayerName(String layerName) {
		this.layerName = layerName;
	}

	public String getLayerAlias() {
		return layerAlias;
	}

	public void setLayerAlias(String layerAlias) {
		this.layerAlias = layerAlias;
	}

	public String getOriginalServiceUrl() {
		return originalServiceUrl;
	}

	public void setOriginalServiceUrl(String originalServiceUrl) {
		this.originalServiceUrl = originalServiceUrl;
	}

	public int getIdNodeParent() {
		return idNodeParent;
	}

	public void setIdNodeParent(int idNodeParent) {
		this.idNodeParent = idNodeParent;
	}

	public int getChildren() {
		return children;
	}

	public void setChildren(int children) {
		this.children = children;
	}

	public int getIndexOrder() {
		return indexOrder;
	}

	public void setIndexOrder(int indexOrder) {
		this.indexOrder = indexOrder;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getInstitute() {
		return institute;
	}

	public void setInstitute(String institute) {
		this.institute = institute;
	}
	
	public LayerType getLayerType() {
		return layerType;
	}
	
	public void setLayerType(LayerType layerType) {
		this.layerType = layerType;
	}

	public void setReadOnly(boolean readOnly) {
		this.readOnly = readOnly;
	}
	
	public boolean isReadOnly() {
		return readOnly;
	}
	
	public String getSerialId() {
		return serialId;
	}
	
	public void setSerialId(String serialId) {
		this.serialId = serialId;
	}

	public Scenery getScenery() {
		return scenery;
	}

	public void setScenery(Scenery scenery) {
		this.scenery = scenery;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
}
