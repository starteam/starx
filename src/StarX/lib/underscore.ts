/// <reference path="underscore.d.ts" />

declare var exports;
declare var window;

var _backup = window;

import underscore = require('StarX/underscore');
if(underscore)
{
    console.info( "StarX underscore");
}
exports._ = window['_'];
_.each( [1,2,3],function(e){ console.info(e)});
_.noConflict();
//window._ = _backup;


export class version {
    constructor() {
        console.info(jQuery['fn'].jquery);
    }
};
