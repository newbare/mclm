package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.NodeService;

@Action(value="deleteLayer", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class DeleteLayerAction extends BasicActionClass {
	
	public String execute(){

		try { 
			String result = "{ \"success\": true, \"msg\": \"Camada apagada com sucesso.\" }";
			
			try {
				HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
				int idNode = Integer.valueOf( request.getParameter("nodeId") );
				
				NodeService ns = new NodeService();
				ns.deleteNode( idNode );
				
			} catch ( Exception ex ) {
				ex.printStackTrace();
				result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
			}
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

}
