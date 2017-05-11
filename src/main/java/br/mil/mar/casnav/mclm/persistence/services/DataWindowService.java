package br.mil.mar.casnav.mclm.persistence.services;

import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.DataField;
import br.mil.mar.casnav.mclm.persistence.entity.DataPanel;
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
		        	whereClause = whereClause + andParam + pk + "='" + jsonData.get(obj).toString() + "'"; 
		        	andParam = "and ";
		        }
		        
		    }    
			
		    String sql = "select * from " + dataWindow.getSourceTable() + " where " + whereClause;
		    
		    //System.out.println("Criando Janela com os dados de: " + sql );
		    
		    String databaseConn = dataWindow.getSourceServer() +
					":" + dataWindow.getSourcePort() + "/" + dataWindow.getSourceDatabase();
		    
			String connectionString = "jdbc:postgresql://" + databaseConn;

			GenericService gs = new GenericService( connectionString, dataWindow.getSourceUser(), 
					dataWindow.getSourcePassword()  );
			
			List<UserTableEntity> utes = gs.genericFetchList( sql );			
			if ( utes.size() > 0 ) {
				UserTableEntity record = utes.get(0);
				result = createWindow( dataWindow, record );
			} else {
				throw new Exception("Não foi encontrada correspondência entre os dados da camada " + nodeData.getLayerAlias() +
						" e a tabela " + dataWindow.getSourceTable() + " no banco " + databaseConn + " usando o critério [" + whereClause + "]");
			}
			
			
		} catch ( Exception e ) {	
			result = "{ \"error\": true, \"msg\": \""+ e.getMessage() + ".\" }";
		}
		
		return result;
	}

	
	private String createWindow( DataWindow dataWindow, UserTableEntity record ) {
		String result = "";
		JSONObject window = new JSONObject();
		window.put("windowName", dataWindow.getDataWindowName() );
		
		JSONArray panels = new JSONArray();
		for ( DataPanel dataPanel : dataWindow.getDataPanels() ) {
			JSONObject panel = new JSONObject();
			panel.put("panelName", dataPanel.getDataPanelName() );
			panels.put( panel );
			
			JSONArray fields = new JSONArray();
			for ( DataField dataField : dataPanel.getFields() ) {
				String fieldName = dataField.getFieldName();
				String fieldCaption = dataField.getCaption();
				String fieldType = dataField.getFieldType().name();
				String fieldDescription = dataField.getDescription();
				

				JSONObject field = new JSONObject();
				for( String key : record.getColumnNames() ) {
					if ( key.equals( fieldName ) ) {
						String value = record.getData( key );
						field.put("fieldValue", value);
						field.put("fieldName", key);
						field.put("fieldType", fieldType);
						field.put("fieldCaption", fieldCaption);
						field.put("fieldDescription", fieldDescription);
					}
				}		
				fields.put( field );
				
			}
			panel.put("fields", fields);
			
		}
		
		window.put("panels", panels);
		
		result = window.toString();
		
		//System.out.println("Janela criada: " + result );
		
		return result;
	}
	
}
