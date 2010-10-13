/*
 * @include App/Map.js
 * @include App/Print.js
 * @include LayerTree/lib/LayerTree.js
 * @include CatalogTree/lib/CatalogTree.js
 * @include BodSearch/lib/BodSearchComboBox.js
 */

/*
 * This file represents the application's entry point.
 * OpenLayers and Ext globals are set, and the page
 * layout is created.
 */

Ext.ns("GeoAdmin");
//GeoAdmin.webServicesUrl = "http://mf-chsdi.bgdi.admin.ch";
GeoAdmin.webServicesUrl = "http://mf-chsdi0t.bgdi.admin.ch";

window.onload = function() {

    /*
     * Setting of OpenLayers global vars.
     */

    var parameters = OpenLayers.Util.getParameters();

    OpenLayers.Lang.setCode(parameters.lang);
    OpenLayers.Number.thousandsSeparator = ' ';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;

    /*
     * Setting of Ext global vars.
     */
    Ext.QuickTips.init();

    /*
     * Initialize the application.
     */

    var mapPanel = (new App.Map({
        border: false,
        region: "center",
        bodyStyle: 'border: 1px solid black;'
    })).mapPanel;

    var header = {
        xtype: 'box',
        region: 'north',
        contentEl: 'header',
        hidden: !!(parameters.noHeader)
    };

    var printAction = new App.Print(mapPanel).printAction;

    mapPanel.getTopToolbar().add(printAction);

    // the viewport
    new Ext.Viewport({
        layout: "border",
        items: [
            header,
            mapPanel,
            {
                region: 'west',
                id: 'side-panel',
                animCollapse: false,
                width: 300,
                border: false,
                tbar: ['->', {
                    id: 'side-panel-collapse',
                    cls: 'x-btn-no-over',
                    iconCls: 'collapse',
                    tooltip: 'fixme',
                    handler: function(b) {
                        Ext.getCmp('side-panel').collapse();
                        b.hide();
                        Ext.getCmp('side-panel-expand').show();
                    }
                }],
                defaults: {
                    border: false
                },
                items: [new GeoAdmin.LayerTree({
                    map: mapPanel.map
                }), {
                    xtype: 'tabpanel',
                    plain: true,
                    baseCls: 'side-panel-tab',
                    tabMargin: 0,
                    activeTab: 0,
                    items: [{
                                title: OpenLayers.i18n('Catalog'),
                                autoScroll: true,
                                autoHeight: true,
                                items: [{
                                    xtype: 'ga_catalogtree',
                                    map: mapPanel.map    
                                }]
                            }, {
                                title: OpenLayers.i18n('Search'),
                                bodyStyle: 'padding: 3px;',
                                autoHeight: true,
                                layout: 'anchor',
                                items: [{
                                    xtype: 'ga_bodsearchcombo',
                                    anchor: '100%',
                                    map: mapPanel.map
                                }]
                          }]
                }]
            }
        ]
    });
};
