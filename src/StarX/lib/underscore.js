/// <reference path="underscore.d.ts" />
/// <reference path="require.d.ts" />
/// <amd-dependency path="StarX/underscore" />
define(["require", "exports", "StarX/underscore"], function(require, exports) {
    
    exports._ = window['_'];
    window['_'].noConflict();
});
//# sourceMappingURL=underscore.js.map
