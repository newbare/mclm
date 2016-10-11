/*
 * Monta a aba principal do sistema, contendo o mapa, a arvore lateral, o rodape
 * e a barra laretal de ferramentas.
 * 
 * Precisa dos arquivos :
 * 		painel-central.js
 * 		painel-inferior.js
 * 		painel-esquerdo.js
 * 		painel-direito.js
 * 
 */

var aba01 = Ext.create('Ext.Panel',{
    layout: 'border',
    title: 'Mapa',
    id:'aba01',
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: false,
        bodyPadding: 0
    },
    items : [ painelInferior, painelCentral, painelEsquerdo, painelDireito ]
});
