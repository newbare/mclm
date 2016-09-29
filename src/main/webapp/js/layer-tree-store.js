/*
 * Responsavel por solicitar os dados da arvore 
 * ao servidor por meio da URL "getLayersTreeNode", que deve retornar o JSON de
 * determinado nivel da arvore, controlado pelo atributo do pai "ID".
 * Ex: Inicialmente, pega todos que possuem ID = 0.
 * 		Ao clicar em un nó para expandir, pede todos que possuem o ID 
 * 		do no que esta sendo aberto como pai ( parent_id ).
 */

var layerStore = Ext.create('Ext.data.TreeStore', {
	autoSync:true,
	fields: [
	            
	            { name: 'index', type: 'int' },
	            { name: 'text', type: 'string' },
	            { name: 'serviceUrl', type: 'string' },
	            { name: 'layerName', type: 'string' },
	            { name: 'originalServiceUrl', type: 'string' }
	         ],
	proxy: {
        type: 'ajax',
        url: 'getLayersTreeNode',
        reader: {
            type: 'json'
        },        
        writer: {
            type:'json',
            allowSingle:false,
            encode:true,
            rootProperty:'data'
        }        
    },
   
    root: {
        text: 'Camadas',
        id: 0,
        index:0,
        expanded: true
    },
    listeners : {
        write: function(store, operation, opts){
        	alert("Fired!");
        }
    }
    
});