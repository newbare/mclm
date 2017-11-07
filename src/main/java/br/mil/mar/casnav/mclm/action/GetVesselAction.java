package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.misc.SimulatorController;



@Action(value="getVessel", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetVesselAction {
	
	public String execute(){

		try { 
			
			
			double heading = SimulatorController.vessel.GetHeading();
			double latitude = SimulatorController.vessel.GetLatitude();
			double longitude = SimulatorController.vessel.GetLongitude();
			int rudder = SimulatorController.pilot.getRudderPosition();
			double targetAzimuth = SimulatorController.pilot.getTargetAzimuth(); 
			double currentAzimuth = SimulatorController.pilot.getCurrentAzimuth(); 
			double speed = SimulatorController.vessel.GetBoatSpeed();
			double apparentWindAngle = SimulatorController.vessel.GetApparentWindAngle();
			double trueWindAngle = SimulatorController.vessel.GetTrueWindAngle();
			double apparentWindSpeed = SimulatorController.vessel.GetApparentWindSpeed();
			double trueWindSpeed = SimulatorController.vessel.GetTrueWindSpeed();
			
			String wind = "{\"trueAngle\":" + trueWindAngle + ",\"trueSpeed\":" + trueWindSpeed + ",\"apparentSpeed\":" + apparentWindSpeed + ",\"apparentAngle\":" + apparentWindAngle + "}";
			
			String resposta = "{\"wind\":" + wind + ",\"speed\":" + speed + ",\"heading\":" + heading + ",\"latitude\":"+latitude+",\"longitude\":"+longitude+",\"rudder\":" + rudder +
					",\"targetAzimuth\":"+targetAzimuth+",\"currentAzimuth\":"+currentAzimuth+"}";
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write(resposta);  
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return "ok";
	}

	
}
