/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
define(["require", "exports", 'jquery', 'StarTMI/tmi', "StarX/edXintegration"], function(require, exports, $, StarTMI, integration) {
    var tmi = new StarTMI.TMI();

    var StarMinimal = (function () {
        function StarMinimal() {
            this.context = {};
        }
        StarMinimal.prototype.configure = function (config) {
            tmi.event('StarPedigree', 'Start');
            var edX = new integration.Integration(config);
            edX.configRaven();

            this.context.edX = edX;
            this.context.TMI = tmi;
            this.context.config = config;
            var top = $('#' + config.element_id);

            // here comes rest of your code
            // you are provided with CONTEXT
            // context has:
            //  edX - edX integration
            //  TMI - Google Analytics integration
            //  config - Config provided by StarX
            top.html("Welcome to " + this.context.config.StarX);
        };
        return StarMinimal;
    })();
    exports.StarMinimal = StarMinimal;
});
//# sourceMappingURL=main.js.map
