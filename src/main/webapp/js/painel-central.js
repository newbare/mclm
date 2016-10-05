/*
 * 
 * Monta o painel central da aba 01
 * que contem o mapa.
 * Eh chamado pelo arquivo aba01.js
 * Precisa das configuracoes recebidas pelo Ajax efetuado
 * no arquivo index.html ( getConfig ).
 * 
 */

var map = null;


var painelCentral = new Ext.Panel({
   collapsible: false,
   region: 'center',
   margin: '0 0 0 0',
   layout:'fit',
   id: 'painelCentral',
   xtype:'panel',
   listeners:{
        resize: function () {
            map.updateSize();
        }
   }            	            
});


