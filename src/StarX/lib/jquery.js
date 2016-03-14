/// <reference path="../../StarX/lib/jquery.d.ts" />
/// <amd-dependency path="StarX/lib/jquery.ui.touch-punch" />
define(["require", "exports", "jquery", "StarX/lib/jquery.ui.touch-punch"], function (require, exports, jQuery) {
    "use strict";
    exports.$ = jQuery;
    var version = (function () {
        function version() {
            console.info(jQuery['fn'].jquery);
        }
        return version;
    }());
    exports.version = version;
    ;
});
//# sourceMappingURL=jquery.js.map