(function () {

    function get_base_url() {
        var module = "StarX/starx.js";
        var base_url = location.protocol + '//starx.mit.edu/';
        if (location.hostname == 'localhost') {
            base_url = 'http://localhost:8002/';
        }
        else if (location.hostname == 'icstar.mit.edu') {
            base_url = 'http://icstar.mit.edu/';
        }
        else if (location.hostname == 'math.mit.edu') {
            base_url = 'http://math.mit.edu/~jmc/starx/';
        }

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
                if (src.indexOf(module + "?") != -1) {
                    base_url = src.substring(0, src.indexOf(module + "?"));
                    break;
                }
            }
        }
        return base_url;
    }

    var base_url = get_base_url();

    var define_module = function () {
        var paths = {
//            "jquery": "StarX/lib/jquery-1.10.1.min",
            "lib/jquery": "StarX/lib/jquery",
            "lib/underscore": "StarX/lib/underscore",
            "lib/soyutils": "StarX/lib/soyutils",
            "jquery-ui": base_url + "StarX/lib/jquery-1.10.3.ui.min",
            "jquery-ui-css": "http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui",
            "jquery-svg": base_url + "StarX/lib/jquery.svg.min",
            "jquery-svgdom": base_url + "StarX/lib/jquery.svgdom.min"
        };
        if(! window.jQuery)
        {
            paths["jquery"]= "StarX/lib/jquery-1.10.1.min"  ;
        }
        else
        {
            define( 'jquery' , ['exports'] , function(exports) {
                return window.jQuery;
            });
        }
        requirejs.config({
            baseUrl: base_url,
            paths: paths,
            map: {
                '*': {
                    'css': 'StarX/css'
                }
            }
        });
        window.STARX_SELECTOR = '.starx_widget';
        window.STARX_NO_BIND = true;

        require(['StarX/main'], function (StarX) {
            if (StarX.init) {
                try {
                    StarX.init();
                } catch (e) {
                    console.info("Exception " + e);
                }
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

console.info("STARXX - loaded!!!");
