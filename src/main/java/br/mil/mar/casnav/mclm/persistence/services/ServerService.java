package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.ExternalSourcesCollection;
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
	
	public String insertServer( String name, String url, String version ) throws InsertException {
		String result = "{ \"success\": true, \"msg\": \"Fonte de Dados criada com sucesso.\" }";
		try {
			if ( !url.endsWith("/") ) {
				url = url + "/";
			}
			Server server = new Server( name, url, version );
			rep.insertServer( server );
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
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

	public List<Server> getList( ) throws Exception {
		return rep.getList( );
	}

	public String getAsJson() throws Exception {
		List<Server> servers = getList();
		ExternalSourcesCollection esc = new ExternalSourcesCollection( servers );
		JSONObject itemObj = new JSONObject( esc );
		return itemObj.toString();		
	}	
	
}
