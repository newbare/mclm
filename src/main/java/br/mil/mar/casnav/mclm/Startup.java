package br.mil.mar.casnav.mclm;

import java.util.concurrent.ScheduledExecutorService;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.entity.User;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.infra.ConnFactory;
import br.mil.mar.casnav.mclm.persistence.services.ConfigService;
import br.mil.mar.casnav.mclm.persistence.services.UserService;


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

    	UserService us;
    	try {
       
    		
    		String configFile = path + "WEB-INF/classes/config.xml";
			Configurator config = Configurator.getInstance( configFile );
			config.loadMainConfig();
			
			String user = config.getUserName();
			String passwd = config.getPassword();
			String database = config.getDatabaseName();
    		
			System.out.println( user + " " + database + " " + passwd );
			
    		ConnFactory.setCredentials(user, passwd, database);

			us = new UserService();
			try {
				us.getList().size();
			} catch (NotFoundException ignored ) {
				// No users found. We need an Admin!
				User usr = new User();
				usr.setFullName("System Administrator");
				usr.setLoginName("admin");
				usr.setPassword("admin");
				usr.setUserMail("no.mail@localhost");
				us.newTransaction();
				us.insertUser(usr);
				loggerDebug("System Administrator created");
			}
			
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
