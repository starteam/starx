/// <reference path="underscore.d.ts" />
/// <reference path="require.d.ts" />
/// <amd-dependency path="StarX/underscore" />
define(["require", "exports", "StarX/underscore"], function (require, exports) {
    "use strict";
    exports._ = window['_'];
    if (window['_'] && window['_'].noConflict) {
        window['_'].noConflict();
    }
    if (!window['_']) {
        window['_'] = exports._;
    }
});
//# sourceMappingURL=underscore.js.map