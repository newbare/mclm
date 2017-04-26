package br.mil.mar.casnav.mclm.persistence.services;

import java.util.Iterator;
import java.util.List;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.DataWindow;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;

public class DataWindowService {

	public String getWindow(String data) {
		String result = "{ \"error\": true, \"msg\": \"Camada não informada.\" }";
		
		try {
			JSONObject jsonData = new JSONObject( data );
			int idNodeData = jsonData.getInt("node_data" );
			
			NodeService ns = new NodeService();
			NodeData nodeData = ns.getNode(idNodeData);
			
			//DictionaryService ds = new DictionaryService();
			//List<DictionaryItem> dis = ds.getDictionary(idNodeData);
			
			DataWindow dataWindow = nodeData.getDataWindow();			
			
			if ( dataWindow == null ) {
				return "{ \"error\": true, \"msg\": \"Não há janela de dados cadastrada para esta camada.\" }";
			}
			
		    String whereClause = "";
		    String andParam = "";
			Iterator<?> iterator = jsonData.keys();
		    while (iterator.hasNext()) {
		        String obj = iterator.next().toString();
		        if ( obj.startsWith("mclm_pk_") ) {
		        	String pk = obj.substring(8);
		        	whereClause = andParam + pk + "='" + jsonData.get(obj).toString() + "'"; 
		        	andParam = "and ";
		        }
		        
		    }    
			
		    String sql = "select * from " + dataWindow.getSourceTable() + " where " + whereClause;
		    
		    
		    System.out.println( sql );
			
		    
			String connectionString = "jdbc:postgresql://" + dataWindow.getSourceServer() +
					":" + dataWindow.getSourcePort() + "/" + dataWindow.getSourceDatabase();
			GenericService gs = new GenericService( connectionString, dataWindow.getSourceUser(), 
					dataWindow.getSourcePassword()  );
			
			List<UserTableEntity> utes = gs.genericFetchList( sql );			
			
			System.out.println("  >> Peguei " + utes.size() + " registros");
			
			
		} catch ( Exception e ) {	
			e.printStackTrace();
		}
		
		
		return result;
		
	}

}
