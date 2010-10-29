/*
 * @include Map/lib/Map.js
 * @include GeoExt/widgets/MapPanel.js
 * @include App/Tools.js
 * @include Features/lib/Tooltip.js
 * @include Permalink/lib/Permalink.js
 */

Ext.namespace('App');

/**
 * Constructor: App.Map
 * Creates a {GeoExt.MapPanel} internally. Use the "mapPanel" property
 * to get a reference to the map panel.
 *
 * Parameters:
 * options - {Object} Options passed to the {GeoExt.MapPanel}.
 */
App.Map = function(options) {

    // Private

    // Public
    Ext.apply(this, {

        /**
         * APIProperty: mapPanel
         * The {GeoExt.MapPanel} instance. Read-only.
         */
        mapPanel: null
    });

    // Main
    map = new GeoAdmin.Map();
    map.switchComplementaryLayer("ch.swisstopo.pixelkarte-farbe", {
        opacity: 1.0
    });

    map.addControls([new GeoAdmin.Tooltip({
        layer: map.vector,
        autoActivate: true
    })]);

    var permalink = new GeoAdmin.PermalinkPanel({
        hidden: true
    });
    var toolbar = new App.Tools(map, permalink);
    options = Ext.apply({
        map: map,
        tbar: {
            items: toolbar.tbar
        },
        bbar: {
            items: toolbar.bbar
        },
        stateId: "map",
        prettyStateKeys: true,
        items: [permalink],
        getState: function() {
            return this.map.getState();
        },
        applyState: function(state) {
            this.map.applyState(state);
        }
    }, options);
    this.mapPanel = new GeoExt.MapPanel(options);
};
