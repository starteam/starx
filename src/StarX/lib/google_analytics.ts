import google_analytics = module("google_analytics");

var str = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
var script = document.createElement("script");
script.innerText = str;
document.head.appendChild(script);

declare var ga;

ga('create', 'UA-1048253-23', {'cookieDomain': 'none'});  // Creates a tracker.
ga('send', 'pageview');     // Sends a pageview.

export class GoogleAnalytics {
    constructor(account:string) {
        if (ga) {
            console.info("GA: " + account);
            console.info(google_analytics);
            ga('create', 'account');
        }

    }

    setAccount(account:string) {
        if (ga) {
            console.info("GA2: " + account);
            ga('create', 'account');
        }
    }

    trackEvent(category:string, action:string, detail:string) {
        if (ga) {
            console.info("_trackEvent: " + category + " " + action + " " + detail);
            ga('send', 'event', category, action, detail);
        }
    }
}