package br.mil.mar.casnav.mclm.persistence.services;

import java.io.File;
import java.net.URL;
import java.net.URLDecoder;
import java.util.List;

import org.apache.commons.io.FileUtils;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.misc.PathFinder;
import br.mil.mar.casnav.mclm.misc.RESTResponse;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.misc.WebClient;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;

public class LayerService {

	public String getAsFeatureLayer( String tableName, String queryParameter ) throws Exception {
		String sql = "SELECT row_to_json(fc)\\:\\:text As featurecollection " +  
			"FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features " + 
			     "FROM (SELECT 'Feature' As type, " + 
			     "ST_AsGeoJSON( geom )\\:\\:json As geometry, " +  
			     "row_to_json((SELECT l FROM (SELECT \"name\" as nome, adm0_name as pais) As l)) As properties " +  
			     "FROM \"admin1\" As l where adm0_name like '%Brazil%') As f) as fc; ";
		
		String result = "";
		GenericService gs = new GenericService();
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("featurecollection");
		}
		
		System.out.println( result );
		
		//result = "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"geometry\":{\"type\":\"LineString\",\"coordinates\":[[-5696622.36,-3508506.55],[-5696631.28,-3508504.96],[-5696649.14,-3508501.8],[-5696658.06,-3508500.2]]},\"properties\":{\"highway\":\"platform\",\"aeroway\":null,\"railway\":null,\"tunnel\":null}}]}";
		return result;
	}
	
	public String queryLayer( String targetUrl, String layerName ) throws Exception {
		String result = "";
		WebClient wc = new WebClient();
		result = wc.doGet(  URLDecoder.decode( targetUrl, "UTF-8")   ); 
		return result;
	}
	
	public int createWorkspace( String workspaceName ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String serverRESTAPI = geoserverURL + "rest/workspaces/";
	
		StringBuilder postData = new StringBuilder();
		postData.append("<workspace>");
		postData.append("<name>" + workspaceName + "</name>");
		postData.append("</workspace>");
		
		WebClient wc = new WebClient();
		int result = wc.doRESTRequest( "POST", serverRESTAPI, postData.toString(), geoUser, geoPassword );		
			
		return result;
	}
	
	public int addLayerFromWMSStore( String workspaceName, String storeName, String layerName, String sourceLayer ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String serverRESTAPI = geoserverURL + "rest/workspaces/" + workspaceName + "/wmsstores/" + storeName + "/wmslayers/";
		
		/*
			POST /rest/workspaces/<ws>/wmsstores/wms/wmslayers/
			
	        String xml = 
	          "<wmsLayer>"+
	            "<name>bugsites</name>"+
	            "<nativeName>og:bugsites</nativeName>"+
	            "<srs>EPSG:4326</srs>" + 
	            "<nativeCRS>EPSG:4326</nativeCRS>" + 
	            "<store>demo</store>" + 
	            
                <nativeCRS>EPSG:4326</nativeCRS>	
                <srs>EPSG:4326</srs>
                <projectionPolicy>FORCE_DECLARED</projectionPolicy>	            
	            
	          "</wmsLayer>";			
			
		 */
		
		StringBuilder postData = new StringBuilder();
		postData.append("<wmsLayer>");
		postData.append("<name>" + layerName + "</name>");
		postData.append("<nativeName>" + sourceLayer + "</nativeName>");
		postData.append("<store>" + storeName + "</store>");
		postData.append("</wmsLayer>");
		
		WebClient wc = new WebClient();
		int result = wc.doRESTRequest( "POST", serverRESTAPI, postData.toString(), geoUser, geoPassword );		
		return result;		
		
	}
	
	public int deleteLayer( String layerName ) throws Exception {

		if ( layerName.contains(":") ) {
			String[] workspaceAndLayer = layerName.split(":");
			layerName = workspaceAndLayer[1];
        }				
		
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String serverRESTAPI = geoserverURL + "rest/layers/" + layerName + ".xml";
		
		WebClient wc = new WebClient();
		int result = wc.doRESTRequest( "DELETE", serverRESTAPI, "", geoUser, geoPassword );		
		return result;		
		
	}

	
	public int createSHPStore( File file, String storeName, String workspaceName ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String serverRESTAPI = geoserverURL + "rest/workspaces/" + workspaceName + "/datastores/" + storeName + "/file.shp";
		
        int resp = createWorkspace( workspaceName );
        
        if ( resp == RESTResponse.CREATED ) {
        	System.out.println("Workspace Externo " + workspaceName + " criado com sucesso.");
        } else {
        	System.out.println("Erro '"+resp+"' ao criar o Workspace Externo " + workspaceName );
        }		
		
		WebClient wc = new WebClient();
		int result = wc.doPutFile( file, "application/zip", serverRESTAPI, "", geoUser, geoPassword );
		return result;		
		
	}
	

	public int createTIFStore( File file, String storeName, String workspaceName ) throws Exception {
		
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		
        int resp = createWorkspace( workspaceName );

        if ( resp == RESTResponse.CREATED ) {
        	System.out.println("Workspace Externo " + workspaceName + " criado com sucesso.");
        } else {
        	System.out.println("Erro '"+resp+"' ao criar o Workspace Externo " + workspaceName );
        }		

		String serverRESTAPI = geoserverURL + "rest/workspaces/" + workspaceName + "/coveragestores/" + storeName + 
				"/file.geotiff"; // + file.getName();
		
		WebClient wc = new WebClient();
		int result = wc.doPutFile( file, "image/tiff", serverRESTAPI, "", geoUser, geoPassword );

		System.out.println( serverRESTAPI );

		return result;		
	}
		
	
	public int createStoreFromWMSService( String storeName, String targetWorkspace, String capabilitiesURL ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String serverRESTAPI = geoserverURL + "rest/workspaces/" + targetWorkspace + "/wmsstores"; 
		
		StringBuilder postData = new StringBuilder();
		postData.append("<wmsStore>");
		postData.append("<name>" + storeName + "</name>");
		postData.append("<type>WMS</type>");
		postData.append("<enabled>true</enabled>");

		postData.append("<maxConnections>10</maxConnections>");
		postData.append("<connectTimeout>30</connectTimeout>");
		postData.append("<readTimeout>60</readTimeout>");
		
		postData.append("<capabilitiesURL>" + capabilitiesURL + "</capabilitiesURL>");
		postData.append("</wmsStore>");
		
		WebClient wc = new WebClient();
		int result = wc.doRESTRequest( "POST", serverRESTAPI, postData.toString(), geoUser, geoPassword );	
		return result;
	}
	
	
	public String makeExternalLayerLocal( String serverUrl, String layerName ) throws Exception {
		URL source = new URL(serverUrl);
        String newStoreName = source.getHost().replaceAll("/", "").replace("wmslayers", "").replaceAll("\\.", "_");		
		
        Configurator cfg = Configurator.getInstance();
		//String geoserverURL = cfg.getGeoserverUrl();
		String externalWorkspaceName = cfg.getExternalWorkspaceName();        
        
        // Tenta criar o Workspace padrao para camadas externas. Ignora se jah existir.
        int resp = createWorkspace( externalWorkspaceName );
        
        if ( resp == RESTResponse.CREATED ) {
        	System.out.println("Workspace Externo " + externalWorkspaceName + " criado com sucesso.");
        } else {
        	System.out.println("Erro '"+resp+"' ao criar o Workspace Externo " + externalWorkspaceName );
        }
        
        
        // Tenta criar o WMS Store ...
		int res = createStoreFromWMSService( newStoreName, externalWorkspaceName, serverUrl );
		
		if ( res != RESTResponse.CREATED ) {
			System.out.println( "Erro " + res + " recebido pelo GeoServer ao criar novo Store '"+newStoreName+"' para o serviço externo WMS." );
			//throw new Exception( "Erro " + res + " recebido pelo GeoServer ao criar novo Store '"+newStoreName+"' para o serviço externo WMS." );
		} else {
			System.out.println( "Store '"+newStoreName+"' criado no Workspace " + externalWorkspaceName );
		}
		
		
		// Tenta criar a camada WMS...
		String sourceLayer = layerName;
		if ( sourceLayer.contains(":") ) {
			String[] workspaceAndLayer = sourceLayer.split(":");
            //String workspace = workspaceAndLayer[0];
			layerName = workspaceAndLayer[1];
        }

		res = addLayerFromWMSStore( externalWorkspaceName, newStoreName, layerName, sourceLayer );		
		
		if ( res != RESTResponse.CREATED ) {
			System.out.println("Erro ao criar camada " + layerName + " no store/workspace " + newStoreName + "/" + externalWorkspaceName + " a partir da camada externa " + sourceLayer);
		} else {
			System.out.println("Sucesso ao criar camada " + layerName + " no store/workspace " + newStoreName + "/" + externalWorkspaceName + " a partir da camada externa " + sourceLayer);
		}
		
		String result = externalWorkspaceName + ":" + layerName;
        return result;
	}
	
	
    // Cria uma camada WMS
	public String createWMSLayer(int layerFolderID, String serverUrl, String description, String institute,
			String layerName, String layerAlias) {

        if ( !serverUrl.contains("/wms") ) serverUrl = serverUrl + "/wms/";
    	if ( !serverUrl.endsWith("/") ) serverUrl = serverUrl + "/";
		
		String result = "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
		try {
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, serverUrl, description, institute, layerName, layerAlias, LayerType.WMS);
			
	        Configurator cfg = Configurator.getInstance();
	        String originalServer = node.getOriginalServiceUrl(); 
	        
	    	node.setOriginalServiceUrl( originalServer );        
	        if ( cfg.isExternalLayersToLocalServer() ) {
	        	// Transferir a camada para o servidor geoserver base
	        	// Transfere para local. Seta a URL de servico como a mesma URL, mas trocando o servidor.
	        	String newLayerName = makeExternalLayerLocal( serverUrl, layerName);
	        	node.setServiceUrl( cfg.getGeoserverUrl() );
	        	node.setLayerName( newLayerName );
	        } else {
	        	// Nao transfere para local. Seta a URL de servico como a ariginal.
	        	node.setServiceUrl( node.getOriginalServiceUrl() );
	        }
			
			ns.addNode( node );	
		} catch ( Exception ex ) {
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		return result;
	}

	public String createSHPLayer(String shpFileContentType, File shpFile, String shpFileFileName, String layerAlias,
			String description, String institute, int layerFolderID) {

		try {
			Configurator cfg = Configurator.getInstance();
			String serverUrl = cfg.getGeoserverUrl();
			String externalWorkspaceName = cfg.getExternalWorkspaceName();
			String storeName = shpFileFileName.replace(".zip", "");
			String layerName = cfg.getExternalWorkspaceName() + ":" + storeName; 
			
			String saveDirectory = Configurator.getInstance().getShapeFileTargetPath();
			File destFile = new File( saveDirectory + File.separator + shpFileFileName );
			FileUtils.copyFile(shpFile, destFile);

			createSHPStore(destFile, storeName, externalWorkspaceName);
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "", description, institute, layerName, layerAlias, LayerType.SHP);
			node.setServiceUrl( serverUrl );
			ns.addNode( node );
			
			return "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
		} catch ( Exception e ) {
			return "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";	
		}
		 
	}

	public String createKMLLayer(String kmlFileContentType, File kmlFile, String kmlFileFileName, String layerAlias,
			String description, String institute, int layerFolderID) {

		try {
			
			Configurator cfg = Configurator.getInstance();
			String storeName = kmlFileFileName.replace(".zip", "");
			String layerName = cfg.getExternalWorkspaceName() + ":" + storeName; 
			
			String saveDirectory = PathFinder.getInstance().getPath() + "/kmlFolderStorage"; 
			
			File destFile = new File( saveDirectory + File.separator + kmlFileFileName );
			FileUtils.copyFile(kmlFile, destFile);
		
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "" , description, institute, layerName, layerAlias, LayerType.KML);
			node.setServiceUrl( "kmlFolderStorage/" + kmlFileFileName );
			ns.addNode( node );		
			
			
			return "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
		} catch ( Exception e ) {
			return "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";	
		}
		
	}

	
	public String createTIFLayer(String tifFileContentType, File tifFile, String tifFileFileName, String layerAlias,
			String description, String institute, int layerFolderID) {
		
		try {
			Configurator cfg = Configurator.getInstance();
			String serverUrl = cfg.getGeoserverUrl();
			String storeName = tifFileFileName.replace(".tiff", "").replace(".tif", "");
			String externalWorkspaceName = cfg.getExternalWorkspaceName();
			String layerName = externalWorkspaceName + ":" + storeName; 
			
			String saveDirectory = Configurator.getInstance().getShapeFileTargetPath();
			//String saveDirectory = PathFinder.getInstance().getPath() + "/kmlFolderStorage";

			File destFile = new File( saveDirectory + File.separator + tifFileFileName );
			FileUtils.copyFile(tifFile, destFile);

			createTIFStore(destFile, storeName, externalWorkspaceName);
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "", description, institute, layerName, layerAlias, LayerType.TIF);
			node.setServiceUrl( serverUrl );
			ns.addNode( node );			
			
			destFile.delete();
			
			return "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
		} catch ( Exception e ) {
			return "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";	
		}

		
	}	
	
}
