package ship.observers;

import br.mil.mar.casnav.mclm.misc.SimulatorController;
import br.mil.mar.casnav.mclm.websocket.ClientList;
import ship.InfoProtocol;

public class WebSocketObserver implements InfoObserver {

	@Override
	public void send(InfoProtocol info) {

		double heading = SimulatorController.vessel.GetHeading();
		double latitude = SimulatorController.vessel.GetLatitude();
		double longitude = SimulatorController.vessel.GetLongitude();
	
		int rudder = SimulatorController.vessel.getRudderPosition();

		double speed = SimulatorController.vessel.GetBoatSpeed();
		double apparentWindAngle = SimulatorController.vessel.GetApparentWindAngle();
		double trueWindAngle = SimulatorController.vessel.GetTrueWindAngle();
		double apparentWindSpeed = SimulatorController.vessel.GetApparentWindSpeed();
		double trueWindSpeed = SimulatorController.vessel.GetTrueWindSpeed();
		
		String wind = "{\"trueAngle\":" + trueWindAngle + ",\"trueSpeed\":" + trueWindSpeed + ",\"apparentSpeed\":" + apparentWindSpeed + ",\"apparentAngle\":" + apparentWindAngle + "}";
		String resposta = "{\"wind\":" + wind + ",\"speed\":" + speed + ",\"heading\":" + heading + ",\"latitude\":"+latitude+",\"longitude\":"+longitude+",\"rudder\":" + rudder +	"}";
		
		ClientList.getInstance().message( resposta );
		
	}

}
