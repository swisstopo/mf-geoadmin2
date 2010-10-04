/*
 * @include Print/lib/Print.js
 */
Ext.namespace('App');

/**
 * Constructor: App.Print
 *
 * Parameters:
 * mapPanel - {GeoExt.MapPanel} The map panel the print panel is connect to.
 * options - {Object} Options passed to the {GeoExt.ux.SimplePrint}.
 */
App.Print = function(mapPanel, options) {

    // Private

    /**
     * PrintProvider event listener.
     * see: http://geoext.org/lib/GeoExt/data/PrintProvider.html#events
     */
    var printEvents = {
        "beforeprint": function(provider, map, pages, options) {
            var overrides = {
                dataOwner: map.attribution()
            };
            overrides['lang' + OpenLayers.Lang.getCode()] = true;

            Ext.applyIf(pages[0].customParams, overrides);
        }
    };

    // Public

    Ext.apply(this, {
        printAction: null
    });

    this.printAction = new GeoAdmin.Print({
        printPanelOptions: {
            mapPanel: mapPanel,
            printProvider: new GeoExt.data.PrintProvider({
                capabilities: printCapabilities,
                baseParams: {
                    url: printCapabilities.createURL
                },
                listeners: printEvents
            })
        },
        iconAlign: 'right',
        iconCls: 'print',
//      cls: 'x-btn-no-over',
        enableToggle: true
    });
};
