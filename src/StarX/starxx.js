(function () {

    function get_base_url() {
        var module = "StarX/starx.js";
        var base_url = location.protocol + '//starx.mit.edu/';
//        base_url = 'http://localhost:8002/';
        var main_url;
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            var src = script.getAttribute('src');
            if (src) {
                if (src.indexOf(module) == src.length - module.length) {
                    base_url = src.substring(0, src.length - module.length);
                    break;
                }
                if( src.indexOf(module+"?") != -1 )
                {
                    base_url = src.substring(0,src.indexOf(module+"?"));
                    break;
                }
            }
        }
        return base_url;
    }

    var base_url = get_base_url();

    var define_module = function () {
        requirejs.config({
            baseUrl: base_url,
            paths: {
                "jquery": "StarX/lib/jquery-1.10.1.min",
                "lib/jquery": "StarX/lib/jquery",
                "lib/underscore": "StarX/lib/underscore",
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
        window.STARX_SELECTOR = '.starx_widget';
        window.STARX_NO_BIND = true;

        require(['StarX/main'], function (StarX) {
            if( StarX.init )
            {
                StarX.init();
            }
            console.info("StarX/main loaded");
        });
    };

    var wait = function () {
        console.info("waiting for require...");
        if (!window.require) {
            setTimeout(wait, 100);
        }
        else {
            define_module();
        }
    }

    var load_require = function () {
        var head = document.getElementsByTagName('head').item(0);
        var script = document.createElement('script');

        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', get_base_url() + '/StarX/require.js');
        script.onload = wait;
        head.appendChild(script);
    }

    if (!window.require) {
        load_require();
    }
    else {
        define_module();
    }

})();

console.info( "STARXX - loaded!!!");
