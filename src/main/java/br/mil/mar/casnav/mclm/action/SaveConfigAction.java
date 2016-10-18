package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.services.ConfigService;

@Action(value="saveConfig", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class SaveConfigAction extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			String result = "{ \"success\": true, \"msg\": \"Configuração atualizada com sucesso.\" }";
			
			try {
				HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
				boolean useProxy = Boolean.valueOf( request.getParameter("useProxy") );
				boolean externalLayersToLocalServer = Boolean.valueOf( request.getParameter("externalLayersToLocalServer") );
				String nonProxyHosts = request.getParameter("nonProxyHosts");
				String proxyPassword = request.getParameter("proxyPassword");
				String proxyUser = request.getParameter("proxyUser");
				String proxyHost = request.getParameter("proxyHost");
				String geoserverPassword = request.getParameter("geoserverPassword");
				String geoserverUser = request.getParameter("geoserverUser");
				String mapCenter = request.getParameter("mapCenter");
				String baseLayer = request.getParameter("baseLayer");
				String geoserverUrl = request.getParameter("geoserverUrl");
				int mapZoom = Integer.valueOf( request.getParameter("mapZoom") );
				int queryFactorRadius = Integer.valueOf( request.getParameter("queryFactorRadius") );
				int proxyPort = Integer.valueOf( request.getParameter("proxyPort") );
				int idConfig = Integer.valueOf( request.getParameter("idConfig") );
				
				ConfigService cs = new ConfigService();
				Config config = new Config(idConfig, geoserverUrl, baseLayer, useProxy, externalLayersToLocalServer, "", 
							proxyHost, nonProxyHosts, proxyUser, proxyPassword, proxyPort, geoserverUser, 
							geoserverPassword, mapZoom, queryFactorRadius, mapCenter);	
				
				cs.updateConfig(config);
			} catch ( Exception e ) {
				result = "{ \"error\": true, \"msg\": \""+e.getMessage()+".\" }";	
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
