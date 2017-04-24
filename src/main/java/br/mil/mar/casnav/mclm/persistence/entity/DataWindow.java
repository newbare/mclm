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
    
    
}
