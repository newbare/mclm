package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.misc.WebClient;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayer;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayerAttribute;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayersSchema;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.entity.DictionaryItem;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.repository.DictionaryRepository;

/*

	Exemplo de resposta do Geoserver:
	
	{"elementFormDefault":"qualified","targetNamespace":"http://openstreetmap.org","targetPrefix":"osm","featureTypes":[
		{"typeName":"admin0","properties":[
			{"name":"fid_ne_10m","maxOccurs":1,"minOccurs":0,"nillable":true,"type":"xsd:int","localType":"int"},
			{"name":"scalerank","maxOccurs":1,"minOccurs":0,"nillable":true,"type":"xsd:number","localType":"number"},
			{"name":"adm0_a3_l","maxOccurs":1,"minOccurs":0,"nillable":true,"type":"xsd:string","localType":"string"},
			{"name":"type","maxOccurs":1,"minOccurs":0,"nillable":true,"type":"xsd:string","localType":"string"},
			{"name":"labelrank","maxOccurs":1,"minOccurs":0,"nillable":true,"type":"xsd:int","localType":"int"},
			{"name":"geom","maxOccurs":1,"minOccurs":0,"nillable":true,"type":"gml:MultiLineString","localType":"MultiLineString"}
		]}
	]}	

 */


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
		Gson gson = new GsonBuilder().create();
		String result = gson.toJson( items ); 
		return result;
	}	
	
	public List<DictionaryItem> getDictionary( int idNodeData ) throws Exception {
		List<DictionaryItem> result = rep.getList( idNodeData );
		return result;
	}
	
	public int updateDictionary( NodeData node ) throws Exception {
		String layerName = node.getLayerName();
		String serviceUrl = node.getServiceUrl();
		int result = 0;
		
		if ( node.getLayerType() == LayerType.WMS ) {
			GeoserverLayersSchema schema = getLayerAttributeSchema( layerName, serviceUrl );
			
			if ( schema == null ) return 0;
			
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
			System.out.println("Tipo de Camada '" + node.getLayerType() + "' não suporta dicionário.");
		}
		return result;
	}
	
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
	
	
}
