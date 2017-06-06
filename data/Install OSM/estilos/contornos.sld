<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <NamedLayer>
    <Name>contornos</Name>
    <UserStyle>
      <Title>Estilo para as linhas de contorno de altitude</Title>
      <FeatureTypeStyle>

        
          <Rule>
            <Name>rule1</Name>
            <Title>Contour Line</Title>
            <LineSymbolizer>
              <Stroke>
                <CssParameter name="stroke">#f29b43</CssParameter>
                <CssParameter name="stroke-width">0.2</CssParameter>
              </Stroke>
            </LineSymbolizer>
            <TextSymbolizer>
              <Label>
                <ogc:PropertyName>elevation</ogc:PropertyName>
              </Label>
              <Font>
                <CssParameter name="font-family">Arial</CssParameter>
                <CssParameter name="font-style">Normal</CssParameter>
                <CssParameter name="font-size">7</CssParameter>
              </Font>
              <LabelPlacement>
                <LinePlacement/>
              </LabelPlacement>
              <Halo>
                <Radius>
                  <ogc:Literal>1</ogc:Literal>
                </Radius>
                <Fill>
                  <CssParameter name="fill">#FFFFFF</CssParameter>
                  <CssParameter name="fill-opacity">0.4</CssParameter>
                </Fill>
              </Halo>
              <Fill>
                <CssParameter name="fill">#000000</CssParameter>
              </Fill>
              <Priority>2000</Priority>
              <VendorOption name="followLine">true</VendorOption>
              <VendorOption name="repeat">150</VendorOption>
              <VendorOption name="maxDisplacement">50</VendorOption>
              <VendorOption name="maxAngleDelta">30</VendorOption>
            </TextSymbolizer>
          </Rule>        
        
        
        
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
