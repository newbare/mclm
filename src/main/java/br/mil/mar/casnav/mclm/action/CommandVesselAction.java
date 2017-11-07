package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.misc.SimulatorController;



@Action(value="commandVessel", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class CommandVesselAction {
	private String command;
	private String value;
	
	public String execute(){

		try { 

			// Rumo
			if( command.equals("TRN") ) {
				double azimuth = Double.valueOf( value );
				SimulatorController.pilot.setCourseTo( azimuth );
			}
			
			// Maquinas
			if( command.equals("THR") ) {
				double val = Double.valueOf( value );
				SimulatorController.vessel.SetThrottlePosition( val );
			}
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write("OK");  
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return "ok";
	}

	public void setCommand(String command) {
		this.command = command;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
	
}
