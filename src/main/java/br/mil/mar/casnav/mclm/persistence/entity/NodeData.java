package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="node_data") 
public class NodeData {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_node_data")
	private int idNodeData;

	@Column(name="id_node_parent")
	private int idNodeParent;
	
	@Column(length=250)
	private String serviceUrl;
	
	@Column(length=250)
	private String originalServiceUrl;

	@Column(length=100)
	private String layerName;
	
	@Column(length=50)
	private String layerAlias;
	
	public NodeData( String serviceUrl, String layerName, String layerAlias, String originalServiceUrl ) {
		this.serviceUrl = serviceUrl;
		this.layerName = layerName;
		this.layerAlias = layerAlias;
		this.originalServiceUrl = originalServiceUrl;
	}

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
	
}
