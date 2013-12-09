/// <reference path="../../../../starx/src/StarX/lib/jquery.d.ts" />

declare var $:JQueryStatic;
declare var $:JQueryStatic;

import jQuery = module("jquery");
declare var exports;
exports.$ = jQuery;
jQuery['noConflict'](true);

export class version {
    constructor() {
        console.info(jQuery['fn'].jquery);
    }
};
