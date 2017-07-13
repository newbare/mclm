package br.mil.mar.casnav.mclm.action;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.json.JSONArray;
import org.json.JSONObject;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.misc.PathFinder;
import br.mil.mar.casnav.mclm.misc.WebClient;



@Action(value="getMapImage", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetMapImageAction {
	private String urlList;
	
	public String execute(){

		String resposta = "{\"result\":\"error\"}";
		
		try { 
			WebClient wc = new WebClient();
			
			String uuid = UUID.randomUUID().toString().replace("-", "");
			String path = PathFinder.getInstance().getPath() + "/" + uuid;
			
			File temp = new File( path );
			List<File> images = new ArrayList<File>();
			
			temp.mkdirs();
			JSONArray arr = new JSONArray( urlList );
			for ( int x = 0; x < arr.length(); x++  ) {
				JSONObject jo = arr.getJSONObject(x);
				String url = jo.getString("url");
				String serial = jo.getString("id");
				
				String targetFile = path + "/" + serial + ".png";
				wc.saveImage(url, targetFile);
				images.add( new File(targetFile) );
			}
			
		    BufferedImage result = new BufferedImage( 1000, 600, BufferedImage.TYPE_INT_RGB);
		    Graphics g = result.getGraphics();
			
		    for( File image : images ) {
		        BufferedImage bi = ImageIO.read( image );
		        g.drawImage(bi, 0, 0, null);
		    }			
		    ImageIO.write( result,"png", new File( path + "/result.png") );		    
		  
		    String urlPath = uuid + "/result.png";

		    resposta = "{\"result\":\""+urlPath+"\"}";
		    
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


	
}
