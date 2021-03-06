package br.mil.mar.casnav.mclm.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import br.mil.mar.casnav.mclm.misc.PDFCreator;

// "contentDisposition", "attachment;filename=\"${fileName}\""

@Action (value = "getMapAsPDF", results = {@Result(
	    name = "ok", 
	    type = "stream", 
	    params = { 
	        "contentType", "application/pdf", 
	        "inputName", "stream", 
	        "bufferSize", "1024", 
	    }
	) 
}) 


@ParentPackage("default")
public class GetMapAsPDFAction extends BasicActionClass {
	private String uuid;
	private int idCenario;
	private String fileName;
	private InputStream stream;
	private String bbox;

	public String execute(){

		try {
			fileName = uuid + ".pdf";
			
			PDFCreator pdf = new PDFCreator();
			String pdfFileName = pdf.gerarPDF( uuid, idCenario, getLoggedUser(), bbox );
			
			File pdfFile = new File( pdfFileName );
	        stream = new FileInputStream( pdfFile );
			
		} catch ( Exception e ) {
			e.printStackTrace();
		}
		
		return "ok";
	}
	
	public void setBbox(String bbox) {
		this.bbox = bbox;
	}

	public void setIdCenario(int idCenario) {
		this.idCenario = idCenario;
	}
	
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	
	public InputStream getStream() {
		return stream;
	}
	
	public String getFileName() {
		return fileName;
	}	
	
}
