
package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.NodeService;

@Action (value = "getLayersTreeNode", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) } ) 

@ParentPackage("default")
public class GetLayersTreeNodeAction extends BasicActionClass {
	private String node;
	
	public String execute () {

		System.out.println("CALL DETECTED ! " + node);
		
		try {
			
			int idParent = 0;
			try {
				idParent = Integer.valueOf( node );
			} catch ( Exception e ) {
				//
			}
			
			NodeService ns = new NodeService();
			String resp = ns.getNodesAsJSON( idParent );

			System.out.println( resp );
			dumpParameters();
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/json");
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
