define(["require", "exports", "StarX/underscore"], function(require, exports) {
    var _backup = window._;
    var underscore = require('StarX/underscore');

    exports._ = _;
    window._ = _backup;
    _.noConflict();

    var version = (function () {
        function version() {
            console.info(jQuery['fn'].jquery);
        }
        return version;
    })();
    exports.version = version;
    ;
});
//@ sourceMappingURL=underscore.js.map
