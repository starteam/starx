/// <reference path="underscore.d.ts" />
/// <reference path="require.d.ts" />
/// <amd-dependency path="StarX/underscore" />

var _backup = window._;
var underscore = require('StarX/underscore');
declare var exports;
exports._ = _;
window._ = _backup;


export class version {
    constructor() {
        console.info(jQuery['fn'].jquery);
    }
};
