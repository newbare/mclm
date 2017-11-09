package br.mil.mar.casnav.mclm.misc;

import ship.Ships;
import ship.Vessel;
import ship.observers.ObserverFactory;

public class SimulatorController {
	public static double interval = 2.0;
	public static double boatspeed = 0.0;
	public static double heading = 5.0;
	public static double latitude = -22.99;
	public static double longitude = -43.14;
	public static double altitude = 0.0;
	public static int rudderposition = 0;
	public static int throttleposition = 0;
	
	public static Vessel vessel;
	//public static AutoPilot pilot;
	
	public static void init() {
		vessel = new Vessel( ObserverFactory.getObserver() , interval, Ships.NPA_BRACUI, boatspeed, heading, 
				latitude, longitude, altitude, rudderposition, throttleposition, 2.0);
		vessel.start();

		//pilot = new AutoPilot( vessel, vessel.GetHeading() );
		//PilotObserver pilotObs = new BasicPilotObserver();
		//pilot.setObserver( pilotObs );
		//pilot.start();
		
	}
	
	
}
