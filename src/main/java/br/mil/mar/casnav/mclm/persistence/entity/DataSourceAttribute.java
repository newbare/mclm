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
@Table(name="data_source_attributes") 
public class DataSourceAttribute {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_attribute")
	private int idAttribute;
	
	@ManyToOne()
	@JoinColumn(name="id_data_source", foreignKey = @ForeignKey(name = "fk_data_source"))
	private DataSource dataSource;

	@Column(length=50)
	private String attributePhysicalName;	

	@Column(length=50)
	private String attributeDisplayName;	
	
	@Column(length=50)
	private String dataType;
	
	@Column(length=50)
	private String lookUpField;
	
	@Column(length=50)
	private String lookUpSource;

	public int getIdAttribute() {
		return idAttribute;
	}

	public void setIdAttribute(int idAttribute) {
		this.idAttribute = idAttribute;
	}

	public DataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public String getAttributePhysicalName() {
		return attributePhysicalName;
	}

	public void setAttributePhysicalName(String attributePhysicalName) {
		this.attributePhysicalName = attributePhysicalName;
	}

	public String getAttributeDisplayName() {
		return attributeDisplayName;
	}

	public void setAttributeDisplayName(String attributeDisplayName) {
		this.attributeDisplayName = attributeDisplayName;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getLookUpField() {
		return lookUpField;
	}

	public void setLookUpField(String lookUpField) {
		this.lookUpField = lookUpField;
	}

	public String getLookUpSource() {
		return lookUpSource;
	}

	public void setLookUpSource(String lookUpSource) {
		this.lookUpSource = lookUpSource;
	}	
	
}
