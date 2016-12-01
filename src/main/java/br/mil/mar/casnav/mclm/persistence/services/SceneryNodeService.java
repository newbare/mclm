package br.mil.mar.casnav.mclm.persistence.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
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
				//SceneryNode sn = gson.fromJson(jsonobj.toString(), SceneryNode.class);
				//sn.setScenery( scenery );
				
				NodeData layer = gson.fromJson(jsonobj.toString(), NodeData.class);
				SceneryNode sn = new SceneryNode();
				sn.setScenery( scenery );
				sn.setLayer( layer );
				
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
