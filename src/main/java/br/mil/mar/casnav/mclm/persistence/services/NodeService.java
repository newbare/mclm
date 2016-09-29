package br.mil.mar.casnav.mclm.persistence.services;

import java.util.Set;

import br.mil.mar.casnav.mclm.misc.TreeNode;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.repository.NodeRepository;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class NodeService {
	private NodeRepository rep;

	public NodeService() throws DatabaseConnectException {
		this.rep = new NodeRepository();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}

	public Set<NodeData> getList() throws Exception {
		return rep.getList( );
	}

	// Pega todas as camadas que possuem o id_parent igual ao id_node
	// informado ( todos os filhos do no que possui ID=idParent )
	public String getNodesAsJSON( int idParent ) throws Exception {
		String sql = "SELECT nd.*, COUNT(t1.*) as children " +
				"FROM node_data nd " +
				"LEFT OUTER JOIN node_data t1 on t1.id_node_parent = nd.id_node_data " +
				"where nd.id_node_parent = " + idParent + " " +
				"GROUP BY nd.id_node_data ORDER BY nd.index_order";
		
		GenericService gs = new GenericService();
		Set<UserTableEntity> utes = gs.genericFetchList( sql );
		
		JSONArray arrayObj = new JSONArray();
		
		for ( UserTableEntity ute : utes ) {
			
			TreeNode tn = new TreeNode( ute );
			JSONObject itemObj = JSONObject.fromObject( tn );
            arrayObj.add( itemObj );				
		}
		
		
		return arrayObj.toString();
		
	}
	
}
