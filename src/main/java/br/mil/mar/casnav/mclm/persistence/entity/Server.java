package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="servers") 
public class Server {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_server")
	private int idServer;
	
	@Column(length=250)
	private String url;

	@Column(length=250)
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIdServer() {
		return idServer;
	}

	public void setIdServer(int idServer) {
		this.idServer = idServer;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}	
	
	
	
}
