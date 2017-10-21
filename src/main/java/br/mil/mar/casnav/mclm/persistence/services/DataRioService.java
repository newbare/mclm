package br.mil.mar.casnav.mclm.persistence.services;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class DataRioService {


	// http://webapibrt.rio.rj.gov.br/api/v1/brt
	public synchronized String getBRTOnibus() throws Exception {
		WebClient wc = new WebClient();
		String url = "http://webapibrt.rio.rj.gov.br/api/v1/brt";
		String result = wc.doGet(url);
		return result;
	}

	// http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes
	public synchronized String getOnibus() throws Exception {
		WebClient wc = new WebClient();
		String url = "http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes";
		String result = wc.doGet(url);
		return result;
	}

	
}
