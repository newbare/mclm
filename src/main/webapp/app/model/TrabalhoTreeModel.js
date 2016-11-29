Ext.define('MCLM.model.TrabalhoTreeModel', {
    extend: 'Ext.data.TreeModel',
	fields: [
        { name: 'index', type: 'int' },
        { name: 'text', type: 'string' },
        { name: 'serviceUrl', type: 'string' },
        { name: 'layerName', type: 'string' },
        { name: 'originalServiceUrl', type: 'string' },
        { name: 'layerType', type: 'string' },
        { name: 'serialId', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'layerAlias', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'institute', type: 'string' },
        { name: 'idNodeParent', type: 'int' },
        { name: 'readOnly', type: 'boolean' },
        { name: 'checked', type: 'boolean' },
        { name: 'selected', type: 'boolean' }
	],

});