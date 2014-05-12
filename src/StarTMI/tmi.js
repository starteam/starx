define(["require", "exports"], function(require, exports) {
    var TMI = (function () {
        function TMI() {
            this.debug = false;
        }
        TMI.prototype.pageview = function () {
            if (this.debug) {
                console.debug("TMI:pageview");
            }
            var payload = {
                source: '_Star_TMI_',
                command: 'pageview'
            };
            top.window.postMessage(payload, '*');
        };

        TMI.prototype.event = function (category, action, label, value) {
            if (typeof action === "undefined") { action = undefined; }
            if (typeof label === "undefined") { label = undefined; }
            if (typeof value === "undefined") { value = 0; }
            if (this.debug) {
                console.debug("TMI:event c:" + category + " a:" + action + " l:" + label + " v:" + value);
            }
            var payload = {
                source: '_Star_TMI_',
                command: 'event',
                category: category,
                action: action,
                label: label,
                value: value
            };
            top.window.postMessage(payload, '*');
        };

        TMI.prototype.configure_raven = function (a, b, callback) {
            if (window['RavenConfigStarX']) {
                try  {
                    window['RavenConfigStarX'](a, b, callback);
                } catch (e) {
                    console.debug(e);
                }
            } else {
                console.debug('no raven');
            }
        };
        return TMI;
    })();
    exports.TMI = TMI;
});
