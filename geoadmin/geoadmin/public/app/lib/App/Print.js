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
            mapPanel: mapPanel
        },
        printBaseUrl: 'print/pdf/',
//         windowOptions: {
//             listeners: {
//                 "hide": function(w) {
//                     this.printAction.toggle();
//                 }.createDelegate(this)
//             }
//         },
        iconAlign: 'right',
        iconCls: 'print',
        enableToggle: true
    });
};
