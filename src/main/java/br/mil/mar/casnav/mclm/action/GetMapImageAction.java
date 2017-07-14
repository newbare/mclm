package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.LayerService;

/*

@Action(value="getMapImage", results= {  
	    @Result(name="ok", type="stream", params = {
                "contentType", "image/png",
                "inputName", "fileInputStream",
                "contentDisposition", "filename=\"${fileName}\"",
                "bufferSize", "1024"
        }) }
)  

*/

@Action(value="getMapImage", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetMapImageAction {
	private String urlList;
	private String feiEncodedCanvas;

	//private String fileName;
	//private FileInputStream fileInputStream;	
	
	public String execute(){

		String resposta = "{\"result\":\"error\"}";
		
		try { 
			
			LayerService ls = new LayerService();
			String urlPath = ls.getLayersAsImage( urlList, feiEncodedCanvas );
			
		    resposta = "{\"result\":\""+urlPath+"\"}";
		    
	        //File img = new File("/path/to/image/image.jpg");
	        //fileInputStream = new FileInputStream(img);		    
		    
		    
		    HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write(resposta);
			
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}


	public void setUrlList(String urlList) {
		this.urlList = urlList;
	}

	public void setFeiEncodedCanvas(String feiEncodedCanvas) {
		this.feiEncodedCanvas = feiEncodedCanvas;
	}

	
}
