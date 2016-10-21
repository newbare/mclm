package br.mil.mar.casnav.mclm.persistence.services;

import java.io.File;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.ConfigRepository;

public class ConfigService {
	private ConfigRepository rep;
	
	public ConfigService() throws DatabaseConnectException {
		this.rep = new ConfigRepository();
	}
	
	public String getAsJson() throws Exception {
		Config cfg = getConfig();
		JSONObject itemObj = new JSONObject( cfg );
		return itemObj.toString();
	}

	public void updateConfig(Config config) throws Exception {
		Config oldConfig;
		
		File fil = new File( config.getShapeFileTargetPath() );
		fil.mkdirs();

		try {
			oldConfig = rep.getConfig();
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldConfig.setBaseLayer( config.getBaseLayer() );
		oldConfig.setGeoserverPassword( config.getGeoserverPassword() );
		oldConfig.setGeoserverUrl( config.getGeoserverUrl() );
		oldConfig.setGeoserverUser( config.getGeoserverUser() );
		oldConfig.setNonProxyHosts( config.getNonProxyHosts() );
		oldConfig.setProxyHost( config.getProxyHost() );
		oldConfig.setProxyPassword( config.getProxyPassword() );
		oldConfig.setProxyPort( config.getProxyPort() );
		oldConfig.setProxyUser( config.getProxyUser() );
		oldConfig.setUseProxy( config.isUseProxy() );
		oldConfig.setMapZoom( config.getMapZoom() );
		oldConfig.setMapCenter( config.getMapCenter() );
		oldConfig.setQueryFactorRadius( config.getQueryFactorRadius() );
		oldConfig.setExternalWorkspaceName( config.getExternalWorkspaceName() );
		oldConfig.setExternalLayersToLocalServer( config.isExternalLayersToLocalServer() );
		oldConfig.setShapeFileTargetPath( config.getShapeFileTargetPath() );

		rep.newTransaction();
		rep.updateConfig( oldConfig );
		
		Configurator cfg = Configurator.getInstance();
		cfg.updateConfiguration( oldConfig );

	}	

	
	public Config getConfig() throws Exception{
		return rep.getConfig();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public Config insertConfig(Config config) throws InsertException {
		Config expRet = rep.insertConfig( config );
		return expRet ;
	}	


}
