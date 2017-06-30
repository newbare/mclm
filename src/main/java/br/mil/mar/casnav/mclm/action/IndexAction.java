
package br.mil.mar.casnav.mclm.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

@Action (value = "index", results = { @Result (location = "index.jsp", name = "ok") } ) 

@ParentPackage("default")
public class IndexAction {
	private String idUser;
	
	public String execute () {
		
		ActionContext.getContext().getSession().put("idUser", idUser );
		
		return "ok";
	}
	
	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}
	
}
