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
	//lazyFill: true,
	fields: [
	            { name: 'index', type: 'int' },
	            { name: 'text', type: 'string' },
	            { name: 'serviceUrl', type: 'string' },
	            { name: 'layerName', type: 'string' },
	            { name: 'originalServiceUrl', type: 'string' },
	            { name: 'serialId', type: 'string' }
	         ],
	proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        }, 
        api: {
            read: 'getLayersTreeNode',
            create: 'createLayersTreeNode',
            update: 'updateLayersTreeNode',
            destroy: 'destroyLayersTreeNode'
        },        
        writer: {
            type:'json',
            allowSingle:false,
            writeAllFields : false,
            encode:true,
            rootProperty:'data'
        }        
    },
   
    root: {
        text: 'Camadas',
        id: 0,
        index:0,
        expanded: true
    }   
  
    
});