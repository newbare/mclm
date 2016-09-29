package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

@Entity
@Table(name="node") 
public class Node {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_node")
	private int idNode;

	@Column(length=250, name="node_name")
	private String nodeName;
	
	@Column(length=100)
	private String nodeIcon;
	
	private boolean opened = false;
	
	private boolean disabled = false;
	
	private boolean selected = false;	
	
	@Column(name="root_node")
	private boolean rootNode = false;
	
	@ManyToOne()
	@Cascade(org.hibernate.annotations.CascadeType.ALL)
	@JoinColumn(name="id_parent", foreignKey = @ForeignKey(name = "fk_node_parent"))
	private Node parent;	
	
    @OneToMany(orphanRemoval=true,  mappedBy="parent", fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @OrderBy("nodeName ASC")
    private Set<Node> nodes;
	
	@OneToOne
	@JoinColumn( name="id_data", foreignKey = @ForeignKey(name = "fk_node_data") )
	@Cascade(org.hibernate.annotations.CascadeType.ALL)
	private NodeData nodeData;

	
	public Node() {
		nodes = new HashSet<Node>(); 
		//
	}
	
	public void addChild( Node child ) {
		child.setParent( this );
		nodes.add( child );
	}
	
	public Node(String nodeName, String nodeIcon, boolean disabled, boolean opened, boolean selected ) {
		nodes = new HashSet<Node>(); 
		this.nodeName = nodeName;
		this.nodeIcon = nodeIcon;
		this.disabled = disabled;
		this.opened = opened;
		this.selected = selected;
	}
	
	public int getIdNode() {
		return idNode;
	}

	public void setIdNode(int idNode) {
		this.idNode = idNode;
	}

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNodeIcon() {
		return nodeIcon;
	}

	public void setNodeIcon(String nodeIcon) {
		this.nodeIcon = nodeIcon;
	}

	public Set<Node> getNodes() {
		return nodes;
	}

	public void setNodes(Set<Node> nodes) {
		for ( Node node : nodes ) {
			node.setParent( this );
		}
		this.nodes = nodes;
	}

	public NodeData getNodeData() {
		return nodeData;
	}

	public void setNodeData(NodeData nodeData) {
		this.nodeData = nodeData;
	}

	public Node getParent() {
		return parent;
	}

	public void setParent(Node parent) {
		this.parent = parent;
	}

	public boolean isOpened() {
		return opened;
	}

	public void setOpened(boolean opened) {
		this.opened = opened;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public boolean isRootNode() {
		return rootNode;
	}

	public void setRootNode(boolean rootNode) {
		this.rootNode = rootNode;
	}	    

	
}
