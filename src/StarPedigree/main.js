/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/edXintegration.ts" />
define(["require", "exports", 'jquery', 'StarTMI/tmi', "StarX/edXintegration"], function(require, exports, $, StarTMI, integration) {
    

    var tmi = new StarTMI.TMI();

    var StarPedigree = (function () {
        function StarPedigree() {
        }
        StarPedigree.prototype.configure = function (config) {
            tmi.event('StarPedigree', 'Start');
            var edX = new integration.Integration(config);
            edX.configRaven();
            this.config = config;
            var self = this;
            var top = $('#' + config.element_id);
            var text = '';
            top.html("Welcome to " + this.config.StarX);
        };
        return StarPedigree;
    })();
    exports.StarPedigree = StarPedigree;
});
//# sourceMappingURL=main.js.map
