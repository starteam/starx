/// <reference path="underscore.d.ts" />
/// <reference path="require.d.ts" />
/// <amd-dependency path="StarX/underscore" />
define(["require", "exports", "StarX/underscore"], function(require, exports) {
    
    var _backup = window;

    //
    var underscore = require(['StarX/underscore']);
    console.info("underscore is" + underscore);
    console.info(underscore);
    if (underscore) {
        console.info("StarX underscore");
    }
    exports._ = window['_'];
    var _ = exports._;
    _.each([1, 2, 3], function (e) {
        console.info(e);
    });
    _.noConflict();

    (function (__) {
        var version = (function () {
            function version() {
            }
            version.prototype.to = function () {
            };
            return version;
        })();
        __.version = version;
    })(exports.__ || (exports.__ = {}));
    var __ = exports.__;
});
//# sourceMappingURL=underscore.js.map
