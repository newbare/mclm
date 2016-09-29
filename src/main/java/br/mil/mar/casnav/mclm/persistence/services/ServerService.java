package br.mil.mar.casnav.mclm.persistence.services;

import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.Server;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.ServerRepository;

public class ServerService {
	private ServerRepository rep;

	public ServerService() throws DatabaseConnectException {
		this.rep = new ServerRepository();
	}

	public void updateServer(Server server) throws UpdateException {
		Server oldServer;

		try {
			oldServer = rep.getServer( server.getIdServer() );
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldServer.setUrl( server.getUrl() );
		
		rep.newTransaction();
		rep.updateServer(oldServer);

	}	

	public Server getServer(int idServer) throws Exception{
		return rep.getServer(idServer);
	}

	public Server getServer(String name) throws Exception{
		return rep.getServer(name);
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public Server insertServer( String name, String url ) throws InsertException {
		
		if ( !url.endsWith("/") ) {
			url = url + "/";
		}
		
		Server server = new Server();
		server.setUrl(url);
		server.setName( name );
		
		Server expRet = rep.insertServer( server );
		return expRet ;
	}	

	public void deleteServer( int idServer ) throws DeleteException {
		try {
			Server server = rep.getServer(idServer);
			rep.newTransaction();
			rep.deleteServer(server);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public Set<Server> getList( ) throws Exception {
		return rep.getList( );
	}

	
}
