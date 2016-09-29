
package br.mil.mar.casnav.mclm.action;

import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.misc.TreeNode;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.services.NodeService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Action (value = "getLayersTreeNode", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) } ) 

@ParentPackage("default")
public class GetLayersTreeNodeAction extends BasicActionClass {
	private String node;
	
	public String execute () {

		System.out.println( node );

		
		try {
			
			int idParent = 0;
			try {
				idParent = Integer.valueOf( node );
			} catch ( Exception e ) {
				//
			}
			
			NodeService ns = new NodeService();
			Set<NodeData> nodes = ns.getList( idParent );
			//List<TreeNode> treeNodes = new ArrayList<TreeNode>();
			
			JSONArray arrayObj = new JSONArray();
			for ( NodeData node : nodes ) {
				TreeNode tn = new TreeNode( node );
				JSONObject itemObj = JSONObject.fromObject( tn );
	            arrayObj.add( itemObj );				
			}
			
			String resp = arrayObj.toString();
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/xml");
			response.getWriter().write( resp );  
		} catch (Exception ex) {
			ex.printStackTrace();
		}	
	
		return "ok";
	}

	public void setNode(String node) {
		this.node = node;
	}
	
	

}
