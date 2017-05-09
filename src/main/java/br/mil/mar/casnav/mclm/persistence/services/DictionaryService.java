package br.mil.mar.casnav.mclm.persistence.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.conn.HttpHostConnectException;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.misc.WebClient;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayer;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayerAttribute;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayersSchema;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.DictionaryItem;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.repository.DictionaryRepository;

public class DictionaryService {
	
	private DictionaryRepository rep;
	
	public DictionaryService() throws DatabaseConnectException {
		this.rep = new DictionaryRepository();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
		
	public String getListAsJson( int idNodeData, String layerName, String serviceUrl ) throws Exception {
		List<DictionaryItem> items = getDictionary( idNodeData );
		String result = "";
		
		for ( DictionaryItem item : items ) {
			item.getNode().setDataLayer( null );
			item.getNode().setDataWindow( null );
		}
		
		try {
			JSONArray arrayObj = new JSONArray( items );
			result = arrayObj.toString();
		} catch ( Exception e  ) {
			e.printStackTrace();
		}
		
		return result;
	}	
	
	public List<DictionaryItem> getListByLayer( String layerName ) throws Exception {
		return rep.getListByLayer(layerName);
	}
	
	public List<DictionaryItem> getDictionary( int idNodeData ) throws Exception {
		List<DictionaryItem> result = rep.getList( idNodeData );
		return result;
	}
	
	public int updateDictionary( NodeData node ) throws Exception {
		String layerName = node.getLayerName();
		String serviceUrl = node.getServiceUrl();
		int result = 0;
		
		if ( node.getLayerType() == LayerType.DTA ) {
			System.out.println("Atualizando dicionário para [" + node.getLayerType() + "] " + node.getLayerAlias() + "..." );
						
			try {
				DataLayer dl = node.getDataLayer();
				
				int serverPort = dl.getTable().getServer().getServerPort();
				String serverAddress = dl.getTable().getServer().getServerAddress();
				String databaseName = dl.getTable().getServer().getServerDatabase();
				String password = dl.getTable().getServer().getServerPassword();
				String user = dl.getTable().getServer().getServerUser();
				String tableName = dl.getTable().getName();
				//String whereClause = dl.getWhereClause();
				String columns = dl.getPropertiesColumns();
				//String schemaName = "";
				
				// Tenta remover o nome do esquema
				if ( tableName.contains(".") ) {
					String data1[] = tableName.split("\\.");
					//schemaName = data1[0];
					tableName = data1[1];
				}
				
				List<UserTableEntity> utes = getSchema( tableName, serverAddress, serverPort, databaseName, user, password,  columns  );
				result = utes.size();
				
				for( UserTableEntity ute : utes ) {
					String columnName = "";
					String dataType = "";
					
					for( String key : ute.getColumnNames() ) {
						String value = ute.getData( key );
						if( key.equals("column_name") ) columnName = value;
						if( key.equals("data_type") ) dataType = value;						
					}
					
					DictionaryItem di = new DictionaryItem( columnName, dataType, node );
					
					newTransaction();
					rep.insertItem( di );				
				}
				
				

			} catch (Exception e) {
				e.printStackTrace();
			}
			
		} else
		
		if ( node.getLayerType() == LayerType.WMS ) {
			//System.out.println("Atualizando dicionário para [" + node.getLayerType() + "] " + node.getLayerAlias() + "..." );
			GeoserverLayersSchema schema = null;
			try {
				schema = getLayerAttributeSchema( layerName, serviceUrl );
			} catch ( HttpHostConnectException ex ) {
				//System.out.println(" > conexao com '" + serviceUrl + "' excedeu o tempo limite");
			}
			
			if ( schema == null ) {
				//System.out.println(" > impossivel obter esquema de '" + serviceUrl );
				return 0;
			}
			
			if ( schema.getFeatureTypes().size() > 0 ) {
				// Especifiquei a camada, entao so virah um layer no resultado
				GeoserverLayer layer = schema.getFeatureTypes().get(0);
				result = layer.getProperties().size();
				// Para cada attributo deste layer, crio um item de dicionario associado ao Node...
				for ( GeoserverLayerAttribute attribute : layer.getProperties() ) {
					DictionaryItem di = new DictionaryItem( attribute, node );
					newTransaction();
					rep.insertItem( di );
				}
			}
		} else {
			//System.out.println(" > tipo de Camada '" + node.getLayerType() + "' não suporta dicionário.");
		}
		
		return result;
	}
	
	public String getSchemaAsJson ( String tableName, String serverAddress, int serverPort, String databaseName, 
			String user, String password )  throws Exception {
	
		if ( tableName.contains(".") ) {
			String data1[] = tableName.split("\\.");
			tableName = data1[1];
		}		
		
		List<UserTableEntity> utes = getSchema( tableName, serverAddress, serverPort, databaseName,  user, password, "*" );
		
		JSONArray arr = new JSONArray( utes );
		return arr.toString();
	}
	
	public List<UserTableEntity> getSchema( String tableName, String serverAddress, int serverPort, String databaseName, 
			String user, String password, String columns  )  throws Exception {
		System.out.println("Lendo esquema da tabela tabela '" + tableName + "' em " + serverAddress + ":" + serverPort + "/" + databaseName );

		String query = "SELECT column_name,data_type FROM information_schema.columns WHERE table_name = '"+tableName+"' order by column_name"; // table_schema = 'public'

		String connectionString = "jdbc:postgresql://" + serverAddress + ":" + serverPort + "/" + databaseName;
		GenericService gs = new GenericService( connectionString, user,	password  );

		List<UserTableEntity> schma = gs.genericFetchList(query);
		List<UserTableEntity> result = new ArrayList<UserTableEntity>();

		columns = " " + columns.replace("\"", " ").replace(",", " ") + " ";
		
		for( UserTableEntity ute : schma ) {
			
			String columnName = "";
			//String dataType = "";
			for( String key : ute.getColumnNames() ) {
				String value = ute.getData( key );
				if( key.equals("column_name") ) columnName = value;
				//if( key.equals("data_type") ) dataType = value;						
			}
			
			if ( columns.equals("*") ) {
				result.add( ute );				
			} else
				if ( columns.contains( " " + columnName + " " ) ) {
					result.add( ute );
				}
			
		}		
		
		System.out.println(">> Resultado: " + result.size() + " elementos.");
		return result;
	
	}
	
	/*
	public void listSchema( PostgresTable table, String whereClause, String columns ) throws Exception {
		int serverPort = table.getServer().getServerPort();
		String serverAddress = table.getServer().getServerAddress();
		String databaseName = table.getServer().getServerDatabase();
		String password = table.getServer().getServerPassword();
		String user = table.getServer().getServerUser();
		String tableName = table.getName();
		
		DictionaryService ds = new DictionaryService();
		List<UserTableEntity> utes = ds.getSchema( tableName, serverAddress, serverPort, databaseName, user, password, whereClause, columns  );
		for( UserTableEntity ute : utes ) {
			String columnName = "";
			String dataType = "";
			for( String key : ute.getColumnNames() ) {
				String value = ute.getData( key );
				if( key.equals("column_name") ) columnName = value;
				if( key.equals("data_type") ) dataType = value;						
			}
			System.out.println( columnName + "  " + dataType);
		}
		
	}
	*/
	
	public GeoserverLayersSchema getAllGeoserverAttributeSchema( ) throws Exception {
		String jsonSchema = getAllGeoserverAttributeSchemaAsJson( );
		Gson gson = new GsonBuilder().create();
		GeoserverLayersSchema schema = gson.fromJson( jsonSchema , GeoserverLayersSchema.class);
		return schema;
	}
	
	public String getAllGeoserverAttributeSchemaAsJson( ) throws Exception {
		String result = "";
		Config cfg = Configurator.getInstance().getConfig();
		String geoServer = cfg.getGeoserverUrl();
		String url = geoServer + "wfs?request=describeFeatureType&outputFormat=application/json";
		WebClient wc = new WebClient();
		result = wc.doGet( url );
		return result;
	}
	
	
	public GeoserverLayersSchema getLayerAttributeSchema( String layerName, String serviceUrl ) throws Exception {
		GeoserverLayersSchema schema = null;	
		String jsonSchema = getLayerAttributeSchemaAsJson( layerName, serviceUrl );
		
		try {
			Gson gson = new GsonBuilder().create();
			schema = gson.fromJson( jsonSchema , GeoserverLayersSchema.class);
		} catch ( Exception e ) {
			System.out.println("Erro ao converter JSON: ");
			System.out.println( jsonSchema );
		}
		return schema;
	}
	
	public String getLayerAttributeSchemaAsJson( String layerName, String serviceUrl ) throws Exception {
		/*
		 	http://10.5.115.122/geoserver/wfs?request=describeFeatureType&typename=osm:admin0&outputFormat=application/json 
		*/
		String result = "";
		String url = serviceUrl + "wfs?request=describeFeatureType&outputFormat=application/json&typename=" + layerName;
		WebClient wc = new WebClient();
		result = wc.doGet( url );
		return result;
	}

	
	public String getTableAttributeSchema( String tableName ) {
		/*
		
			SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
			FROM pg_attribute a
			     JOIN pg_class b ON (a.attrelid = b.relfilenode)
			WHERE b.relname = 'view_aerodromos' and a.attstattarget = -1;		
		
		*/
		
		String result = "";
		
		return result;
	}

	public String updateDictionaryItems(String dictionary) {
		String resp = "{ \"success\": true, \"msg\": \"Operação efetuada com sucesso.\" }";
		
		try {
			
			JSONArray ja = new JSONArray( dictionary );
			for( int x=0; x < ja.length(); x++ ) {
				JSONObject jo = ja.getJSONObject( x );
				
				String description = jo.getString("description" );
				String translatedName = jo.getString("translatedName" );
				int idDictionaryItem = jo.getInt("idDictionaryItem" );
				boolean visible = jo.getBoolean("visible");
				boolean primaryKey = jo.getBoolean("primaryKey");
				
				newTransaction();
				DictionaryItem item = rep.getItem( idDictionaryItem );
				item.setTranslatedName( translatedName );
				item.setDescription( description );
				item.setVisible(visible);
				item.setPrimaryKey(primaryKey);
				
				rep.newTransaction();
				rep.updateItem( item );
				
			}
			
		} catch ( Exception e ) {
			resp = "{ \"error\": true, \"msg\": \"" + e.getMessage() + "\" }";
		}		
		
		return resp;

	}


	
	
}
