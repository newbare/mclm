package br.mil.mar.casnav.mclm.misc;

import java.util.UUID;

public class TreeNode {
	private String id;
	private boolean leaf;
	private String Cls;
	private boolean checked;
	private String text;
	private String serviceUrl;
	private String originalServiceUrl;
	private String layerName;
	private String description;
	private String institute;
	private String layerAlias;
	private int index;
	private int idNodeParent;
	private String serialId;
	
	public TreeNode( UserTableEntity ute ) {
		int children = Integer.valueOf( ute.getData("children") );

		this.idNodeParent = Integer.valueOf( ute.getData("id_node_parent") );
		this.index = Integer.valueOf( ute.getData("index_order") );
		this.layerName = ute.getData("layername");
		this.originalServiceUrl = ute.getData("originalserviceurl");
		this.serviceUrl = ute.getData("serviceurl");		
		this.description = ute.getData("description");		
		this.institute = ute.getData("institute");		
		this.layerAlias = ute.getData("layeralias");
		this.serialId = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 10);
		
		this.id = ute.getData("id_node_data");
		this.leaf = ( children == 0 );
		
		if ( this.layerName == null || this.layerName.equals("") ) {
			this.leaf = false;
		}
		
		this.checked = false;
		this.Cls = "";
		this.text =  ute.getData("layeralias");
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCls() {
		return Cls;
	}

	public void setCls(String cls) {
		Cls = cls;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getServiceUrl() {
		return serviceUrl;
	}

	public void setServiceUrl(String serviceUrl) {
		this.serviceUrl = serviceUrl;
	}

	public String getOriginalServiceUrl() {
		return originalServiceUrl;
	}

	public void setOriginalServiceUrl(String originalServiceUrl) {
		this.originalServiceUrl = originalServiceUrl;
	}

	public String getLayerName() {
		return layerName;
	}

	public void setLayerName(String layerName) {
		this.layerName = layerName;
	}


	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getIdNodeParent() {
		return idNodeParent;
	}

	public void setIdNodeParent(int idNodeParent) {
		this.idNodeParent = idNodeParent;
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

	public String getLayerAlias() {
		return layerAlias;
	}

	public void setLayerAlias(String layerAlias) {
		this.layerAlias = layerAlias;
	}

	public String getSerialId() {
		return serialId;
	}
	
	public void setSerialId(String serialId) {
		this.serialId = serialId;
	}
	
}
