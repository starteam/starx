define(["require", "exports", "google_analytics"], function(require, exports, __google_analytics__) {
    var google_analytics = __google_analytics__;

    var str = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
    var script = document.createElement("script");
    script.innerText = str;
    document.head.appendChild(script);

    ga('create', 'UA-1048253-23', { 'cookieDomain': 'none' });
    ga('send', 'pageview');

    var GoogleAnalytics = (function () {
        function GoogleAnalytics(account) {
            if (ga) {
                console.info("GA: " + account);
                console.info(google_analytics);
                ga('create', 'account');
            }
        }
        GoogleAnalytics.prototype.setAccount = function (account) {
            if (ga) {
                console.info("GA2: " + account);
                ga('create', 'account');
            }
        };

        GoogleAnalytics.prototype.trackEvent = function (category, action, detail) {
            if (ga) {
                console.info("_trackEvent: " + category + " " + action + " " + detail);
                ga('send', 'event', category, action, detail);
            }
        };
        return GoogleAnalytics;
    })();
    exports.GoogleAnalytics = GoogleAnalytics;
});
//@ sourceMappingURL=google_analytics.js.map
