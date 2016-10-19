package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.ServerService;

@Action(value="deleteExternalSource", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class DeleteExternalSourceAction extends BasicActionClass {
	private int idServer;
	
	public String execute(){

		try { 
			String result = "{ \"success\": true, \"msg\": \"Fonte de Dados removida com sucesso.\" }";
			
			try {
			
				ServerService ss = new ServerService();
				ss.deleteServer(idServer);
				
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

	public void setIdServer(int idServer) {
		this.idServer = idServer;
	}
	
}
