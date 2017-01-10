package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.DataSourceService;

@Action(value="newDtaLayer", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class NewDataSourceLayerAction extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
			String dataSourceName = request.getParameter("dataSourceName");
			String hint = request.getParameter("hint");
			String tableName = request.getParameter("tableName");
			String institute = request.getParameter("institute");
			String database = request.getParameter("database");
			String whereClause = request.getParameter("whereClause");
			String geometryColumn = request.getParameter("geometryColumn");
			String propertiesColumns = request.getParameter("propertiesColumns");
			
			Integer layerFolderID = Integer.valueOf( request.getParameter("layerFolderID") );
			
			DataSourceService dss = new DataSourceService();
			String result = dss.insertDataSource(dataSourceName, hint, tableName, institute, layerFolderID, database, 
					whereClause, geometryColumn, propertiesColumns);
				
				
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

}
