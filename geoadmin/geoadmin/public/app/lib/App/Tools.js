/*
 * @requires GeoExt/data/ScaleStore.js
 * @requires BaseLayerTool/lib/BaseLayerTool.js
 * @requires MousePosition/lib/MousePositionBox.js
 * @requires NavigationHistory/lib/NavigationHistory.js
 * @requires SwissSearch/lib/SwissSearchComboBox.js
 */

Ext.namespace('App');

/**
 * Constructor: App.Tools
 * Creates an {Ext.Toolbar} with tools. Use the "tbar" or "bbar" property
 * to get a reference to the top or bottom toolbar.
 *
 * Parameters:
 * map - {OpenLayers.Map} The map object.
 */
App.Tools = function(map) {

    // Private

    /**
     * Method: getTbarItems
     * Return the top toolbar items.
     *
     * Parameters:
     * map - {OpenLayers.Map} The map instance.
     *
     * Returns:
     * {Array} An array of toolbar items.
     */
    var getTbarItems = function(map) {
        var expand = {
            id: 'side-panel-expand',
            iconCls: 'expand',
            cls: 'x-btn-no-over',
            hidden: true,
            handler: function(b) {
                Ext.getCmp('side-panel').expand();
                b.hide();
                Ext.getCmp('side-panel-collapse').show();
            }
        };
        return [expand, 
                new GeoAdmin.BaseLayerTool({map: map, slider: {width: 100}}),
                new GeoAdmin.NavigationHistory({map: map}).items,
                new GeoAdmin.SwissSearchComboBox({map: map, width: 200}),
                '->',
                {text: 'link', iconAlign: 'right', iconCls: 'link'},
                {text: 'print', iconAlign: 'right', iconCls: 'print'}];
    };

    /**
     * Method: getBbarItems
     * Return the bottom toolbar items.
     *
     * Parameters:
     * map - {OpenLayers.Map} The map instance.
     *
     * Returns:
     * {Array} An array of toolbar items.
     */
    var getBbarItems = function(map) {
        var scale = {
            xtype: 'combo',
            store: new GeoExt.data.ScaleStore({map: map}),
            tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
            editable: false,
            mode: 'local',
            triggerAction: 'all',
            map: map,
            listeners: {
                select: function(combo, record, index) {
                    combo.map.zoomTo(record.get('level'));
                }
            }
        };
        return [scale, ' ',
                new GeoAdmin.MousePositionBox({map: this.map}), '->',
                {xtype: 'tbtext', text: '<a href="http://www.geo.admin.ch/">geo.admin.ch</a>'},
                {xtype: 'tbtext', text: '&nbsp;', cls: 'pipe'}, 
                {xtype: 'tbtext', text: '<a href="http://www.geo.admin.ch/">geo.admin.ch</a>'}]
    };

    // Public

    Ext.apply(this, {

        /**
         * APIProperty: tbar
         * {Ext.Toolbar} The top toolbar instance. Read-only.
         */
        tbar: null,

        /**
         * APIProperty: bbar
         * {Ext.Toolbar} The bottom toolbar instance. Read-only.
         */
        bbar: null
    });

    // Main
    this.tbar = getTbarItems(map);

    this.bbar = getBbarItems(map);
};
