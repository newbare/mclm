package br.mil.mar.casnav.mclm.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import br.mil.mar.casnav.mclm.persistence.entity.User;

public class ClientAccessInterceptor implements Interceptor {
	private static final long serialVersionUID = -2344136157076941239L;

	
	public String intercept(ActionInvocation invocation) {
		User loggedUser = (User)invocation.getInvocationContext().getSession().get("loggedUser");
		if (loggedUser == null) {
			return "notLogged";
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
