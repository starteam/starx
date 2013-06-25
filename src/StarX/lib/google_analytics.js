define(["require", "exports", "google_analytics"], function(require, exports, __google_analytics__) {
    var google_analytics = __google_analytics__;

    var _gaq = window._gaq;
    var _gat = window._gat;
    delete window._gaq;
    delete window._gat;
    exports._gaq = _gaq;
    exports._gat = _gat;
    _gaq.push([
        '_setAccount', 
        'UA-1048253-18'
    ]);
    _gaq.push([
        '_trackPageview'
    ]);
    var GoogleAnalytics = (function () {
        function GoogleAnalytics(account) {
            if(google_analytics) {
                _gaq.push([
                    '_setAccount', 
                    account
                ]);
            }
            console.info("GA: ");
            console.info(google_analytics);
        }
        GoogleAnalytics.prototype.setAccount = function (account) {
            _gaq.push([
                '_setAccount', 
                account
            ]);
        };
        GoogleAnalytics.prototype.trackEvent = function (category, action, detail) {
            _gaq.push([
                '_trackEvent', 
                category, 
                action, 
                detail
            ]);
        };
        GoogleAnalytics.prototype.version = function () {
            if(google_analytics) {
                return google_analytics;
            } else {
                return "";
            }
        };
        return GoogleAnalytics;
    })();
    exports.GoogleAnalytics = GoogleAnalytics;    
})
//@ sourceMappingURL=google_analytics.js.map
