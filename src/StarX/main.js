define(['require', 'exports', 'jquery'], function (require, exports, $) {
    // restore window.$ version
    $.noConflict();

    var widget_ids = {};

    function get_base_url() {
        var module = "StarX/main";
        var module_ext = ".js";
        var base_url = location.protocol + '//starx.mit.edu/';
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
            var data = JSON.parse(json);
            var id = "STARX_" + Math.round(1000000 * Math.random());
            widget_ids[id] = 1;

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
                    console.info("Has other");
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

    function load(target) {
        load_delimited('"', target);
        load_delimited("'", target);
    }

    function load_delimited(del, target) {
        if (in_load) {
            return;
        }
        in_load = true;
        var elements = [];
        var list = $("*:contains('{[" + del + "StarX" + del + ":')", target);
        console.info("in load " + del + " ");
        console.info(target);
        console.info("in load " + list.length);
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
                    if (splits[i].trim().indexOf('{[' + del + 'StarX' + del + ':') == 0) {
                        new_html += parse(splits[i].trim(), del);
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

    function starx_child(element) {
        if (element) {
            if (element['id'] && widget_ids[ element['id']] == 1) {
                return true;
            }
            if (element.parentElement) {
                return starx_child(element.parentElement);
            }
        }
        return false;
    }

    function bind() {
        $('body').bind('DOMNodeInserted', function (e) {
            if (starx_child(e.target)) {
                return;
            }
            load(e.target);
        });
        load(document.body);
    }

    function init() {
        if (window.STARX_SELECTOR) {
            console.info("STARX_SELECTOR");
            console.info(window.STARX_SELECTOR)
        )
            ;
            _.each($(window.STARX_SELECTOR), function (e) {
                var q = $(e);
                var text = q.text();
                q.html(parse(text, '"')).addClass('starx_handled');
            });
            if (!window.STARX_NO_BIND) {
                bind();
            }
        }
    }

    init();

    exports.load = load;
    exports.init = init;
});
