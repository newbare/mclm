
package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

@Action (value = "updateLayersTreeNode", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) } ) 

@ParentPackage("default")
public class UpdateLayersTreeNodeAction extends BasicActionClass {
	private String data;
	
	public String execute () {

		System.out.println("CALL DETECTED :  Data=" + data);

		String resp = "";
		
		try {
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
	
	

}
