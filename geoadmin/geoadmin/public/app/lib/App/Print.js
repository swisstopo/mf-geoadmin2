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

    Ext.apply(this, {
        printAction: null
    });

    this.printAction = new GeoAdmin.Print({
        printPanelOptions: {
            mapPanel: mapPanel,
            renderTo: "print-panel",
            title: OpenLayers.i18n("mf.print.print.title"),
            tbar: ["->", {
                iconCls: "close-button",
                handler: function() {
                    this.printAction.printPanel.container.setVisible(false);
                    this.printAction.printPanel.hideExtent();
                },
                scope: this
            }]
        },
        toggleGroup: 'tools',
        cls: 'x-btn-no-over',
        printBaseUrl: GeoAdmin.printBaseUrl || 'print/pdf/',
        iconAlign: 'right',
        iconCls: 'print',
        enableToggle: true
    });
};
