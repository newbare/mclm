
package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.json.JSONObject;

import com.opensymphony.xwork2.ActionContext;

@Action (value = "createCenarioTreeNode", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"})},
		interceptorRefs= { @InterceptorRef("seguranca")	 }
) 

@ParentPackage("default")
public class CreateCenarioTreeNodeAction extends BasicActionClass {
	private String data;
	private Integer cenario;
	
	public String execute () {

		String resp = "";
		
		try {
			
			try {
				// {"text":"Teste123","leaf":false,"id":1,"index":0,"serviceUrl":"","layerName":"","originalServiceUrl":"","layerType":"","serialId":"","version":"","readOnly":false,"parentId":0} Cenario:-1

				System.out.println("AAAAAAA Create Cenario Node:" + data + " Cenario:" + cenario );
				
				JSONObject obj = new JSONObject( data );
				String text = (String)obj.get("text");
				System.out.println("------------------------ " + text );
				
				
			} catch ( Exception e ) {
				e.printStackTrace();
			}
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/json");
			response.getWriter().write( resp );  
		} catch (Exception ex) {
			ex.printStackTrace();
		}	
	
		return "ok";
	}

	public void setData(String data) {
		this.data = data;
	}
	
	public void setCenario(Integer cenario) {
		this.cenario = cenario;
	}

	
}
