/*
 * @include GeoExt/widgets/Action.js
 * @include GeoExt/data/PrintProvider.js
 * @include GeoExt/plugins/PrintProviderField.js
 * @include GeoExt.ux/SimplePrint.js
 * @include OpenLayers/Feature/Vector.js
 * @include OpenLayers/Geometry/Polygon.js
 * @include OpenLayers/Layer/Vector.js
 * @include OpenLayers/Renderer/SVG.js
 * @include OpenLayers/Renderer/VML.js
 * @include OpenLayers/Control/TransformFeature.js
 */
Ext.namespace('App');

/**
 * Constructor: App.Print
 * Creates a {GeoExt.ux.SimplePrint} internally. Use the "printPanel"
 * property to get a reference to this print panel.
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
        "beforeencodelayer": function(provider, layer) {
            // return false to exclude 'layer' from the printing
            return true;
        },
        "encodelayer": function(provider, layer, encodedLayer) {
            // Triggered when a layer is encoded. This can be used to modify 
            // the encoded low-level layer object that will be sent to the 
            // print service.
        }
    };

    // Public

    Ext.apply(this, {
        
        /**
         * APIProperty: printPanel
         * {GeoExt.ux.SimplePrint} The print panel. Read-only.
         */
        printPanel: null
    });

    // Main

    options = Ext.apply({
        mapPanel: mapPanel,
        printProvider: new GeoExt.data.PrintProvider({
            capabilities: printCapabilities,
            listeners: printEvents
        }),
        items: [{
            xtype: 'textfield',
            name: 'title',
            fieldLabel: OpenLayers.i18n("Print.titlefieldlabel"),
            value: OpenLayers.i18n("Print.titlefieldvalue"),
            plugins: new GeoExt.plugins.PrintProviderField()
        }, {
            xtype: 'textarea',
            name: 'comment',
            fieldLabel: OpenLayers.i18n("Print.commentfieldlabel"),
            value: OpenLayers.i18n("Print.commentfieldvalue"),
            plugins: new GeoExt.plugins.PrintProviderField()
        }],
        dpiText: OpenLayers.i18n("Print.dpifieldlabel"),
        scaleText: OpenLayers.i18n("Print.scalefieldlabel"),
        rotationText:  OpenLayers.i18n("Print.rotationfieldlabel"),
        printText: OpenLayers.i18n("Print.printbuttonlabel"),
        creatingPdfText: OpenLayers.i18n("Print.waitingmessage")
    }, options); 

    this.printPanel = new GeoExt.ux.SimplePrint(options);
};
