define(["require", "exports", "jquery"], function(require, exports, __jQuery__) {
    var jQuery = __jQuery__;

    exports.$ = jQuery;
    jQuery['noConflict'](true);
    var version = (function () {
        function version() {
            console.info(jQuery['fn'].jquery);
        }
        return version;
    })();
    exports.version = version;    
    ;
})
//@ sourceMappingURL=jquery.js.map
