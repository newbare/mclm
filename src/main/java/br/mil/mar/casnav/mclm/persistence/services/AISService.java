package br.mil.mar.casnav.mclm.persistence.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.cookie.Cookie;
import org.apache.http.message.BasicNameValuePair;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class AISService {
	private String authToken;
	private String wasid; 
	private CookieStore cookieStore;
	private String cookieString;
	
	public AISService() {
		try {
			this.getAuthToken();
		} catch ( Exception e ) {
			e.printStackTrace();
		}
	}
	
	public void searchShip( ) {
		//http://www.shippingexplorer.net/en/ships/filter?sEcho=2&iDisplayStart=0&iDisplayLength=20&sSearch={%22name%22:%22Npa%22}
	}
	
	public void getShips(String country) {
		// http://www.shippingexplorer.net/en/ships/filter?sEcho=2&iDisplayStart=0&iDisplayLength=25&sSearch={%22country%22:%22BR%22}
	}
	
	public void getShipDetail( String shipId ) {
		// http://www.shippingexplorer.net/en/ship/nve-cisne-branco/19373
	}
	
	
	
	public void getShipInfo( String shipId ) throws Exception {
		//POST :: http://www.shippingexplorer.net/map/resolveshiphash
		// 		shipId=19373
		//		__RequestVerificationToken=hUUSPIx55uUoq9r7FiPr_xPtbOG2O8o7-81TkZF-lT0oSDXSsxsRkfe8KVuAmEHgJHPm_DjIGLGBHpJFdjEL2lIYL70A8vx3YIbJLC-wcCE1
		
		List<NameValuePair> postParameters = new ArrayList<NameValuePair>();
	    postParameters.add(new BasicNameValuePair("shipId", shipId));
	    postParameters.add(new BasicNameValuePair("__RequestVerificationToken", this.authToken));		
	    postParameters.add(new BasicNameValuePair("WASID", this.wasid));
	    
	    /*
	    CookieStore cookieStore = new BasicCookieStore();
	    BasicClientCookie cookie1 = new BasicClientCookie("__RequestVerificationToken", this.authToken );
	    BasicClientCookie cookie2 = new BasicClientCookie( "WASID", this.wasid );
	    BasicClientCookie cookie3 = new BasicClientCookie( "_ga", this.ga );
	    BasicClientCookie cookie4 = new BasicClientCookie( "_gid", this.gid );
	    BasicClientCookie cookie5 = new BasicClientCookie( "mapsettings", this.mapsettings );
	    
	    cookieStore.addCookie(cookie1);
	    cookieStore.addCookie(cookie2);
	    cookieStore.addCookie(cookie3);
	    cookieStore.addCookie(cookie4);
	    cookieStore.addCookie(cookie5);
	    */
	    
	    WebClient wc = new WebClient();
	    String res = wc.doPost("http://www.shippingexplorer.net/map/resolveshiphash", postParameters, this.cookieStore, cookieString);
		
	    System.out.println( res );
		
	}
	
	public synchronized void getAuthToken() throws Exception {
		
		WebClient wc = new WebClient();
		wc.doGet("http://www.shippingexplorer.net/en/map#s19373");
		
		
		this.cookieStore = wc.getCookieStore();
		
	    List<Cookie> cookies = cookieStore.getCookies();
	    
	    Map<String,String> cookiesMap = new HashMap<String,String>();
	    StringBuilder sb = new StringBuilder();
	    String prefix = "";
	    for ( Cookie cookie : cookies ) {
	    	System.out.println("  > " + cookie.getName() + " " + cookie.getValue() );
	    	cookiesMap.put( cookie.getName() , cookie.getValue() );
	    	sb.append( prefix + cookie.getName() + "=" + cookie.getValue() );
	    	prefix = ";";
	    }
		
	    System.out.println( sb.toString() );
	    
		this.authToken = cookiesMap.get("__RequestVerificationToken");
		this.wasid = cookiesMap.get("WASID");
		this.cookieString = sb.toString();
		
	}

}
