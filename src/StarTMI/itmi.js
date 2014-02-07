// <!-- Google Analytics -->
(function (window, document, Math) {
    var debug = true;
    var ga = '_Star_TMI_';
    while (window[ga]) {
        ga = '_' + ga + '_' + Math.round(100000 * Math.random());
    }
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', ga);


    window[ga]('create', 'UA-1048253-23', {
        'cookieName': '_Star_TMI_',
        'cookieExpires': 3600 * 24 * 30
    });

    function receiveMessage(event) {
        if (debug) {
            console.info("receiveMessage");
            console.info(event);
        }
        if( event['data'] && event['data']['command'] == 'event')
        {
            window[ga]('send',event.data.command , event.data.category, event.data.action, event.data.label );
        }
    };

    window.addEventListener('message', receiveMessage, false);
})(window, document, Math);
// <!-- End Google Analytics -->
