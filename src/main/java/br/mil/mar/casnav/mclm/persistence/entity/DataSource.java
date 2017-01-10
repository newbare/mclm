package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

@Entity
@Table(name="data_sources") 
public class DataSource {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_data_source")
	private int idDataSource;
	
	@Column(length=250, name="data_source_name")
	private String dataSourceName;	
	
	@Column(length=250, name="table_name")
	private String tableName;	
	
	@Column(length=250)
	private String hint;
	
	@Column(length=250)
	private String database;
	
	@Column(length=250)
	private String whereClause;
	
	@Column(length=250)
	private String geometryColumn;
	
	@Column(length=250)
	private String propertiesColumns;	
	
    @OneToMany(orphanRemoval=true,  mappedBy="dataSource", fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<DataSourceAttribute> attributes;
    
    public DataSource() {
    	this.attributes = new HashSet<DataSourceAttribute>(); 
    }
    
    public DataSource( String dataSourceName, String hint, String tableName, String database, String whereClause, 
    		String geometryColumn, String propertiesColumns ) {
    	this.dataSourceName = dataSourceName;
    	this.hint = hint;
    	this.tableName = tableName;
    	this.database = database;
    	this.propertiesColumns = propertiesColumns;
    	this.whereClause = whereClause;
    	this.geometryColumn = geometryColumn;
    	this.attributes = new HashSet<DataSourceAttribute>();
    }

	public int getIdDataSource() {
		return idDataSource;
	}

	public void setIdDataSource(int idDataSource) {
		this.idDataSource = idDataSource;
	}

	public String getDataSourceName() {
		return dataSourceName;
	}

	public void setDataSourceName(String dataSourceName) {
		this.dataSourceName = dataSourceName;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getHint() {
		return hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}

	public Set<DataSourceAttribute> getAttributes() {
		return attributes;
	}

	public void setAttributes(Set<DataSourceAttribute> attributes) {
		this.attributes = attributes;
	}

	public String getDatabase() {
		return database;
	}

	public void setDatabase(String database) {
		this.database = database;
	}

	public String getWhereClause() {
		return whereClause;
	}

	public void setWhereClause(String whereClause) {
		this.whereClause = whereClause;
	}

	public String getGeometryColumn() {
		return geometryColumn;
	}

	public void setGeometryColumn(String geometryColumn) {
		this.geometryColumn = geometryColumn;
	}

	public String getPropertiesColumns() {
		return propertiesColumns;
	}

	public void setPropertiesColumns(String propertiesColumns) {
		this.propertiesColumns = propertiesColumns;
	}
    
    
    
}
