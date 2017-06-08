<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
 xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
 xmlns="http://www.opengis.net/sld" 
 xmlns:ogc="http://www.opengis.net/ogc" 
 xmlns:xlink="http://www.w3.org/1999/xlink" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <!-- a Named Layer is the basic building block of an SLD document -->
  <NamedLayer>
    <Name>land</Name>
    <UserStyle>
    <!-- Styles can have names, titles and abstracts -->
      <Title>Land</Title>
      <Abstract>A sample style that draws a polygon</Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- A FeatureTypeStyle for rendering polygons -->
      <FeatureTypeStyle>
        <Rule>
          <Name>rule1</Name>
          <Title>Poligono marrom com linha marrom escuro</Title>
          <Abstract>Poligo morrom com linha largura 1</Abstract>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#F0F2F2</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#F0F2F2</CssParameter>
              <CssParameter name="stroke-width">0</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
