package br.mil.mar.casnav.mclm.misc;

import java.io.InputStream;
import java.net.Authenticator;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import br.mil.mar.casnav.mclm.persistence.entity.Config;



public class Configurator {
	private Document doc;
	private static Configurator instance;
	private String userName;
	private String password;
	private String databaseName;
	private Config config;

	public void setJavaProxy() throws Exception {
		if ( !useProxy() ) return;		
		String proxyHost = getProxyHost();
		String proxyUser = getProxyUser();
		String proxyPassword = getProxyPassword();
		String nonProxyHosts = getNonProxyHosts();
		String proxyPort = String.valueOf( getProxyPort() );
		Authenticator.setDefault( new SimpleAuthenticator( proxyUser, proxyPassword ) );		
		Properties systemProperties = System.getProperties();
		systemProperties.setProperty("http.proxyHost", proxyHost);
		systemProperties.setProperty("http.proxyPort", proxyPort);
		systemProperties.setProperty("https.proxyHost", proxyHost);
		systemProperties.setProperty("https.proxyPort", proxyPort);
		systemProperties.setProperty("http.nonProxyHosts", nonProxyHosts);
	}

	public void updateConfiguration( Config config ) throws Exception {
		this.config = config;
		setJavaProxy();
	}
	
	public String getExternalWorkspaceName() {
		return config.getExternalWorkspaceName();
	}

	public String getGeoserverUser() {
		return config.getGeoserverUser();
	}
	
	public String getNonProxyHosts() {
		return config.getNonProxyHosts();
	}

	public String getGeoserverPassword() {
		return config.getGeoserverPassword();
	}
	
	public int getProxyPort() {
		return config.getProxyPort();
	}
	
	public String getProxyHost() {
		return config.getProxyHost();
	}
	
	public String getProxyUser() {
		return config.getProxyUser();
	}
	
	public String getProxyPassword() {
		return config.getProxyPassword();
	}
	
	public boolean useProxy() {
		return config.isUseProxy();
	}

	public String getBaseLayer() {
		return config.getBaseLayer();
	}
	
	public String getGeoserverUrl() {
		return config.getGeoserverUrl();
	}
	
	public String getUserName() {
		return userName;
	}
	
	public String getDatabaseName() {
		return databaseName;
	}
	
	public String getPassword() {
		return password;
	}
	
	private String getTagValue(String sTag, Element eElement) throws Exception{
		try {
			NodeList nlList = eElement.getElementsByTagName(sTag).item(0).getChildNodes();
	        Node nValue = (Node) nlList.item(0);
			return nValue.getNodeValue();
		} catch ( Exception e ) {
			System.out.println("Error: Element " + sTag + " not found in configuration file.");
			throw e;
		}
	}
	
	public String getValue(String container, String tagName) {
		String tagValue = "";
		try {
			NodeList postgis = doc.getElementsByTagName(container);
			Node pgconfig = postgis.item(0);
			Element pgElement = (Element) pgconfig;
			tagValue = getTagValue(tagName, pgElement) ; 
		} catch ( Exception e ) {
		}
		return tagValue;
	}

	public static Configurator getInstance() throws Exception {
		if ( instance == null ) {
			throw new Exception("Configurator not initialized");
		}
		return instance;
	}
	
	public Config getConfig() {
		return config;
	}
	
	public boolean isExternalLayersToLocalServer() {
		return config.isExternalLayersToLocalServer();
	}
	
	public static Configurator getInstance( String file ) throws Exception {
		if ( instance == null ) {
			instance = new Configurator(file);
		}
		return instance;
	}
	
	private Configurator(String file) throws Exception {
		try {
			
			// Load only database parameters...
			InputStream is = this.getClass().getClassLoader().getResourceAsStream(file);
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			doc = dBuilder.parse(is);
			doc.getDocumentElement().normalize();
			loadMainConfig();
		} catch (Exception e) {
			System.out.println("Error: XML file " + file + " not found.");
		}			
	}
	
	
	public void loadMainConfig()  {
		NodeList mapconfig = doc.getElementsByTagName("geoexplorer");
		Node mpconfig = mapconfig.item(0);
		Element mpElement = (Element) mpconfig;
		try {
			
			//firstDelayLimitSeconds = Long.valueOf( getTagValue("firstDelayLimitSeconds", mpElement) );
			//CSVDelimiter = getTagValue("CSVDelimiter", mpElement).charAt(0);
			
			userName = getTagValue("userName", mpElement);
			password = getTagValue("password", mpElement);
			databaseName = getTagValue("databaseName", mpElement);

			/*
			geoserverUrl = getTagValue("geoserverUrl", mpElement);
			baseLayer = getTagValue("baseLayer", mpElement);
			useProxy = Boolean.valueOf( getTagValue("useProxy", mpElement).toLowerCase() );
			proxyHost = getTagValue("proxyHost", mpElement);
			proxyUser = getTagValue("proxyUser", mpElement);
			proxyPassword = getTagValue("proxyPassword", mpElement);
			geoserverUser = getTagValue("geoserverUser", mpElement);
			geoserverPassword = getTagValue("geoserverPassword", mpElement);
			proxyPort = Integer.valueOf( getTagValue("proxyPort", mpElement) );
			*/
			
		} catch ( Exception e ) {
			System.out.println( e.getMessage() );
		}
	}

}
