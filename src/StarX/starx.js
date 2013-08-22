(function () {

    var base_url = 'http://edx-starx:8002/'
    var define_module = function () {
        requirejs.config({
            baseUrl: base_url,
            paths: {
                "jquery": base_url + "StarX/lib/jquery-1.10.1.min",
                "lib/jquery": "StarX/lib/jquery",
                "lib/soyutils": "StarX/lib/soyutils",
                "lib/google_analytics": "StarX/lib/google_analytics",
                "jquery-ui": base_url + "StarX/lib/jquery-1.10.3.ui.min",
                "jquery-ui-css": "http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui",
                "google_analytics": (window.document.location.protocol == 'https:' ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga'
            },
            map: {
                '*': {
                    'css': 'StarX/css'
                }
            }
        });
    }

    var load_require = function () {
        var head = document.getElementsByTagName('head').item(0);
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'http://starx.mit.edu/StarX/');
        script.onload = define_module;
        head.appendChild(script);
    }

    if (!window.require) {
        load_require();
    }
    else {
        define_module();
    }


})();


})
();