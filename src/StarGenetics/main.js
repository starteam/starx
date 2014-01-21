/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="jsappmodel.ts" />
define(["require", "exports", "jquery", 'StarGenetics/jsappwidget', "StarGenetics/state"], function(require, exports, $, JSStarGenetics, GlobalState) {
    var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

    var StarGenetics = (function () {
        function StarGenetics() {
            this.context = {};
        }
        StarGenetics.prototype.save = function (val) {
            var jq = $('[name=' + this.config.state + ']');
            var ret = $('#' + jq.attr('inputid'));
            ret.attr('value', encodeURI(val));
            if (this.config.unsaved_message) {
                jq.show().text(this.config.unsaved_message);
            }
        };

        StarGenetics.prototype.load = function () {
            var jq = $('[name=' + this.config.state + ']');
            var ret = $('#' + jq.attr('inputid'));
            try  {
                return decodeURI(ret.attr('value'));
            } catch (e) {
                console.debug("value can not be decoded, failing back on raw");
                return ret ? ret.attr('value') : '';
            }
        };

        StarGenetics.prototype.configure = function (config) {
            var self = this;
            this.config = config;
            if (config['state']) {
                // enable edX integration
                this.context['io'] = {
                    load: function () {
                        return self.load();
                    },
                    save: function (state) {
                        self.save(state);
                    }
                };
            } else {
                this.context['io'] = {
                    load: function () {
                        console.info("StarGenetics IO not enabled.");
                        return null;
                    },
                    save: function (state) {
                        console.info("StarGenetics IO not enabled.");
                    }
                };
            }

            console.info("StarGenetics/main.ts");
            console.info(config);

            var cls = new JSStarGenetics.StarGeneticsJSAppWidget(this.context, config);
            cls.run();
        };
        return StarGenetics;
    })();
    exports.StarGenetics = StarGenetics;

    if (false) {
        var x = new StarGenetics();
    }
});
//# sourceMappingURL=main.js.map
