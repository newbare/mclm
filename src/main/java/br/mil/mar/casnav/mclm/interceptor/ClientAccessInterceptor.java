package br.mil.mar.casnav.mclm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.services.SceneryService;

public class ClientAccessInterceptor implements Interceptor {
	private static final long serialVersionUID = -2344136157076941239L;

	
	public String intercept(ActionInvocation invocation) {
		HttpServletRequest request = ServletActionContext.getRequest();
		
		HttpSession session = request.getSession();
		System.out.println( "[" + session.getId() +  "] [" + invocation.getAction().getClass().getSimpleName() + "] [" + request.getRequestURI() + "]");

		User loggedUser = (User)session.getAttribute("loggedUser");
		if (loggedUser == null) {
			System.out.println(" > Asking user to APOLO...");
			
			User user = new User();
			user.setIdUser(8658);
			
			// Simula um usuário logado do APOLO. Retirar isso.
			try {
				SceneryService ss = new SceneryService();
				user.setSceneries( ss.getList( user.getIdUser() ) );
			} catch ( NotFoundException e ) {
				// ignore
			} catch ( Exception e ) {
				e.printStackTrace();
			}

			session.setAttribute("loggedUser", user);	
			System.out.println(" > Found User: " + user.getIdUser() );
			
			// Quando nao encontrar usuario logado no APOLO...
			// HttpServletResponse response = ServletActionContext.getResponse();
			// response.setStatus( HttpServletResponse.SC_UNAUTHORIZED );
			// response.setStatus( HttpServletResponse.SC_FORBIDDEN );
			//return "notLogged";
		} else {
			System.out.println(" > Logged User: " + loggedUser.getIdUser() );
		}
		
		
		
		try {
			return invocation.invoke();
		} catch ( Exception ignored ) {
			return "notLogged";
		}
	}
 
	@Override
	public void destroy() {
		//logger.info("system stop"); 
	}

	
	@Override
	public void init() {
		//logger.info("system init");
	}	
	
}
