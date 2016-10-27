Ext.define('MCLM.store.ExternalSource', {
    extend: 'Ext.data.Store',

    alias: 'store.externalsource',
    
	proxy: {
        type: 'ajax',
        url: 'getExternalSources',
        reader: {
            type: 'json',
            rootProperty:'servers',
            totalProperty: 'totalCount'
        }        
	},
    fields: [
         {name:'idServer', type:'int'},    
         {name:'name', type:'string'},
         {name:'url', type:'string'},
         {name:'version', type:'string'}
    ],
	autoLoad: true,
	listeners: {
        load: function(store, records){
        	// Quando o store carrega os dados
    	}			
	}
}); 