/// <reference path="../../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../../starx/src/StarX/lib/jquery.d.ts" />

declare var jQuery;
var $ = jQuery;

export function load(callback) {
    callback(window);
}

export function isTesting() {
    var href = document.location.href;
    var ret = href.indexOf('?starx=doTest') >= 0;
    return ret;
}

export function onsuccess(callbacks) {
    if (callbacks && callbacks['onsuccess']) {
        callbacks['onsuccess']();
    }
}
export function onerror(callbacks) {
    if (callbacks && callbacks['onerror']) {
        callbacks['onerror']();
    }
}