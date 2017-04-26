package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.List;

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
@Table(name="data_window") 
public class DataWindow {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_data_window")
	private int idDataWindow;
	
    @OneToMany(orphanRemoval=true,  mappedBy="dataWindow", fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<DataPanel> dataPanels;		
	
	@Column(length=250, name="name")
	private String dataWindowName;	
	
	@Column(length=100, name = "source_server")
	private String sourceServer;
	
	@Column(length=100, name = "source_user")
	private String sourceUser;
	
	@Column(length=100, name = "source_password")
	private String sourcePassword;
	
	@Column(length=100, name = "source_database")
	private String sourceDatabase;

	@Column(name = "source_port")
	private Integer sourcePort; 
	
	@Column(length=100, name = "source_table")
	private String sourceTable;	
	
    public DataWindow() {
    	
    }

	public int getIdDataWindow() {
		return idDataWindow;
	}

	public void setIdDataWindow(int idDataWindow) {
		this.idDataWindow = idDataWindow;
	}

	public List<DataPanel> getDataPanels() {
		return dataPanels;
	}

	public void setDataPanels(List<DataPanel> dataPanels) {
		this.dataPanels = dataPanels;
	}

	public String getDataWindowName() {
		return dataWindowName;
	}

	public void setDataWindowName(String dataWindowName) {
		this.dataWindowName = dataWindowName;
	}

	public String getSourceServer() {
		return sourceServer;
	}

	public void setSourceServer(String sourceServer) {
		this.sourceServer = sourceServer;
	}

	public String getSourceUser() {
		return sourceUser;
	}

	public void setSourceUser(String sourceUser) {
		this.sourceUser = sourceUser;
	}

	public String getSourcePassword() {
		return sourcePassword;
	}

	public void setSourcePassword(String sourcePassword) {
		this.sourcePassword = sourcePassword;
	}

	public String getSourceDatabase() {
		return sourceDatabase;
	}

	public void setSourceDatabase(String sourceDatabase) {
		this.sourceDatabase = sourceDatabase;
	}

	public Integer getSourcePort() {
		return sourcePort;
	}

	public void setSourcePort(Integer sourcePort) {
		this.sourcePort = sourcePort;
	}

	public String getSourceTable() {
		return sourceTable;
	}

	public void setSourceTable(String sourceTable) {
		this.sourceTable = sourceTable;
	}
    
    
}
