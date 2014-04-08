/// <reference path="../../StarX/lib/jquery.d.ts" />
/// <amd-dependency path="jquery-ui" />
/// <amd-dependency path="../../StarX/jquery.ui.touch-punch" />

declare var $:JQueryStatic;

import jQuery = require("jquery");
declare var exports;
exports.$ = jQuery;

export class version {
    constructor() {
        console.info(jQuery['fn'].jquery);
    }
};
