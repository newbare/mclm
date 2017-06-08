<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>Default Styler</sld:Name>
    <sld:UserStyle>
      <sld:Name>Default Styler</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Name>name</sld:Name>
        
       
        <sld:Rule>
         <!-- 1:35 ate 1:9 -->
         <!-- MIN: 9  000000.0 --> 
         <!-- MAX: 35 000000.0 --> 
         <sld:MinScaleDenominator>9000000.0</sld:MinScaleDenominator>
         <sld:MaxScaleDenominator>35000000.0</sld:MaxScaleDenominator>          
         <sld:TextSymbolizer>
           <sld:Label>
             <ogc:PropertyName>name</ogc:PropertyName>
           </sld:Label>
           <sld:Font>
              <sld:CssParameter name="font-family">Dialog</sld:CssParameter>
              <sld:CssParameter name="font-size">9.0</sld:CssParameter>
              <sld:CssParameter name="font-style">normal</sld:CssParameter>
              <sld:CssParameter name="font-weight">normal</sld:CssParameter>
           </sld:Font>
           <sld:LabelPlacement>
             <sld:PointPlacement>
               <sld:AnchorPoint>
                 <sld:AnchorPointX>0.4</sld:AnchorPointX>
                 <sld:AnchorPointY>0.0</sld:AnchorPointY>
               </sld:AnchorPoint>
             </sld:PointPlacement>
           </sld:LabelPlacement>
            <sld:Halo>
              <sld:Radius>2</sld:Radius>
              <sld:Fill>
                <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>           
           <sld:Fill>
             <sld:CssParameter name="fill">#555555</sld:CssParameter>
           </sld:Fill>
         </sld:TextSymbolizer>
        </sld:Rule>		        
        

        <sld:Rule>
         <!-- 1:9 ate 1:4 -->
         <!-- MIN: 4  000000.0 --> 
         <!-- MAX: 9 000000.0 --> 
         <sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
         <sld:MaxScaleDenominator>9000000.0</sld:MaxScaleDenominator>          
         <sld:TextSymbolizer>
           <sld:Label>
             <ogc:PropertyName>name</ogc:PropertyName>
           </sld:Label>
           <sld:Font>
              <sld:CssParameter name="font-family">Dialog</sld:CssParameter>
              <sld:CssParameter name="font-size">18.0</sld:CssParameter>
              <sld:CssParameter name="font-style">normal</sld:CssParameter>
              <sld:CssParameter name="font-weight">normal</sld:CssParameter>
           </sld:Font>
           <sld:LabelPlacement>
             <sld:PointPlacement>
               <sld:AnchorPoint>
                 <sld:AnchorPointX>0.4</sld:AnchorPointX>
                 <sld:AnchorPointY>0.0</sld:AnchorPointY>
               </sld:AnchorPoint>
             </sld:PointPlacement>
           </sld:LabelPlacement>
            <sld:Halo>
              <sld:Radius>2</sld:Radius>
              <sld:Fill>
                <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>           
           <sld:Fill>
             <sld:CssParameter name="fill">#555555</sld:CssParameter>
           </sld:Fill>
         </sld:TextSymbolizer>
        </sld:Rule>		        
        
        
        
        
        
        <sld:Rule>
         <!-- 1:35 ate 1:9 -->
         <!-- MIN: 9  000000.0 --> 
         <!-- MAX: 35 000000.0 --> 
         <sld:MinScaleDenominator>9000000.0</sld:MinScaleDenominator>
         <sld:MaxScaleDenominator>35000000.0</sld:MaxScaleDenominator>          
          
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
              <sld:CssParameter name="stroke-width">0.4</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>


        <sld:Rule>
         <!-- 1:9 ate 0 -->
         <!-- MIN: 3 000000.0 -->
         <!-- MAX: 9 000000.0 -->
         <sld:MinScaleDenominator>3000000.0</sld:MinScaleDenominator>          
         <sld:MaxScaleDenominator>9000000.0</sld:MaxScaleDenominator>           
          
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
              <sld:CssParameter name="stroke-dasharray">5 2</sld:CssParameter>
              <sld:CssParameter name="stroke-width">0.3</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>        
        
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>
