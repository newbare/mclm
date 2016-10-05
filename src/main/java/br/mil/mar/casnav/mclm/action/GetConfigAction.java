package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.ConfigService;

@Action(value="getConfig", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetConfigAction {
	
	public String execute(){

		try { 
			
			String config = new ConfigService().getAsJson();
		
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( config );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	
}
