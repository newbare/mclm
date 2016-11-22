Ext.define('MCLM.model.TrabalhoTreeModel', {
    extend: 'Ext.data.Model',
	fields: [
        { name: 'index', type: 'int' },
        { name: 'text', type: 'string' },
        { name: 'serviceUrl', type: 'string' },
        { name: 'layerName', type: 'string' },
        { name: 'originalServiceUrl', type: 'string' },
        { name: 'layerType', type: 'string' },
        { name: 'serialId', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'readOnly', type: 'boolean' }
	],

});