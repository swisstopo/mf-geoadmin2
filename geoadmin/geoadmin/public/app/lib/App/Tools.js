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
App.Tools = function(map, permalink) {

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
        var link = new Ext.Button({
            text: OpenLayers.i18n('permalink action'), 
            iconAlign: 'right', 
            iconCls: 'link', 
            enableToggle: true,
            toggleGroup: 'tools',
            toggleHandler: function(btn, state) {
                permalink.setVisible(state);
            }
        });
        permalink.on('hide', function(p) {
            this.toggle(false, true /* supressEvent */);
        }, link);

        return [new GeoAdmin.BaseLayerTool({map: map, slider: {width: 100}}),
                new GeoAdmin.NavigationHistory({defaults: {cls: 'x-btn-no-over'}, map: map}),
                new GeoAdmin.SwissSearchComboBox({map: map, width: 200}),
                '->', link];
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
        var c_href = "http://www.geo.admin.ch/internet/geoportal/" + OpenLayers.Lang.getCode() + "/home/geoadmin/contact.html#copyright";
        var c_text = OpenLayers.i18n('Copyright &amp; Data protection');
        return [new GeoAdmin.MousePositionBox({map: this.map}), '->',
                {xtype: 'tbtext', text: '<a target="_blank" href="http://www.geo.admin.ch/">geo.admin.ch</a>'},
                {xtype: 'tbtext', text: '&nbsp;', cls: 'pipe'}, 
                {xtype: 'tbtext', text: '<a target="_blank" href="' + c_href + '">' + c_text + '</a>'}]
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
