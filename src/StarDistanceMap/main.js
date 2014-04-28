/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarTMI/tmi.ts" />
define(["require", "exports", "jquery", "StarTMI/tmi", "StarDistanceMap/widget"], function(require, exports, $, StarTMI, WidgetModule) {
    

    var tmi = new StarTMI.TMI();

    var old_value = '';
    var demo_config = {
        display_map: 'true',
        genes: [
            {
                id: 'M1',
                name: 'M-1'
            },
            {
                id: 'M2',
                name: 'M-2'
            },
            {
                id: 'M3',
                name: 'M-3'
            },
            {
                id: 'M4',
                name: 'M-4'
            },
            {
                id: 'M5',
                name: 'M-5'
            },
            {
                id: 'M6',
                name: 'M-6'
            },
            {
                id: 'le',
                name: 'le'
            },
            {
                id: 'xy',
                name: 'XY'
            }
        ],
        gene_groups: [
            {
                title: 'Strains',
                genes: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6']
            },
            {
                title: 'Mapping Strains',
                genes: ['le', 'xy']
            }
        ],
        color_genes: true,
        chromosomes: [
            { name: 'Chromosome 1', sex_linked: false },
            { name: 'Chromosome 2', sex_linked: false }
        ],
        centromere: false,
        callback: function (obj) {
            console.info(obj);
            console.info(obj.ascii);
            if (old_value != obj.ascii) {
                tmi.event('StarX_DistanceMatrix', "DemoConfig", obj.ascii);
                old_value = obj.ascii;
            }
        }
    };
    var StarDistanceMap = (function () {
        function StarDistanceMap() {
        }
        StarDistanceMap.prototype.input_div = function (text, state) {
            var jq = $('[name=' + this.config.state + ']');
            jq.show().text(text);
            var ret = $('#' + jq.attr('inputid'));
            ret.attr('value', state);
        };

        StarDistanceMap.prototype.get_input = function () {
            var jq = $('[name=' + this.config.state + ']');
            var ret = $('#' + jq.attr('inputid'));
            var state = ret.attr('value');
            try  {
                if (state) {
                    var s = JSON.parse(state);
                    jq.show().text(s['ascii']);
                    return s;
                }
            } catch (e) {
                console.info(e);
            }
            return undefined;
        };

        StarDistanceMap.prototype.input_element = function () {
            console.info("input element");
            try  {
                throw "new";
            } catch (e) {
                console.info(e);
            }
            var jq = $('[name=' + this.config.state + ']');
            console.info(jq);
            var ret = $('#' + jq.attr('inputid'));
            console.info(ret);
            console.info(ret.attr('value'));
            return ret;
        };

        StarDistanceMap.prototype.callback = function (data) {
            console.info(data);
            this.input_div(data['ascii'], JSON.stringify(data));
            $('#' + this.config.element_id + '_output').text(data['ascii']);
        };

        StarDistanceMap.prototype.configure_widget = function (selector, context, callback) {
            new WidgetModule.GeneDistanceWidget(context.config, $(selector), callback);
        };

        StarDistanceMap.prototype.configure = function (config) {
            var self = this;
            this.config = config;
            var context = config;
            if (!context.config) {
                context.config = demo_config;
            }
            config.widget_id = config.element_id + '_widget';
            var display_map = '';
            if (context.config['display_map']) {
                config.output_id = config.element_id + '_output';
                display_map = 'Your map:<span style="height: 1.5em" id="' + context.output_id + '"></span>';
            }
            $('#' + config.element_id).html('<div>' + display_map + '<span id="' + context.widget_id + '"></span></div>');
            var saved = this.get_input();
            if (saved && context.config) {
                context.config.saved = saved;
            }
            this.configure_widget($('#' + context.widget_id), context, function (data) {
                self.callback(data);
            });

            tmi.event('StarX_DistanceMatrix', context['group'] ? context['group'] : "NoGroup", "Start");
        };
        return StarDistanceMap;
    })();
    exports.StarDistanceMap = StarDistanceMap;

    if (false) {
        var x = new StarDistanceMap();
    }
});
//# sourceMappingURL=main.js.map
