/// <reference path="knockout-3.1.0.js" />
define(["require", "exports", "../../StarX/lib/knockout-3.1.0.js"], function(require, exports, knockout) {
    exports.ko = knockout;

    var version = (function () {
        function version() {
            console.info("Hi");
        }
        return version;
    })();
    exports.version = version;
    ;
});
//# sourceMappingURL=knockout.js.map
