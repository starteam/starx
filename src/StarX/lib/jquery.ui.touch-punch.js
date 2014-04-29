/// <reference path="../../StarX/lib/jquery.d.ts" />
/// <amd-dependency path="jquery-ui" />
/// <amd-dependency path="../../StarX/jquery.ui.touch-punch" />
define(["require", "exports", "jquery", "jquery-ui", "../../StarX/jquery.ui.touch-punch"], function(require, exports, jQuery) {
    

    exports.$ = jQuery;

    var version = (function () {
        function version() {
            console.info(jQuery['fn'].jquery);
        }
        return version;
    })();
    exports.version = version;
    ;
});
//# sourceMappingURL=jquery.ui.touch-punch.js.map
