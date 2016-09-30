
package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.NodeService;

@Action (value = "updateLayersTreeNode", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) } ) 

@ParentPackage("default")
public class UpdateLayersTreeNodeAction extends BasicActionClass {
	private String data;
	
	public String execute () {

		System.out.println("Editar elementos: " + data); // = [{"index":1,"id":"1"},{"index":2,"id":"2"},{"index":3,"id":"3"},{"index":0,"id":"4"}]

		String resp = "";
		
		try {
			
			NodeService ns = new NodeService();
			resp = ns.updateNodeIndexes( data );

			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/json");
			response.getWriter().write( resp );  
		} catch (Exception ex) {
			ex.printStackTrace();
		}	
	
		return "ok";
	}

	public void setData(String data) {
		this.data = data;
	}
	
	

}
