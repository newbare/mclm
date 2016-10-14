function getStoreColumnsFromJson( obj ) {
    var keys = [];
    for (var key in obj) {
        if ( obj.hasOwnProperty(key) ) {
            keys.push({name : key});
        }
    }
    return keys;	
}

function getGridColumnsFromJson( obj ) {
    var keys = [];
    for (var key in obj) {
        if ( obj.hasOwnProperty(key) ) {
            keys.push({text: key, dataIndex: key});
        }
    }
    return keys;	
}

function createGrid( layerName, store, columnNames ) {
	var dummyGrid = Ext.create('Ext.grid.Panel', {
		border: true,
		title : layerName,
		store : store,
	    frame: false,
	    margin: "10 0 0 0", 
	    flex:1,
	    loadMask: true,
	    columns:columnNames,
		bbar: Ext.create('Ext.PagingToolbar', {
		    store: store,
		    displayInfo: true,
		    displayMsg: 'Displaying topics {0} - {1} of {2}',
		    emptyMsg: "No topics to display",
		    inputItemWidth: 35
		}),	    
	});
	store.loadPage(1);
	return dummyGrid;
}

function createStore( storeData, columns ) {
	var arrData = [];
	var theData = storeData;
	if ( !$.isArray( storeData ) ) {
		arrData.push( storeData );
		theData = arrData;
	} 
	
	var store =  Ext.create('Ext.data.Store',{
        pageSize: 10,
        fields: columns,
		//autoLoad: true,
		data: theData
	}); 	
	return store;
}

function addGrid( layerName, data ) {
	
	var storeColumns = getStoreColumnsFromJson( data[0] );   
	var gridColumns = getGridColumnsFromJson( data[0] );

	var store = createStore( data, storeColumns );
	var grid = createGrid( layerName, store, gridColumns );
	aba02.add( grid );
}


var aba02 = Ext.create('Ext.Panel', {
	title: 'Informações',
    scrollable: true,
    scroll: 'both',    
    html : ''
});
