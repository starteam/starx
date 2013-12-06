/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarTMI/tmi.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="StarTMI/tmi" />
define(["require", "exports", "jquery", 'StarTMI/tmi', "jquery", "StarTMI/tmi"], function(require, exports, $, TMI) {
    

    var StarTMI = (function () {
        function StarTMI() {
        }
        StarTMI.prototype.configure = function (config) {
            console.info("configure StarTMI");
            console.info(config);
            this.element = $('#' + config.element_id);
            this.element.html("StarTMI demo");
            this.tmi = new TMI.TMI();
            this.tmi.pageview();
        };

        StarTMI.prototype.pageview = function (q) {
            this.tmi.pageview();
        };
        return StarTMI;
    })();
    exports.StarTMI = StarTMI;
});
//# sourceMappingURL=main.js.map
