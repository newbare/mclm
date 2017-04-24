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
@Table(name="data_panel") 
public class DataPanel {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_data_panel")
	private int idDataPanel;
	
	@ManyToOne()
	@JoinColumn(name="id_data_window", foreignKey = @ForeignKey(name = "fk_datapanel_dataWindow"))
	private DataWindow dataWindow;	
	
	@Column(length=250, name="name")
	private String dataPanelName;	
	
    public DataPanel() {
    	
    }

	public int getIdDataPanel() {
		return idDataPanel;
	}

	public void setIdDataPanel(int idDataPanel) {
		this.idDataPanel = idDataPanel;
	}

	public DataWindow getDataWindow() {
		return dataWindow;
	}

	public void setDataWindow(DataWindow dataWindow) {
		this.dataWindow = dataWindow;
	}

	public String getDataPanelName() {
		return dataPanelName;
	}

	public void setDataPanelName(String dataPanelName) {
		this.dataPanelName = dataPanelName;
	}
    

    
}
