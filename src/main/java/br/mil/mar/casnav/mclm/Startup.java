package br.mil.mar.casnav.mclm;

import java.util.concurrent.ScheduledExecutorService;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.infra.ConnFactory;
import br.mil.mar.casnav.mclm.persistence.services.ConfigService;


@WebListener
public class Startup implements ServletContextListener {
	private ScheduledExecutorService scheduler;
	
    private void loggerDebug( String log ) {
    	System.out.println( log );
    }
    
	@Override
    public void contextInitialized(ServletContextEvent event) {
    	ServletContext context = event.getServletContext();
    	String path = context.getRealPath("/");
    	System.setProperty("rootPath", path );

    	try {
       
    		
    		String configFile = path + "WEB-INF/classes/config.xml";
			Configurator config = Configurator.getInstance( configFile );
			config.loadMainConfig();
			
			String user = config.getUserName();
			String passwd = config.getPassword();
			String database = config.getDatabaseName();
			String port = config.getDatabasePort();
    		
    		ConnFactory.setCredentials(user, passwd, database, port);
			Config cfg = new ConfigService().getConfig();
			Configurator.getInstance().updateConfiguration( cfg );
			
		} catch (Exception e) { 
			e.printStackTrace(); 
		}
        
        
	}
	
	@Override
    public void contextDestroyed(ServletContextEvent event) {
		loggerDebug("shutdown");
		scheduler.shutdownNow();
    }
}
