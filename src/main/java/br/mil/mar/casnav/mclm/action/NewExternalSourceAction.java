package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.ServerService;

@Action(value="newExternalSource", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class NewExternalSourceAction extends BasicActionClass {
	
	public String execute(){
		
		// TODO: Passar todo esse codigo para o serviço.
		
		try { 
			String result = "{ \"success\": true, \"msg\": \"Fonte de Dados criada com sucesso.\" }";
			
			try {
				HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
				String name = request.getParameter("name");
				String url = request.getParameter("url");
				String version = request.getParameter("version");
				
				ServerService ss = new ServerService();
				ss.insertServer(name, url, version);
				
				
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
