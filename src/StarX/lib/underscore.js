/// <reference path="underscore.d.ts" />
define(["require", "exports", 'StarX/underscore'], function(require, exports, underscore) {
    

    var _backup = window;

    if (underscore) {
        console.info("StarX underscore");
    }
    exports._ = window['_'];
    exports._.noConflict();

    //window._ = _backup;
    var version = (function () {
        function version() {
            console.info(jQuery['fn'].jquery);
        }
        return version;
    })();
    exports.version = version;
    ;
});
//# sourceMappingURL=underscore.js.map
