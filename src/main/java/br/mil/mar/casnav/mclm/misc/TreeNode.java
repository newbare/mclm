package br.mil.mar.casnav.mclm.misc;

import br.mil.mar.casnav.mclm.persistence.entity.NodeData;

public class TreeNode {
	private String id;
	private String leaf;
	private String Cls;
	private String selected;
	private String text;
	
	public TreeNode( NodeData data ) {
		this.id = String.valueOf( data.getIdNodeData() );
		this.leaf = "false";
		this.selected = "false";
		this.Cls = "";
		this.text = data.getLayerAlias();
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

	public String getLeaf() {
		return leaf;
	}

	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}

	public String getCls() {
		return Cls;
	}

	public void setCls(String cls) {
		Cls = cls;
	}

	public String getSelected() {
		return selected;
	}

	public void setSelected(String selected) {
		this.selected = selected;
	}
	
	
	
}
