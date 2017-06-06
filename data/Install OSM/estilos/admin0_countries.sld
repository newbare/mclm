<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>Default Styler</sld:Name>
    <sld:UserStyle>
      <sld:Name>Default Styler</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Name>name</sld:Name>
        
        
        <sld:Rule>
         <!-- 1:140 ate 1:90 -->
         <!-- MIN: 90 000000.0 --> 
         <!-- MAX: 140 000000.0 -->           
         <sld:MinScaleDenominator>90000000.0</sld:MinScaleDenominator>
         <sld:MaxScaleDenominator>140000000.0</sld:MaxScaleDenominator>
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
         <!-- 1:90 ate 1:35 -->
         <!-- MIN: 35 000000.0 --> 
         <!-- MAX: 90 000000.0 -->           
         <sld:MinScaleDenominator>35000000.0</sld:MinScaleDenominator>
         <sld:MaxScaleDenominator>90000000.0</sld:MaxScaleDenominator>
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
         <!-- 1:35 ate 1:17 -->
         <!-- MIN: 17 000000.0 --> 
         <!-- MAX: 35 000000.0 -->           
         <sld:MinScaleDenominator>17000000.0</sld:MinScaleDenominator>
         <sld:MaxScaleDenominator>35000000.0</sld:MaxScaleDenominator>
         <sld:TextSymbolizer>
           <sld:Label>
             <ogc:PropertyName>name</ogc:PropertyName>
           </sld:Label>
           <sld:Font>
              <sld:CssParameter name="font-family">Dialog</sld:CssParameter>
              <sld:CssParameter name="font-size">20.0</sld:CssParameter>
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
        
        <!--  LINHAS    -->
        
        
        <sld:Rule>
          <!--  ate 1:45 -->
          <!-- MIN: 45 000000.0 -->           
          <sld:MinScaleDenominator>45000000.0</sld:MinScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
              <sld:CssParameter name="stroke-width">0.6</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>        
        
        
        <sld:Rule>
          <!-- 1:45 ate 1:9 -->
          <!-- MIN: 9 000000.0 -->           
          <!-- MAX: 45 000000.0 -->   
          <sld:MinScaleDenominator>9000000.0</sld:MinScaleDenominator>
          <sld:MaxScaleDenominator>45000000.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
              <sld:CssParameter name="stroke-width">0.7</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>  
        
        
        <sld:Rule>
          <!-- 1:9 ate 1:7 -->
          <!-- MIN: 7 000000.0 -->           
          <!-- MAX: 9 000000.0 -->   
          <sld:MinScaleDenominator>7000000.0</sld:MinScaleDenominator>
          <sld:MaxScaleDenominator>9000000.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
              <sld:CssParameter name="stroke-width">0.9</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>     
        
        
        <sld:Rule>
          <!-- 1:7 ate 1:4 -->
          <!-- MIN: 4 000000.0 -->           
          <!-- MAX: 7 000000.0 -->   
          <sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
          <sld:MaxScaleDenominator>7000000.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
              <sld:CssParameter name="stroke-width">1.4</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>  
        
     <sld:Rule>
         <!-- 1:4 ate 1:2 -->
         <!-- MIN: 2 000000.0 -->           
         <!-- MAX: 4 000000.0 -->           
         <sld:MinScaleDenominator>2000000.0</sld:MinScaleDenominator>       
         <sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>       
       <sld:LineSymbolizer>
         <sld:Stroke>
              <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
              <sld:CssParameter name="stroke-width">1.8</sld:CssParameter>
         </sld:Stroke>
       </sld:LineSymbolizer>
     </sld:Rule>           
        
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>
