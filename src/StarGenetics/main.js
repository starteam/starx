/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="jsappmodel.ts" />
define(["require", "exports", "jquery", 'StarGenetics/jsappwidget', "../StarGenetics_Obsolete/state"], function(require, exports, $, JSStarGenetics, GlobalState) {
    var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

    var StarGenetics = (function () {
        function StarGenetics() {
        }
        StarGenetics.prototype.set_message = function (message, config) {
            $('#' + config.element_id).html(message);
        };

        StarGenetics.prototype.configure = function (config) {
            var state = config['state'];
            var cls = new JSStarGenetics.StarGeneticsJSAppWidget(state, config);
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
