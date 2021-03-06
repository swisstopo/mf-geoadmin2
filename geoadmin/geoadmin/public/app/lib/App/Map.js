/*
 * @include Map/lib/Map.js
 * @include Map/lib/MapPanel.js
 * @include GeoExt/widgets/MapPanel.js
 * @include App/Tools.js
 * @include Features/lib/Tooltip.js
 * @include Permalink/lib/Permalink.js
 * @include ContextPopup/lib/ContextPopup.js
 * @include BaseTools/lib/BaseTools.js
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
    map.overviewMapCtrl.maximizeControl();
    map.addControls([
        new GeoAdmin.Tooltip({
            layer: map.vector,
            autoActivate: true
        }),
        new GeoAdmin.ContextPopup({
            handleRightClicks: true,
            map: map,
            zoomWheelEnabled: false
        })
    ]);

    var toolbar = new App.Tools(map);

    options = Ext.apply({
        map: map,
        cls: "geoadmin-mappanel",
        tbar: {
            items: toolbar.tbar
        },
        bbar: {
            items: toolbar.bbar
        },
        zoom: 1
    }, options);
    this.mapPanel = new GeoAdmin.MapPanel(options);

    var tools = new GeoAdmin.BaseTools({
        mapPanel: this.mapPanel,
        print: {
            configureLegend:false
	}
    });
    tools.addToToolbar(this.mapPanel.getTopToolbar());
};
