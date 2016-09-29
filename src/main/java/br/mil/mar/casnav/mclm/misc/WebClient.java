package br.mil.mar.casnav.mclm.misc;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;


public class WebClient {
	private final String USER_AGENT = "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.13) Gecko/20101206 Ubuntu/10.10 (maverick) Firefox/3.6.13";

	
	public int doPostStream( String url, String content, String geoUser, String geoPassword ) throws Exception {
		int code = 0;
		
		String geoCreds = geoUser + ":" + geoPassword;
		String encodedAuth = new String( Base64.encodeBase64( geoCreds.getBytes() ) );
		HttpURLConnection con = (HttpURLConnection) new URL( url ).openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Authorization", "Basic " + encodedAuth );
		con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Content-type", "text/xml");
		
		con.setDoOutput(true);
		con.getOutputStream().write( content.getBytes("UTF-8") );
		code = con.getResponseCode();
	
		// To use with GET method
		InputStream inputStream = con.getInputStream();
		StringWriter writer = new StringWriter();
		IOUtils.copy(inputStream, writer, "UTF-8");
		String theString = writer.toString();
		inputStream.close();
		
		System.out.println( "WebClient:doPostStream >>> " + theString );
		
		con.disconnect();
		return code;
		
	}
	
	
	public void doPost( String url, String parameter, String content) throws Exception {
		CloseableHttpClient httpClient = HttpClientBuilder.create().build();
		HttpPost httppost;

		Configurator cfg = Configurator.getInstance();
		boolean useProxy = cfg.useProxy();
		String proxyHost = cfg.getProxyHost();
		String proxyUser = cfg.getProxyUser();
		String proxyPassword = cfg.getProxyPassword();
		int proxyPort = cfg.getProxyPort();

		if ( !useProxy ) {
			httpClient = HttpClientBuilder.create().build();
			httppost = new HttpPost( url );
		} else {
			CredentialsProvider credsProvider = new BasicCredentialsProvider();
			credsProvider.setCredentials( new AuthScope(proxyHost, proxyPort),  new UsernamePasswordCredentials(proxyUser, proxyPassword));		
			HttpHost proxy = new HttpHost(proxyHost, proxyPort);
			RequestConfig config = RequestConfig.custom().setProxy(proxy).build();			 
			httpClient = HttpClients.custom().setDefaultCredentialsProvider(credsProvider).build();	
			httppost = new HttpPost( url );
			httppost.setConfig(config);			 

		}
		
		// Colocar num IF
		String encoding = new String( Base64.encodeBase64( "admin:casnav2013".getBytes() ) );
		httppost.setHeader("User-Agent", USER_AGENT);
		httppost.setHeader("Authorization", "Basic " + encoding);
		httppost.setHeader("Content-type", "text/xml");
		
		
		// ---------------------------------------------------------------------------------
		
		// Request parameters and other properties.
		List<NameValuePair> params = new ArrayList<NameValuePair>(2);
		params.add(new BasicNameValuePair( parameter, content) );
		httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));

		/*
		HttpResponse httpResponse = httpClient.execute(httppost);
		InputStream inputStream = httpResponse.getEntity().getContent();		
		StringWriter writer = new StringWriter();
		IOUtils.copy(inputStream, writer, "UTF-8");
		String theString = writer.toString();
		httpClient.close();
		*/
	}

	

	public String doGet(String url) throws Exception {
		String result = "NO_ANSWER";
		CloseableHttpClient httpClient;
		HttpGet getRequest;

		Configurator cfg = Configurator.getInstance();
		boolean useProxy = cfg.useProxy();
		String proxyHost = cfg.getProxyHost();
		String proxyUser = cfg.getProxyUser();
		String proxyPassword = cfg.getProxyPassword();
		int proxyPort = cfg.getProxyPort();

		if ( !useProxy ) {
			httpClient = HttpClientBuilder.create().build();
			getRequest = new HttpGet(url);
		} else {
			CredentialsProvider credsProvider = new BasicCredentialsProvider();
			credsProvider.setCredentials( new AuthScope(proxyHost, proxyPort),  new UsernamePasswordCredentials(proxyUser, proxyPassword));		
			HttpHost proxy = new HttpHost(proxyHost, proxyPort);
			RequestConfig config = RequestConfig.custom().setProxy(proxy).build();			 
			httpClient = HttpClients.custom().setDefaultCredentialsProvider(credsProvider).build();	
			getRequest = new HttpGet(url);
			getRequest.setConfig(config);			 

		}


		getRequest.addHeader("accept", "application/json");
		getRequest.addHeader("Content-Type", "plain/text; charset=utf-8");
		getRequest.setHeader("User-Agent", USER_AGENT);

		HttpResponse response = httpClient.execute(getRequest);
		response.setHeader("Content-Type", "plain/text; charset=UTF-8");

		int stCode = response.getStatusLine().getStatusCode();

		if ( stCode != 200) {
			System.out.println("WebClient: Error " + stCode + " when accessing URL " + url);
		} else {
			HttpEntity entity = response.getEntity();
			InputStreamReader isr = new InputStreamReader(entity.getContent(), "UTF-8");
			result = convertStreamToString(isr);
			Charset.forName("UTF-8").encode(result);
			isr.close();
		}

		httpClient.close();
		return result;
	}	

	private String convertStreamToString(java.io.InputStreamReader is) {
		java.util.Scanner s = new java.util.Scanner(is);
		s.useDelimiter("\\A");
		String retorno = s.hasNext() ? s.next() : "";
		s.close();
		return retorno;
	}		

}
