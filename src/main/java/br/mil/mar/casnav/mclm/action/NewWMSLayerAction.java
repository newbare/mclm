package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.services.NodeService;

@Action(value="newWMSLayer", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class NewWMSLayerAction extends BasicActionClass {
	
	public String execute(){

		try { 
			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
			
			//dumpParameters();			
			
			String serverUrl = request.getParameter("serverUrl");
			String layerName = request.getParameter("layerName");
			String layerAlias = request.getParameter("layerAlias");
			String description = request.getParameter("description");
			String institute = request.getParameter("institute");
			int layerFolderID = Integer.valueOf( request.getParameter("layerFolderID") );
			String result = "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
			
			try {

				NodeService ns = new NodeService();
				NodeData nd = new NodeData(layerFolderID, serverUrl, description, institute, layerName, layerAlias);
				ns.addNode( nd );
				
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
