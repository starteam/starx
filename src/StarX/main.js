define(['require', 'exports', 'jquery'], function (require, exports, $) {
    // restore window.$ version
    $.noConflict();


    function get_base_url() {
        var module = "StarX/main";
        var module_ext = ".js";
        var base_url = 'http://starx.mit.edu/';
        var main_url;
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            if (script.getAttribute('data-requiremodule') == module) {
                main_url = script.getAttribute('src');
            }
        }
        if (main_url) {
            base_url = main_url.substring(0, main_url.length - module.length - module_ext.length);
        }
        return base_url;
    }

    var base_url = get_base_url(); // 'http://localhost:8002/';

    function parse(str, del) {
        try {
            str = str.replace(new RegExp(del, "g"), '"');
            var json = "{" + str.substr(2, str.length - 4) + "}";
            console.info(json);
            var data = JSON.parse(json);
            var id = "STARX_" + Math.round(1000000 * Math.random());
            data.element_id = id;

            require(['../' + data.StarX + '/main'], function (project) {
                if (project) {
                    if (project.configure) {
                        project.configure(data);
                    }
                    else if (project[data.StarX]) {
                        q = new project[data.StarX]();
                        q.configure(data);
                    }
                }
                else {
                    var config = data;
                    document.getElementById(config.element_id).innerHTML = "project " + data.StarX + " not found";
                }
            });
            return "<span id='" + id + "'></span>";
        } catch (e) {
            return "STARX: ERROR PARSING: " + str.substr(2, str.length - 4) + ":ERROR PARSING :STARX";
        }
    }

    function test_and_add(element, elements) {
        if ($(element).parents().filter('.editor').length == 0) {
            elements.push(element);
        }
    }

    var in_load = false;

    function load() {
        load_delimited('"');
        load_delimited("'");
    }

    function load_delimited(del) {
        if (in_load) {
            return;
        }
        in_load = true;
        var elements = [];
        var list = $("*:contains('{[" + del + "StarX" + del + ":')");
        //console.info("in load");
        for (var i = 1; i < list.length; i++) {
            if (!list[i - 1].contains(list[i])) {
                test_and_add(list[i - 1], elements);
            }
        }
        if (list.length > 0) {
            test_and_add(list[list.length - 1], elements);
        }
        $(elements).each(function () {
            var element = $(this);
            var html = element.html();
            if (html != null && html.indexOf(']}') != -1) {
                var matches = html.match('(\\{\\[' + del + 'StarX' + del + ':[^\\]]*\\]\\})');
                var splits = html.split(/(\{\['+del+'StarX'+del+':.*\]\})/);
                var new_html = '';
                for (var i = 0; i < splits.length; i++) {
                    if (splits[i].indexOf('{[' + del + 'StarX' + del + ':') >= 0) {
                        new_html += parse(splits[i], del);
                    }
                    else {
                        new_html += splits[i];
                    }
                }
                element.html(new_html);
            }

        });
        in_load = false;

    }

    function bind() {
        $('body').bind('DOMNodeInserted', function (e) {
            //console.info('element', e.target, ' changed.');
            load();
        });
        load();
    }

    bind();
    exports.load = load;
});
