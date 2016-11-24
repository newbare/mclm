package br.mil.mar.casnav.mclm.persistence.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

import br.mil.mar.casnav.mclm.persistence.entity.Scenery;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.repository.SceneryNodeRepository;

public class SceneryNodeService {
	private SceneryNodeRepository rep;

	public SceneryNodeService() throws DatabaseConnectException {
		this.rep = new SceneryNodeRepository();
	}

	
	public String updateOrCreateNodes(String data, Integer idScenery) {
		// [{"text":"PASTA01","leaf":false,"id":1,"index":0,"serviceUrl":"","layerName":"","originalServiceUrl":"","layerType":"","serialId":"","version":"","readOnly":false,"parentId":0},{"text":"PASTA02","leaf":false,"id":2,"index":1,"serviceUrl":"","layerName":"","originalServiceUrl":"","layerType":"","serialId":"","version":"","readOnly":false,"parentId":0},{"layerType":"WMS","layerAlias":"Brasil (com Regi\u00f5es)","serviceUrl":"http://172.21.81.43/geoserver/wms/","index":0,"description":"Mapas obtidos do IBGE","readOnly":true,"leaf":true,"serialId":"LRb668ab51","institute":"MD / EMCFA / CHELOG","id":3,"text":"Brasil (com Regi\u00f5es)","layerName":"view_regioes_br","idNodeParent":60210,"originalServiceUrl":"","childrenCount":0,"version":"","parentId":1}]

		System.out.println( data );
		
		String result = "{ \"success\": true, \"msg\": \"Cenário atualizado com sucesso.\" }";
		
		try {
			SceneryService ss = new SceneryService();
			Scenery scenery = ss.getScenery( idScenery );  
			
			// Veio so um registro. Transforma em array devido ao JSONArray abaixo.
			if( !data.startsWith("[") ) data = "["+data+"]";
			
			Gson gson = new Gson();
			JSONArray array = new JSONArray( data );
			List<SceneryNode> nodes = new ArrayList<SceneryNode>();
			for ( Object obj : array ) {
				JSONObject jsonobj = (JSONObject)obj;
				SceneryNode sn = gson.fromJson(jsonobj.toString(), SceneryNode.class);
				sn.setScenery( scenery );
				nodes.add( sn );
			}
			
			insertSceneryNodeList( nodes );
			
		} catch ( Exception e ) {
			e.printStackTrace();
			result = "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";
		}
		return result;
	}	
	
	
	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public void insertSceneryNodeList(List<SceneryNode> SceneryNodeList) throws Exception {
		rep.insertSceneryNodeList( SceneryNodeList );
	}
	
	public SceneryNode insertSceneryNode(SceneryNode SceneryNode) throws InsertException {
		SceneryNode expRet = rep.insertSceneryNode( SceneryNode );
		return expRet ;
	}	

	public void deleteSceneryNode( int idSceneryNode ) throws DeleteException {
		try {
			SceneryNode SceneryNode = rep.getSceneryNode(idSceneryNode);
			rep.newTransaction();
			rep.deleteSceneryNode(SceneryNode);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public Set<SceneryNode> getList( ) throws Exception {
		return rep.getList( );
	}

	
}
