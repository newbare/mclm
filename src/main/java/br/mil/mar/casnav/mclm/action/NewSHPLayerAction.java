package br.mil.mar.casnav.mclm.action;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.LayerService;

@Action(value="newSHPLayer", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class NewSHPLayerAction extends BasicActionClass {
	private String shpFileFileName;
	private String shpFileContentType;
	private File shpFile;
	
	public String execute(){
		

		try { 
			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);

			String layerAlias = request.getParameter("layerAlias");
			String description = request.getParameter("description");
			String institute = request.getParameter("institute");
			int layerFolderID = Integer.valueOf( request.getParameter("layerFolderID") );
			
			LayerService ls = new LayerService();
			String result = ls.createSHPLayer( shpFileContentType, shpFile, shpFileFileName, layerAlias, description, institute, layerFolderID );
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}
	
	public void setShpFileFileName(String shpFileFileName) {
		this.shpFileFileName = shpFileFileName;
	}
	
	public void setShpFile(File shpFile) {
		this.shpFile = shpFile;
	}
	
	public void setShpFileContentType(String shpFileContentType) {
		this.shpFileContentType = shpFileContentType;
	}

}
