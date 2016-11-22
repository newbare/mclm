
package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

@Action (value = "createCenarioTreeNode", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) } ) 

@ParentPackage("default")
public class CreateCenarioTreeNodeAction extends BasicActionClass {
	private String data;
	private Integer cenario;
	
	public String execute () {

		String resp = "";
		
		try {
			
			try {
				System.out.println("AAAAAAA Create Cenario Node:" + data + " Cenario:" + cenario );
			} catch ( Exception e ) {
				//
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
