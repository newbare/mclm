package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.DataLayersCollection;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.FeatureStyle;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.entity.PostgresTable;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.DataLayerRepository;

public class DataLayerService {
	private DataLayerRepository rep;

	public DataLayerService() throws DatabaseConnectException {
		this.rep = new DataLayerRepository();
	}

	public void updateDataLayer(DataLayer dataLayer) throws UpdateException {
		DataLayer oldDataLayer;

		try {
			oldDataLayer = rep.getDataLayer( dataLayer.getIdDataLayer() );
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldDataLayer.setDataLayerName( dataLayer.getDataLayerName() );
		oldDataLayer.setHint( dataLayer.getHint() );
		
		rep.newTransaction();
		rep.updateDataLayer(oldDataLayer);

	}	

	public DataLayer getDataLayer(int idDataLayer) throws Exception{
		return rep.getDataLayer(idDataLayer);
	}


	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public void closeSession() {
		rep.closeSession();
	}
	
	public FeatureStyle getFeatureStyle( int idFeatureStyle ) {
		try {
			return rep.getStyle( idFeatureStyle );
		} catch ( Exception e ) {
			return null;
		}
	}
	
	public String insertDataLayer(String dataLayerName, String hint, Integer idTable, String institute,
			Integer layerFolderID, String whereClause, String propertiesColumns, String displayColumn, int idFeatureStyle) throws InsertException {
		
		String result = "{ \"success\": true, \"msg\": \"Camada de Dados criada com sucesso.\" }";
		
		try {
			
			
			FeatureStyle style = getFeatureStyle( idFeatureStyle );
			
			
			ServerService ss = new ServerService();
			PostgresTable table = ss.getTable( idTable );
			
			DataLayer dataLayer = new DataLayer(dataLayerName, hint,  whereClause, propertiesColumns, table,
					displayColumn, style);
			
			newTransaction();
			dataLayer = rep.insertDataLayer( dataLayer );
			
			String layerAlias = table.getName() + ":" + dataLayer.getIdDataLayer();
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "", hint, institute, layerAlias, dataLayerName, LayerType.DTA);
			node.setReadOnly( true );
			ns.addNode( node );				
			
			
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
	}
		

	public void deleteDataLayer( int idDataLayer ) throws DeleteException {
		
		try {
			DataLayer dataLayer = rep.getDataLayer(idDataLayer);
			rep.newTransaction();
			rep.deleteDataLayer(dataLayer);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public List<DataLayer> getList( ) throws Exception {
		return rep.getList( );
	}

	public String getAsJson() throws Exception {
		List<DataLayer> dataLayers = getList();
		DataLayersCollection esc = new DataLayersCollection( dataLayers );
		JSONObject itemObj = new JSONObject( esc );
		
		rep.closeSession();
		
		return itemObj.toString();		
	}

	public String insertFeatureStyle(String layerStyleName, String iconAnchor, String iconScale,
			String iconAnchorXUnits, String iconAnchorYUnits, String iconApacity, String iconColor, String iconRotation,
			String iconSrc, String textOffsetY, String textOffsetX, String textFont, String textFillColor,
			String textStrokeColor, String textStrokeWidth, String polygonFillColor, String polygonStrokeColor, 
			String polygonStrokeWidth, String polygonLineDash, String polygonStrokeLinecap, String lineFillColor, 
			String lineStrokeColor, String lineStrokeWidth, String lineLineDash) {
		
		String result = "{ \"success\": true, \"msg\": \"Estilo criado com sucesso.\" }";
		
		try {
			FeatureStyle style = new FeatureStyle(layerStyleName, iconAnchor, iconScale, iconAnchorXUnits,
					iconAnchorYUnits, iconApacity, iconColor, iconRotation, iconSrc,
					textOffsetY, textOffsetX, textFont, textFillColor, textStrokeColor,
					textStrokeWidth, polygonFillColor, polygonStrokeColor, polygonStrokeWidth,
					polygonLineDash, polygonStrokeLinecap, lineFillColor, lineStrokeColor, lineStrokeWidth, lineLineDash);
			
			rep.insertFeatureStyle( style );
			
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
	}

	
}
