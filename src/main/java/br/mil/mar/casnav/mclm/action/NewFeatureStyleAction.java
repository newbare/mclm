package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.DataLayerService;

@Action(value="newFeatureStyle", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class NewFeatureStyleAction extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);

			String layerStyleName = request.getParameter("layerStyleName");
			String iconAnchor = request.getParameter("iconAnchor");
			String iconScale = request.getParameter("iconScale");
			String iconAnchorXUnits = request.getParameter("iconAnchorXUnits");
			String iconAnchorYUnits = request.getParameter("iconAnchorYUnits");
			String iconApacity = request.getParameter("iconApacity");
			String iconColor = request.getParameter("iconColor");
			String iconRotation = request.getParameter("iconRotation");
			String iconSrc = request.getParameter("iconSrc");
			
			String textOffsetY = request.getParameter("textOffsetY");
			String textOffsetX = request.getParameter("textOffsetX");
			String textFont = request.getParameter("textFont");
			String textFillColor = request.getParameter("textFillColor");
			String textStrokeColor = request.getParameter("textStrokeColor");
			String textStrokeWidth = request.getParameter("textStrokeWidth");
			
			String polygonFillColor = request.getParameter("polygonFillColor");		
			String polygonStrokeColor = request.getParameter("polygonStrokeColor");		
			String polygonStrokeWidth = request.getParameter("polygonStrokeWidth");		
			String polygonLineDash = request.getParameter("polygonLineDash");		
			String polygonStrokeLinecap = request.getParameter("polygonStrokeLinecap");		
			String lineFillColor = request.getParameter("lineFillColor");		
			String lineStrokeColor = request.getParameter("lineStrokeColor");		
			String lineStrokeWidth = request.getParameter("lineStrokeWidth");		
			
			
			
			DataLayerService dss = new DataLayerService();
			String result = dss.insertFeatureStyle(layerStyleName, iconAnchor, iconScale, iconAnchorXUnits,
					iconAnchorYUnits, iconApacity, iconColor, iconRotation, iconSrc,
					textOffsetY, textOffsetX, textFont, textFillColor, textStrokeColor,
					textStrokeWidth, polygonFillColor, polygonStrokeColor, polygonStrokeWidth, polygonLineDash, polygonStrokeLinecap,
					lineFillColor, lineStrokeColor,  lineStrokeWidth);
				
				
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

}
