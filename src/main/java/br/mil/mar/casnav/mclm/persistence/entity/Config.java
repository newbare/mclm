package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="config") 
public class Config {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_config")
	private int idConfig;
	
	@Column(length=250)
	private String geoserverUrl;
	
	@Column(length=250)
	private String baseLayer;
	
	@Column
	private boolean useProxy = false;
	
	@Column
	private boolean externalLayersToLocalServer = false;
	
	@Column(length=100, name = "external_workspace_name")
	private String externalWorkspaceName = "ExternalLayers";

	@Column(length=100, name = "proxy_host")
	private String proxyHost;
	
	@Column(length=100, name = "non_proxy_hosts")
	private String nonProxyHosts;

	@Column(length=50, name = "proxy_user")
	private String proxyUser;
	
	@Column(length=50, name = "proxy_password")
	private String proxyPassword;
	
	@Column(name = "proxy_port")
	private int proxyPort;
	
	@Column(length=50, name = "geoserver_user")
	private String geoserverUser;

	@Column(length=50, name = "geoserver_password")
	private String geoserverPassword;	
	
	public int getIdConfig() {
		return idConfig;
	}

	public void setIdConfig(int idConfig) {
		this.idConfig = idConfig;
	}

	public String getGeoserverUrl() {
		return geoserverUrl;
	}

	public void setGeoserverUrl(String geoserverUrl) {
		this.geoserverUrl = geoserverUrl;
	}

	public String getBaseLayer() {
		return baseLayer;
	}

	public void setBaseLayer(String baseLayer) {
		this.baseLayer = baseLayer;
	}

	public boolean isUseProxy() {
		return useProxy;
	}

	public void setUseProxy(boolean useProxy) {
		this.useProxy = useProxy;
	}

	public String getProxyHost() {
		return proxyHost;
	}

	public void setProxyHost(String proxyHost) {
		this.proxyHost = proxyHost;
	}

	public String getProxyUser() {
		return proxyUser;
	}

	public void setProxyUser(String proxyUser) {
		this.proxyUser = proxyUser;
	}

	public String getProxyPassword() {
		return proxyPassword;
	}

	public void setProxyPassword(String proxyPassword) {
		this.proxyPassword = proxyPassword;
	}

	public int getProxyPort() {
		return proxyPort;
	}

	public void setProxyPort(int proxyPort) {
		this.proxyPort = proxyPort;
	}

	public String getGeoserverUser() {
		return geoserverUser;
	}

	public void setGeoserverUser(String geoserverUser) {
		this.geoserverUser = geoserverUser;
	}

	public String getGeoserverPassword() {
		return geoserverPassword;
	}

	public void setGeoserverPassword(String geoserverPassword) {
		this.geoserverPassword = geoserverPassword;
	}

	public String getNonProxyHosts() {
		return nonProxyHosts;
	}

	public void setNonProxyHosts(String nonProxyHosts) {
		this.nonProxyHosts = nonProxyHosts;
	}

	public String getExternalWorkspaceName() {
		return externalWorkspaceName;
	}

	public void setExternalWorkspaceName(String externalWorkspaceName) {
		this.externalWorkspaceName = externalWorkspaceName;
	}

	public boolean isExternalLayersToLocalServer() {
		return externalLayersToLocalServer;
	}

	public void setExternalLayersToLocalServer(boolean externalLayersToLocalServer) {
		this.externalLayersToLocalServer = externalLayersToLocalServer;
	}	
	
	
}
