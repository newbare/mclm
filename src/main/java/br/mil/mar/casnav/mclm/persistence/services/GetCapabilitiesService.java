package br.mil.mar.casnav.mclm.persistence.services;

import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.geotools.data.ows.Layer;
import org.geotools.data.ows.WMSCapabilities;
import org.geotools.data.wms.WebMapServer;

import br.mil.mar.casnav.mclm.misc.GeoServerCapability;

public class GetCapabilitiesService {
	
	
	public List<GeoServerCapability> getCapabilities( String url ) throws Exception {

		// http://www.geoservicos.ibge.gov.br/geoserver/wms?service=wms&version=1.1.1&request=GetCapabilities
		// http://www.geoservicos.ibge.gov.br/geoserver/CREN/wms?service=WMS&version=1.1.0&request=GetMap&layers=HidrogeologiaRegiaoNE
		
		String cgUrl = "wms?request=GetCapabilities&version=1.1.1";
		
		List<GeoServerCapability> capabilities = new ArrayList<GeoServerCapability>();
		URL sourceServer = new URL( URLDecoder.decode( url, "UTF-8" ) + cgUrl );

		WMSCapabilities caps = null;
		try {
			WebMapServer wms = new WebMapServer( sourceServer, Integer.MAX_VALUE );
			caps = wms.getCapabilities();
		} catch ( Exception e ) {
			e.printStackTrace();
		}

		if ( caps != null ) {
			for( Iterator<Layer> i = caps.getLayerList().iterator(); i.hasNext(); ){
				Layer layer = (Layer) i.next();
				if( layer.getName() != null && layer.getName().length() != 0 ){
					GeoServerCapability capability = new GeoServerCapability();
					capability.setLayerName( layer.getName() );
					capability.setLayerTitle( layer.getTitle() );
					capability.setQueryable( layer.isQueryable() );
					capability.setServerUrl( url );
					capabilities.add( capability );
				}
			}		
		} else {
			throw new Exception("Empty Layers list from URL " + url );
		}
		
		return capabilities;
	}

	
	public String getCapabilitiesAsJson( String url ) throws Exception {
		/*
		List<GeoServerCapability> capabilities = getCapabilities( url );
		Gson gson = new Gson();
		StringBuilder sb = new StringBuilder();
		String prefix = "";
		sb.append("[");		
		for ( GeoServerCapability capability : capabilities ) {
			String jsonCapability = gson.toJson(capability, GeoServerCapability.class );
			sb.append( prefix + jsonCapability );
			prefix = ",";
		}
		sb.append("]");
		return sb.toString();
		*/
		return "";
	}
}
