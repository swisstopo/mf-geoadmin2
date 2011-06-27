/*
 * @requires GeoExt/data/ScaleStore.js
 * @requires BaseLayerTool/lib/BaseLayerTool.js
 * @requires MousePosition/lib/MousePositionBox.js
 * @requires NavigationHistory/lib/NavigationHistory.js
 * @requires SwissSearch/lib/SwissSearchComboBox.js
 * @requires OpenLayers/Rule.js
 * @requires OpenLayers/Control/Measure.js
 * @requires OpenLayers/Handler/Path.js
 * @requires OpenLayers/Handler/Polygon.js
 * @requires GeoExt.ux/MeasureArea.js
 * @requires GeoExt.ux/MeasureLength.js
 * @requires AdvancedFunctions/lib/AdvancedFunctions.js
 * @requires Measure/lib/Measure.js
 * @requires LayerManager/ux/widgets/LayerManagerWindow.js
 * 
 * @requires Redlining/ux/FeatureEditing/ux/widgets/FeatureEditingControler.js
 * @requires Redlining/ux/FeatureEditing/ux/widgets/form/FeatureEditingPanel.js
 * @requires Redlining/ux/FeatureEditing/ux/widgets/form/RedLiningPanel.js
 * @requires Redlining/ux/FeatureEditing/ux/widgets/form/FeaturePanel.js
 * @requires Redlining/ux/FeatureEditing/ux/data/FeatureEditingDefaultStyleStore.js
 * @requires Redlining/ux/FeatureEditing/ux/widgets/plugins/ImportFeatures.js
 * @requires Redlining/ux/FeatureEditing/ux/widgets/plugins/ExportFeatures.js
 * @requires Redlining/ux/FeatureEditing/ux/widgets/plugins/ExportFeature.js
 * @requires Redlining/ux/FeatureEditing/ux/widgets/plugins/CloseFeatureDialog.js
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
            cls: 'x-btn-no-over',
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

        var sketchSymbolizers = {
            "Point": {
                pointRadius: 4,
                graphicName: "square",
                fillColor: "white",
                fillOpacity: 1,
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeColor: "#333333"
            },
            "Line": {
                strokeWidth: 2,
                strokeOpacity: 1,
                strokeColor: "#FF0000",
                strokeDashstyle: "dash"
            },
            "Polygon": {
                strokeWidth: 2,
                strokeOpacity: 1,
                strokeColor: "#FF0000",
                fillColor: "white",
                fillOpacity: 0.3
            }
        };
        var styleMap = new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {
                rules: [new OpenLayers.Rule({symbolizer: sketchSymbolizers})]
            })
        });
        
        var measureLength = new GeoExt.ux.MeasureLength({
            autoDeactivate: true,
            styleMap: styleMap,
            map: map,
            toggleGroup: 'tools',
            text:OpenLayers.i18n('Measure.MeasureLength'),
            tooltip: OpenLayers.i18n('Measure.MeasureLength.ToolTip')

        });

        var measureArea = new GeoExt.ux.MeasureArea({
            autoDeactivate: true,
            styleMap: styleMap,
            map: map,
            decimals: 0,
            toggleGroup: 'tools',
            text: OpenLayers.i18n('Measure.MeasureArea'),
            tooltip: OpenLayers.i18n('Measure.MeasureArea.ToolTip')
        });

        var measurePanel = new Ext.Panel({
            title: OpenLayers.i18n('Measure.title'),
            height: 70,
            tbar: [measureLength, measureArea],
            collapsed :true
        });

        var importPanel = new Ext.Panel({
            title: OpenLayers.i18n('ImportExport.title'),
            height: 70,
            items: [
                new GeoExt.ux.LayerManagerImportPanel({
                    map: map,
                    defaultFormat: 'KML'
                })
            ],
            collapsed :true
        });

        var redLiningPanel = new GeoExt.ux.form.RedLiningPanel({
            title: OpenLayers.i18n("RedLining Panel"),
            "import": false,
            "export": false,
            map: map,
            popupOptions: {anchored: false, unpinnable: false, draggable: true}
        });


        var advancedTools = new GeoAdmin.AdvancedFunctions({

            layoutConfig: {
                titleCollapse: false,
                animate: true,
                activeOnTop: true
            },
            items: [
                measurePanel,
                importPanel,
                redLiningPanel
            ]
        });

        return [new GeoAdmin.BaseLayerTool({map: map, slider: {width: 100}}),
            new GeoAdmin.NavigationHistory({defaults: {cls: 'x-btn-no-over'}, map: map}),
            new GeoAdmin.SwissSearchComboBox({map: map, width: 200}),
            '->', link,
            advancedTools];
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
        var p_href = "http://www.geo.admin.ch/internet/geoportal/" + OpenLayers.Lang.getCode() + "/home.html";
        return [new GeoAdmin.MousePositionBox({map: this.map}), '->',
            {xtype: 'tbtext', text: '<a target="_blank" href="' + p_href + '">geo.admin.ch</a>'},
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
