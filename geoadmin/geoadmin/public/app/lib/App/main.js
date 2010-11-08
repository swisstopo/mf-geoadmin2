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
GeoAdmin.webServicesUrl = "http://mf-chsdi0t.bgdi.admin.ch/main/wsgi";

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
    
    Ext.get('expand-collapse-side-panel').on('click', function(evt, el) {
        var p = Ext.getCmp('side-panel');
        el = Ext.get(el);
        if (p.collapsed) {
            p.expand();
            el.replaceClass('side-panel-collapsed', 'side-panel-expanded');
        } else {
            p.collapse();
            el.replaceClass('side-panel-expanded', 'side-panel-collapsed');
        }
    });

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
                layout: 'vbox',
                layoutConfig: {
                    align : 'stretch'
                },
                border: false,
                tbar: [{
                    id: 'side-panel-collapse',
                    cls: 'x-btn-no-over',
                    iconCls: 'collapse',
                    iconAlign: "right",
                    text: OpenLayers.i18n('Full map'),
                    handler: function(b) {
                        Ext.getCmp('side-panel').collapse();

                        var el = Ext.get('expand-collapse-side-panel');
                        el.replaceClass('side-panel-expanded', 'side-panel-collapsed');
                    }
                }],
                defaults: {
                    border: false
                },
                items: [new GeoAdmin.LayerTree({
                    map: mapPanel.map
                }), {
                    xtype: 'tabpanel',
                    flex: 1,
                    plain: true,
                    baseCls: 'side-panel-tab',
                    tabMargin: 0,
                    activeTab: 0,
                    items: [{
                        title: OpenLayers.i18n('Catalog'),
                        autoScroll: true,
                        items: [{
                            xtype: 'ga_catalogtree',
                            map: mapPanel.map
                        }]
                    }, {
                        title: OpenLayers.i18n('Search'),
                        bodyStyle: 'padding: 3px;',
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
