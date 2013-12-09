/// <reference path="underscore.d.ts" />
/// <reference path="require.d.ts" />
/// <amd-dependency path="StarX/underscore" />

declare var exports;
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
    console.info(e)
});
_.noConflict();

export module __ {
    export class version {
        to():any {
        }
    }
}

