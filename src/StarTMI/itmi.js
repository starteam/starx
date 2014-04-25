// <!-- Google Analytics -->
(function (window, document, Math) {
    var debug = false;
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
        if (event['data'] && event['data']['command'] == 'event') {
            window[ga]('send', event.data.command, event.data.category, event.data.action, event.data.label);
        }
    };

    window.addEventListener('message', receiveMessage, false);
})(window, document, Math);
// <!-- End Google Analytics -->
(function (window, document, undefined) {
    try {
    if (!window['Raven']) {
        var toProcess = [];
        var a = document.createElement('script'),
            m = document.getElementsByTagName('script')[0];
        function process() {
            while( toProcess.length != 0 && window['Raven'])
            {
                var q = toProcess.shift();
                window['Raven'].config(q.a, q.b).install();
                if( q.callback ) {
                    try {
                        q.callback(window['Raven']);
                    }
                    catch(e)
                    {};
                }
            }
        }
        a.async = 1;
        a.onload = process;
        a.src = '//cdn.ravenjs.com/1.1.11/raven.min.js';
        m.parentNode.insertBefore(a, m);
        window.RavenConfigStarX = function (a, b,c) {
            toProcess.push({a:a,b:b,callback:c});
            process();
        }
    }
    }catch(e) {
        if( console && console.info )
        {
            console.info( e );
        }
    };
})(window, document);
