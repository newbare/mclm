
package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.json.JSONArray;
import org.json.JSONObject;

import com.opensymphony.xwork2.ActionContext;

@Action (value = "updateDictionary", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
) 

@ParentPackage("default")
public class UpdateDictionaryAction extends BasicActionClass {
	
	public String execute () {
		String resp;
		
		try {

			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
			String dictionary = request.getParameter("dictionary");			
			
			System.out.println( dictionary );
			
			JSONArray ja = new JSONArray( dictionary );
			for( int x=0; x < ja.length(); x++ ) {
				JSONObject jo = ja.getJSONObject( x );
				JSONObject node = jo.getJSONObject("node");
				System.out.println( " >>>> " + node.getInt("idNodeData") + "  " + jo.getInt("idDictionaryItem" ) );
			}
					
			resp = "{}";
			
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/json");
			response.getWriter().write( resp );  
		} catch (Exception ex) {
			ex.printStackTrace();
		}	
	
		return "ok";
	}
	
}
