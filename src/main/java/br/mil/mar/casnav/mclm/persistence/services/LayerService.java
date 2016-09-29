package br.mil.mar.casnav.mclm.persistence.services;

import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.WebClient;
import br.mil.mar.casnav.mclm.persistence.entity.Node;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;

public class LayerService {
	
	public int addLayerFromWMSStore( String workspaceName, String storeName, String layerName, String sourceLayer ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl();
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
	          "</wmsLayer>";			
			
		 */
		
		System.out.println( "LayerService:addLayerFromWMSStore >> " + serverRESTAPI + " ::: " + layerName );
		
		StringBuilder postData = new StringBuilder();
		postData.append("<wmsLayer>");
		postData.append("<name>" + layerName + "</name>");
		postData.append("<nativeName>" + sourceLayer + "</nativeName>");
		postData.append("<store>" + storeName + "</store>");
		postData.append("</wmsLayer>");
		
		WebClient wc = new WebClient();
		int result = wc.doPostStream( serverRESTAPI, postData.toString(), geoUser, geoPassword );		
		return result;		
		
	}
	
	public int createStoreFromWMSService( String storeName, String targetWorkspace, String capabilitiesURL, String sourceWorkspace ) throws Exception {
		/*
		POST /rest/workspaces/<ws>/wmsstores
		<wmsStore>
		   <name>wms</name>
		   <capabilitiesURL>http://somehost/wms?</capabilitiesURL>
		   <workspace>sf</workspace>
		</wmsStore>		
		*/
		
		Configurator cfg = Configurator.getInstance();
		String geoserverURL = cfg.getGeoserverUrl();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String serverRESTAPI = geoserverURL + "rest/workspaces/" + targetWorkspace + "/wmsstores"; 
		
		StringBuilder postData = new StringBuilder();
		postData.append("<wmsStore>");
		postData.append("<name>" + storeName + "</name>");
		postData.append("<type>WMS</type>");
		postData.append("<enabled>true</enabled>");
		postData.append("<capabilitiesURL>" + capabilitiesURL + "</capabilitiesURL>");
		postData.append("<workspace>" + sourceWorkspace + "</workspace>");
		postData.append("</wmsStore>");
		
		WebClient wc = new WebClient();
		int result = wc.doPostStream( serverRESTAPI, postData.toString(), geoUser, geoPassword );	
		return result;
		// 201 Created
		// 500 Internal Server Error ( when already exists )
	}
	
	
	public String addLayer( String name, String layerUrl, String position, String layerAlias ) throws Exception {
        // String layerUrl = "http://www.geoservicos.ibge.gov.br/geoserver/CREN/wms?service=WMS&version=1.1.0&request=GetMap&layers=CREN:VegetacaoSB23&styles=&bbox=-48.0,-8.0,-42.0,-4.0&width=512&height=341&srs=EPSG:4326&format=application/openlayers";
        // http://www.geoservicos.ibge.gov.br/geoserver/CREN/wms?service=WMS&version=1.1.0&request=GetMap&layers=HidrogeologiaRegiaoNE&styles=&bbox=-48.7548781624409,-18.3285960784592,-34.7876206717412,-1.04481255968164&width=413&height=512&srs=EPSG:4674&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CREN/wms?service=WMS&version=1.1.0&request=GetMap&layers=CREN:ClimadoBrasil_5000&styles=&bbox=-73.98,-35.808,-25.746,7.052&width=512&height=454&srs=EPSG:4326&format=application/openlayers
		
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:C01_RazaodeSexo_2010&styles=&bbox=-180.0,-90.0,180.000000335276,83.6236001622701&width=684&height=330&srs=EPSG:4326&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:C01_OrigemTotNaturalizadosBrasilEEstrangResidenciaPais_2010&styles=&bbox=-180.0,-90.0,180.000000335276,83.6236001622701&width=684&height=330&srs=EPSG:4326&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:C02_mesorregioes_2010&styles=&bbox=-73.9904499691907,-33.7520812703344,-28.8360947066054,5.27184107680427&width=512&height=442&srs=EPSG:4674&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:C04_DensidPop2010_RJ&styles=&bbox=-44.8893205514883,-23.368931962919,-40.9585185184327,-20.7632054617492&width=512&height=339&srs=EPSG:4674&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:C04_TerraIndigena&styles=&bbox=-73.7290723235183,-31.2007846607761,-34.9268373478991,5.27786363549871&width=512&height=481&srs=EPSG:4674&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:AtlasMar_Fisiografia&styles=&bbox=-54.00341796875,-40.0073127746582,-16.1963157653809,11.0001220703125&width=379&height=512&srs=EPSG:4674&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:AtlasMar_Topografia_Atlantico&styles=&bbox=-58.25675693484129,-57.75160350479054,7.707320360344156,34.5714487622609&width=365&height=512&srs=EPSG:4326&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:AtlasMar_Vento_Inverno&styles=&bbox=-57.971666063879354,-34.56678890485409,-22.511190217234322,9.027560882417106&width=416&height=512&srs=EPSG:4326&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:AtlasMar_Morfologia&styles=&bbox=-59.924983313767086,-37.694538462122495,-23.83859091053104,9.522701821289331&width=391&height=512&srs=EPSG:4326&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:AtlasMar_Vento_Outono&styles=&bbox=-57.971666063879354,-34.56678890485409,-22.511190217234322,9.027560882417106&width=416&height=512&srs=EPSG:4326&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:ANMS2010_03_jaz_minerais&styles=&bbox=-71.5042562567704,-31.9439865052924,-34.9251159328291,4.90107362410187&width=508&height=512&srs=EPSG:4674&format=application/openlayers
		// http://www.geoservicos.ibge.gov.br/geoserver/CREN/wms?service=WMS&version=1.1.0&request=GetMap&layers=HidroquimicaSubterraneaRegiaoNE&styles=&bbox=-48.7548781624628,-18.3285960779782,-34.7876206711965,-1.04481255968164&width=413&height=512&srs=EPSG:4674&format=application/openlayers
		
		//"http://www.geoservicos.ibge.gov.br/geoserver/wms"
		
		/*
			// addLayerFromUrl?targetWorkspace=teste&sourceWorkspace=CREN&capabilitiesURL=http://www.geoservicos.ibge.gov.br/geoserver/wms
	
			String storeName = "external";
			String layerName = "CCAR:BC250_Atracadouro_L";
			
			String result = ls.addLayerFromWMSStore(targetWorkspace, storeName, layerName);
			result = ls.createStoreFromWMSService(storeName, "ExternalLayers", capabilitiesURL, sourceWorkspace);
		*/
		
				
		
		String result = "";
		
		URL source = new URL(layerUrl);
        Map<String, List<String>> url = splitQuery( source );
        String host = source.getHost().replaceAll("/", "").replace("wmslayers", "").replaceAll("\\.", "_");
        
        int iend = layerUrl.indexOf("?");
        if (iend != -1) {
            String hostUrl= layerUrl.substring(0 , iend) + "?";
            String originalUrl = hostUrl;
            String newStoreName = host;
            
            String layerName = url.get("layers").get(0);
            String[] workspaceAndLayer= layerName.split(":");
            String workspace = workspaceAndLayer[0];
            String onlyLayer = workspaceAndLayer[1];
	         
            /*
            String service = url.get("service").get(0);
            String version = url.get("version").get(0);
            String request = url.get("request").get(0);
            hostUrl = hostUrl + "service=" + service;
            hostUrl = hostUrl + "&version=" + version;
            hostUrl = hostUrl + "&request=" + request;           
            hostUrl = hostUrl + "&layers=" + layerName;  
            System.out.println(" >>>> " + hostUrl  );
           	*/
            Configurator cfg = Configurator.getInstance();
            if ( cfg.isExternalLayersToLocalServer() ) {
        		
        		String geoserverURL = cfg.getGeoserverUrl();
        		String externalWorkspaceName = cfg.getExternalWorkspaceName();
        		
        		
        		int res = createStoreFromWMSService( newStoreName, externalWorkspaceName, originalUrl, workspace );
        		if ( res != 201 ) {
        			System.out.println("Error " + res + " received from GeoServer REST API when creating Store from external WMS Service");
        		} 
        		
    			res = addLayerFromWMSStore( externalWorkspaceName, newStoreName, onlyLayer, layerName );
    			if ( res != 201 ) {
        			throw new Exception("Error " + res + " received from GeoServer REST API when creating layer '" + layerName + "' from external Store '" + newStoreName + "'");
    			} else {
    				System.out.println(">>>>>>>>>>>>>>> ALL SUCCESS !!");
    			}
    			
    			layerName = onlyLayer;
        		hostUrl = geoserverURL + externalWorkspaceName + ":" + layerName + "/wms";
            }
            
            /*
			NodeService ns = new NodeService();
			Node categoria = null;
			Node sub1 = new Node( name , "external", false, false, false);
			NodeData layer1 = new NodeData( hostUrl, layerName, layerAlias, originalUrl );
			sub1.setRootNode( false );
			sub1.setNodeData(layer1);
			
			JSTree jst = new JSTree();
			
			try {
				// Case 01: Parent exists. Get it from database and append the new node.
				categoria = ns.getNode( position );
				categoria.addChild( sub1 );
				ns.newTransaction();
				ns.insertNode( sub1 );
				result = jst.getJSNodeFromDataNode(sub1, categoria);
				
			} catch ( NotFoundException ignored ) {
				// Case 02: Parent not exists. Create a parent node and append the new node
				ns.newTransaction();
				Node root = ns.getRoot();
				categoria = new Node( position , "default", false, false, false);
				categoria.addChild( sub1 );
				root.addChild( categoria );
				ns.newTransaction();
				ns.insertNode(categoria);
				result = jst.getJSNodeFromDataNode(categoria, null);
			}            
			*/
            
            
            /*
            for ( Entry<String, List<String>> e : url.entrySet()) {
                String key    = e.getKey();
                List<String> values  = e.getValue();

                String value = values.get(0);

                System.out.println(" " + key + "=" + value);

            }
            */
        }
        
        return result;
	}
	
	
    public Map<String, List<String>> splitQuery(URL url) throws UnsupportedEncodingException {
        Map<String, List<String>> query_pairs = new LinkedHashMap<String, List<String>>();
        String[] pairs = url.getQuery().split("&");
        for (String pair : pairs) {
            int idx = pair.indexOf("=");
            String key = idx > 0 ? URLDecoder.decode(pair.substring(0, idx), "UTF-8") : pair;
            if (!query_pairs.containsKey(key)) {
                query_pairs.put(key, new LinkedList<String>());
            }
            String value = idx > 0 && pair.length() > idx + 1 ? URLDecoder.decode(pair.substring(idx + 1), "UTF-8") : null;
            query_pairs.get(key).add(value);
        }
        return query_pairs;
    }	
	
}
