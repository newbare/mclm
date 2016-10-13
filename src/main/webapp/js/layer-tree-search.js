


var searchBar = {
        labelWidth: 130,
        xtype: 'triggerfield',
        fieldLabel: '',
        triggerCls: 'x-form-clear-trigger',
        onTriggerClick: function() {
            this.reset();
            this.focus();
            layerTree.clearFilter();
        },
        enableKeyEvents: true,
        listeners: {
            keyup: function() {
                var v = layerTree.down('textfield').getValue();
                layerTree.filter( v )
            },
            buffer: 250
        }
}





/*
Ext.override(Ext.data.NodeStore, {

    filter: function(filters, value) {
    	
        if (Ext.isString(filters)) {
            filters = {
                property: filters,
                value: value
            };
        }

        var me = this,
            decoded = me.decodeFilters(filters),
            i,
            length = decoded.length,
            nodes, node,
            filteredNodes;

        // Merge new filters into current filter set.
        for (i = 0; i < length; i++) {
            me.filters.replace(decoded[i]);
        }

        filters = me.filters.items;

        if (filters.length) {
            me.filterFn = Ext.util.Filter.createFilterFn(filters);

            nodes = me.data.getRange();
            filteredNodes = [];

            // Filter the existing visible nodes.
            for (i = 0, length = nodes.length; i < length; i++) {
                node = nodes[i];
                if (me.filterFn(node)) {
                    filteredNodes.push(node);
                }
                // Node did not pass the filter.
                // If it's a non-leaf, we still need it.
                else if (!node.isLeaf()) {
                    filteredNodes.push(node);
                }
            }

            // Filter the unfiltered dataset using the filter set
            me.data.clear();
            me.data.addAll(filteredNodes);

            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
        }
        me.fireEvent('filterchange', me, filters);
    },

    clearFilter: function() {
        var me = this,
            node = me.node;

        me.filters.clear();
        me.filterFn = null;
        Ext.suspendLayouts();
        me.onNodeCollapse(node, me.data.getRange(), true);
        me.onNodeExpand(node, node.childNodes, true);
        Ext.resumeLayouts(true);
    },


    // Collects child nodes to remove into the passed toRemove array.
    // When available, all descendant nodes are pushed into that array using recursion.
    handleNodeExpand: function(parent, records, toAdd) {
        var me = this,
            ln = records ? records.length : 0,
            i, record;

        // recursive is hardcoded to true in TreeView.
        if (!me.recursive && parent !== me.node) {
            return;
        }

        if (parent !== this.node && !me.isVisible(parent)) {
            return;
        }

        if (ln) {
            // The view items corresponding to these are rendered.
            // Loop through and expand any of the non-leaf nodes which are expanded
            for (i = 0; i < ln; i++) {
                record = records[i];

                //
                if (me.filterFn) {
                    if (!record.isLeaf() || me.filterFn(record)) {
                        toAdd.push(record);
                    }
                } else {

                    // Add to array being collected by recursion when child nodes are loaded.
                    // Must be done here in loop so that child nodes are inserted into the stream in place
                    // in recursive calls.
                    toAdd.push(record);
                }

                if (record.isExpanded()) {
                    if (record.isLoaded()) {
                        // Take a shortcut - appends to toAdd array
                        me.handleNodeExpand(record, record.childNodes, toAdd);
                    } else {
                        // Might be asynchronous if child nodes are not immediately available
                        record.set('expanded', false);
                        record.expand();
                    }
                }
            }
        }
    },

    // Triggered by a NodeInterface's bubbled "collapse" event.
    onNodeCollapse: function(parent, records, suppressEvent, callback, scope) {
        var me = this,
            collapseIndex = me.indexOf(parent) + 1,
            node, lastNodeIndexPlus, sibling, found;

        if (!me.recursive && parent !== me.node) {
            return;
        }

        if (me.filterFn) {
            records = Ext.Array.filter(records, me.filterFn);
        }

        // Used by the TreeView to bracket recursive expand & collapse ops.
        // The TreeViewsets up the animWrap object if we are animating.
        // It also caches the collapse callback to call when it receives the
        // end collapse event. See below.
        if (!suppressEvent) {
            me.fireEvent('beforecollapse', parent, records, collapseIndex, callback, scope);
        }

        // Only attempt to remove the records if they are there.
        // Collapsing an ancestor node *immediately removes from the view, ALL its descendant nodes at all levels*.
        // But if the collapse was recursive, all descendant root nodes will still fire their
        // events. But we must ignore those events here - we have nothing to do.
        if (records.length && me.data.contains(records[0])) {

            // Calculate the index *one beyond* the last node we are going to remove
            // Need to loop up the tree to find the nearest view sibling, since it could
            // exist at some level above the current node.
            node = parent;
            while (node.parentNode) {
                sibling = node.nextSibling;
                if (sibling) {
                    found = true;
                    lastNodeIndexPlus = me.indexOf(sibling);
                    break;
                } else {
                    node = node.parentNode;
                }
            }
            if (!found) {
                lastNodeIndexPlus = me.getCount();
            }

            // Remove the whole collapsed node set.
            me.removeAt(collapseIndex, lastNodeIndexPlus - collapseIndex);
        }

        // Triggers the TreeView's onCollapse method which calls refreshSize,
        // and fires its afteritecollapse event
        if (!suppressEvent) {
            me.fireEvent('collapse', parent, records, collapseIndex);
        }
    }
});
*/
