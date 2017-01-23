package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*

	var featureStyle = new ol.style.Style({
		  image: new ol.style.Icon(({
			    anchor: [0.5, 46],
			    scale : 0.5,
			    anchorXUnits: 'fraction',
			    anchorYUnits: 'pixels',
			    opacity: 0.75,
			    // color: '#8959A8',
			    // rotation: 30.0,
			    src: 'icons/trafficcamera.png'
		  }))
	});
	
    var featureText = new ol.style.Style({
        text: new ol.style.Text({
            text: feature.getProperties().label,
            offsetY: -25,
            // offsetX: -25,
            // font: 'bold 20px Times New Roman',
            fill: new ol.style.Fill({
                color: '#000000'
            }),
            // stroke: new ol.style.Stroke({color: '#000000', width: 1})
        })
    });



*/

@Entity
@Table(name="feature_styles") 
public class FeatureStyle {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_feature_style")
	private int idFeatureStyle;		
	
	public FeatureStyle() {
		//
	}
	
	public FeatureStyle(String featureStyleName, String iconAnchor, String iconScale, String iconAnchorXUnits,
			String iconAnchorYUnits, String iconApacity, String iconColor, String iconRotation, String iconSrc,
			String textOffsetY, String textOffsetX, String textFont, String textFillColor, String textStrokeColor,
			String textStrokeWidth, String polygonFillColor, String polygonStrokeColor, String polygonStrokeWidth,
			String polygonLineDash, String polygonStrokeLinecap) {
		super();

		this.featureStyleName = featureStyleName;
		this.iconAnchor = iconAnchor;
		this.iconScale = iconScale;
		this.iconAnchorXUnits = iconAnchorXUnits;
		this.iconAnchorYUnits = iconAnchorYUnits;
		this.iconApacity = iconApacity;
		this.iconColor = iconColor;
		this.iconRotation = iconRotation;
		this.iconSrc = iconSrc;
		this.textOffsetY = textOffsetY;
		this.textOffsetX = textOffsetX;
		this.textFont = textFont;
		this.textFillColor = textFillColor;
		this.textStrokeColor = textStrokeColor;
		this.textStrokeWidth = textStrokeWidth;
		this.polygonFillColor = polygonFillColor;
		this.polygonStrokeColor = polygonStrokeColor;
		this.polygonStrokeWidth = polygonStrokeWidth;
		this.polygonLineDash = polygonLineDash;
		this.polygonStrokeLinecap = polygonStrokeLinecap;
	}

	@Column(length=250) private String featureStyleName;
	@Column(length=25) private String iconAnchor;
	@Column(length=25) private String iconScale;
	@Column(length=25) private String iconAnchorXUnits;
	@Column(length=25) private String iconAnchorYUnits;
	@Column(length=25) private String iconApacity;
	@Column(length=25) private String iconColor;
	@Column(length=25) private String iconRotation;
	@Column(length=25) private String iconSrc;

	@Column(length=25) private String textOffsetY;
	@Column(length=25) private String textOffsetX;
	@Column(length=25) private String textFont;
	@Column(length=25) private String textFillColor;
	@Column(length=25) private String textStrokeColor;
	@Column(length=25) private String textStrokeWidth;
	
	@Column(length=25) private String polygonFillColor;
	@Column(length=25) private String polygonStrokeColor;
	@Column(length=25) private String polygonStrokeWidth;
	@Column(length=25) private String polygonLineDash;
	@Column(length=25) private String polygonStrokeLinecap;
	
	public int getIdFeatureStyle() {
		return idFeatureStyle;
	}
	
	public void setIdFeatureStyle(int idFeatureStyle) {
		this.idFeatureStyle = idFeatureStyle;
	}
	
	public String getIconAnchor() {
		return iconAnchor;
	}
	
	public void setIconAnchor(String iconAnchor) {
		this.iconAnchor = iconAnchor;
	}
	
	public String getIconScale() {
		return iconScale;
	}
	
	public void setIconScale(String iconScale) {
		this.iconScale = iconScale;
	}
	
	public String getIconAnchorXUnits() {
		return iconAnchorXUnits;
	}
	
	public void setIconAnchorXUnits(String iconAnchorXUnits) {
		this.iconAnchorXUnits = iconAnchorXUnits;
	}
	
	public String getIconAnchorYUnits() {
		return iconAnchorYUnits;
	}
	
	public void setIconAnchorYUnits(String iconAnchorYUnits) {
		this.iconAnchorYUnits = iconAnchorYUnits;
	}
	
	public String getIconApacity() {
		return iconApacity;
	}
	
	public void setIconApacity(String iconApacity) {
		this.iconApacity = iconApacity;
	}
	
	public String getIconColor() {
		return iconColor;
	}
	
	public void setIconColor(String iconColor) {
		this.iconColor = iconColor;
	}
	
	public String getIconRotation() {
		return iconRotation;
	}
	
	public void setIconRotation(String iconRotation) {
		this.iconRotation = iconRotation;
	}
	
	public String getIconSrc() {
		return iconSrc;
	}
	
	public void setIconSrc(String iconSrc) {
		this.iconSrc = iconSrc;
	}
	
	public String getTextOffsetY() {
		return textOffsetY;
	}
	
	public void setTextOffsetY(String textOffsetY) {
		this.textOffsetY = textOffsetY;
	}
	
	public String getTextOffsetX() {
		return textOffsetX;
	}
	
	public void setTextOffsetX(String textOffsetX) {
		this.textOffsetX = textOffsetX;
	}
	
	public String getTextFont() {
		return textFont;
	}
	
	public void setTextFont(String textFont) {
		this.textFont = textFont;
	}
	
	public String getTextFillColor() {
		return textFillColor;
	}

	public void setTextFillColor(String textFillColor) {
		this.textFillColor = textFillColor;
	}
	
	public String getTextStrokeColor() {
		return textStrokeColor;
	}
	
	public void setTextStrokeColor(String textStrokeColor) {
		this.textStrokeColor = textStrokeColor;
	}
	
	public String getTextStrokeWidth() {
		return textStrokeWidth;
	}
	
	public void setTextStrokeWidth(String textStrokeWidth) {
		this.textStrokeWidth = textStrokeWidth;
	}

	public String getFeatureStyleName() {
		return featureStyleName;
	}

	public void setFeatureStyleName(String featureStyleName) {
		this.featureStyleName = featureStyleName;
	}

	public String getPolygonFillColor() {
		return polygonFillColor;
	}

	public void setPolygonFillColor(String polygonFillColor) {
		this.polygonFillColor = polygonFillColor;
	}

	public String getPolygonStrokeColor() {
		return polygonStrokeColor;
	}

	public void setPolygonStrokeColor(String polygonStrokeColor) {
		this.polygonStrokeColor = polygonStrokeColor;
	}

	public String getPolygonStrokeWidth() {
		return polygonStrokeWidth;
	}

	public void setPolygonStrokeWidth(String polygonStrokeWidth) {
		this.polygonStrokeWidth = polygonStrokeWidth;
	}

	public String getPolygonLineDash() {
		return polygonLineDash;
	}

	public void setPolygonLineDash(String polygonLineDash) {
		this.polygonLineDash = polygonLineDash;
	}

	public String getPolygonStrokeLinecap() {
		return polygonStrokeLinecap;
	}

	public void setPolygonStrokeLinecap(String polygonStrokeLinecap) {
		this.polygonStrokeLinecap = polygonStrokeLinecap;
	}
	
	
}
