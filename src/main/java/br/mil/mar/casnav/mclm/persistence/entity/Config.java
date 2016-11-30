package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import br.mil.mar.casnav.mclm.misc.User;

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
	private Boolean useProxy = false;
	
	@Column
	private Boolean externalLayersToLocalServer = false;
	
	@Column(length=100, name = "external_workspace_name")
	private String externalWorkspaceName = "ExternalLayers";

	@Column(length=100, name = "proxy_host")
	private String proxyHost;
	
	@Column(length=100, name = "non_proxy_hosts")
	private String nonProxyHosts;
	
	@Column(length=100, name = "shape_file_target_path")
	private String shapeFileTargetPath;

	@Column(length=50, name = "proxy_user")
	private String proxyUser;
	
	@Column(length=50, name = "proxy_password")
	private String proxyPassword;
	
	@Column(name = "proxy_port")
	private Integer proxyPort;
	
	@Column(length=50, name = "geoserver_user")
	private String geoserverUser;

	@Column(length=50, name = "geoserver_password")
	private String geoserverPassword;	
	
	@Column(name = "map_zoom")
	private Integer mapZoom;
	
	@Column(name = "query_factor_radius")
	private Integer queryFactorRadius;

	@Column(name = "map_center")
	private String mapCenter;
	
	public Config() {
		//
	}
	
	@Transient
	private User user;
	
	public Config(int idConfig, String geoserverUrl, String baseLayer, Boolean useProxy,
			Boolean externalLayersToLocalServer, String externalWorkspaceName, String proxyHost, String nonProxyHosts,
			String proxyUser, String proxyPassword, Integer proxyPort, String geoserverUser, String geoserverPassword,
			Integer mapZoom, Integer queryFactorRadius, String mapCenter, String shapeFileTargetPath ) {
		super();
		this.idConfig = idConfig;
		this.geoserverUrl = geoserverUrl;
		this.baseLayer = baseLayer;
		this.useProxy = useProxy;
		this.externalLayersToLocalServer = externalLayersToLocalServer;
		this.externalWorkspaceName = externalWorkspaceName;
		this.proxyHost = proxyHost;
		this.nonProxyHosts = nonProxyHosts;
		this.proxyUser = proxyUser;
		this.proxyPassword = proxyPassword;
		this.proxyPort = proxyPort;
		this.geoserverUser = geoserverUser;
		this.geoserverPassword = geoserverPassword;
		this.mapZoom = mapZoom;
		this.queryFactorRadius = queryFactorRadius;
		this.mapCenter = mapCenter;
		this.shapeFileTargetPath = shapeFileTargetPath;
	}

	public Integer getIdConfig() {
		return idConfig;
	}

	public void setIdConfig(Integer idConfig) {
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

	public void setUseProxy(Boolean useProxy) {
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

	public Integer getProxyPort() {
		return proxyPort;
	}

	public void setProxyPort(Integer proxyPort) {
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

	public Boolean isExternalLayersToLocalServer() {
		return externalLayersToLocalServer;
	}

	public void setExternalLayersToLocalServer(Boolean externalLayersToLocalServer) {
		this.externalLayersToLocalServer = externalLayersToLocalServer;
	}	
	
	public Integer getMapZoom() {
		return mapZoom;
	}
	
	public void setMapZoom(Integer mapZoom) {
		this.mapZoom = mapZoom;
	}
	
	public String getMapCenter() {
		return mapCenter;
	}
	
	public void setMapCenter(String mapCenter) {
		this.mapCenter = mapCenter;
	}
	
	public Integer getQueryFactorRadius() {
		return queryFactorRadius;
	}
	
	public void setQueryFactorRadius(Integer queryFactorRadius) {
		this.queryFactorRadius = queryFactorRadius;
	}


	public String getShapeFileTargetPath() {
		return this.shapeFileTargetPath;

	}

	public void setShapeFileTargetPath(String shapeFileTargetPath) {
		this.shapeFileTargetPath = shapeFileTargetPath;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public User getUser() {
		return user;
	}
	
}
