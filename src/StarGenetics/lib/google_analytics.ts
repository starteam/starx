import google_analytics = module("google_analytics");
declare var exports;
declare var window;

var _gaq = window._gaq;
var _gat = window._gat;

delete window._gaq;
delete window._gat;

exports._gaq = _gaq;
exports._gat = _gat;

_gaq.push(['_setAccount', 'UA-1048253-18']);
_gaq.push(['_trackPageview']);


export class GoogleAnalytics {
    constructor(account:string) {
        _gaq.push(['_setAccount', account]);

    }

    setAccount(account:string) {
        _gaq.push(['_setAccount', account]);
    }

    trackEvent(category:string, action:string, detail:string) {
        _gaq.push(['_trackEvent', category, action, detail]);
    }

    version():any
    {
        if( google_analytics )
        {
            return google_analytics;
        }
        else
        {
            return "" ;
        }
    }
}