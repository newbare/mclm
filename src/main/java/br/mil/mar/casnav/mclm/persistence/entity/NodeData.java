package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="node_data") 
public class NodeData {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_node_data")
	private int idNodeData;

	@Column(name="id_node_parent")
	private int idNodeParent;

	@Column(name="index_order")
	private int indexOrder;	
	
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

	public NodeData() {
		// TODO Auto-generated constructor stub
	}

	public int getIdNodeData() {
		return idNodeData;
	}

	public void setIdNodeData(int idNodeData) {
		this.idNodeData = idNodeData;
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
	
}
