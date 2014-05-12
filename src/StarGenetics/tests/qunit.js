/// <reference path="../../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../../starx/src/StarX/lib/jquery.d.ts" />
define(["require", "exports"], function(require, exports) {
    
    var $ = jQuery;

    function load(callback) {
        callback(window);
    }
    exports.load = load;

    function isTesting() {
        var href = document.location.href;
        var ret = href.indexOf('?starx=doTest') >= 0;
        return ret;
    }
    exports.isTesting = isTesting;

    function onsuccess(callbacks) {
        if (callbacks && callbacks['onsuccess']) {
            callbacks['onsuccess']();
        }
    }
    exports.onsuccess = onsuccess;
    function onerror(callbacks) {
        if (callbacks && callbacks['onerror']) {
            callbacks['onerror']();
        }
    }
    exports.onerror = onerror;
});
