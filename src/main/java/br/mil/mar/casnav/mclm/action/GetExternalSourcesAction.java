package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.ServerService;

@Action(value="getExternalSources", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetExternalSourcesAction extends BasicActionClass {
	
	public String execute(){

		try { 
			
			// {"servers":[{"name":"Servidor do IBGE","url":"http://www.geoservicos.ibge.gov.br/geoserver/","idServer":1},{"name":"APOLO DEFESA","url":"http://172.21.81.43/geoserver/","idServer":5},{"name":"APOLO CASNAV","url":"http://10.5.115.22/geoserver/","idServer":6},{"name":"OpenGeo Suite Demo","url":"http://demo.opengeo.org/geoserver/","idServer":7},{"name":"Harvard Geospatial Library","url":"http://hgl.harvard.edu:8080/geoserver/","idServer":8},{"name":"ITHACA","url":"http://www.ithacaweb.org/geoserver/","idServer":9},{"name":"Servidor Local","url":"http://localhost:8080/geoserver/","idServer":10},{"name":"OSM APOLO","url":"http://10.5.115.122/geoserver/","idServer":11}]}
			
			ServerService ss = new ServerService();
			String servers = ss.getAsJson( );
		
			System.out.println("Resposta getExternalSources: " + servers );
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( servers );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

}
