define(['require','exports','jquery'], function( require, exports , $ ) {
    // restore window.$ version
    $.noConflict();

    var base_url = ''; // 'http://localhost:8002/';

    function parse(str) {
        try {
            var json = "{" + str.substr(2, str.length - 4) + "}";
            var data = JSON.parse(json);
            var id = "STARX_" + Math.round(1000000 * Math.random());
            data.element_id = id;
            if (typeof(requirejs) != 'undefined') {
                requirejs.config({
                    baseUrl: base_url,
                    paths: {
                        "jquery": base_url + "StarX/lib/jquery-1.10.1.min",
                        "libs/jquery": "StarDistanceMap/libs/jquery",
                        "libs/soyutils":"StarX/lib/soyutils",
                        "jquery-ui": base_url + "StarX/lib/jquery-1.10.3.ui.min",
                        "jquery-ui-css": "http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui"
                    },
                    map: {
                        '*': {
                            'css': 'StarX/css'
                        }
                    }
                });
                var errorHandler = requirejs.onError;
                requirejs.onError = function (error) {
                    // this is fallback if StarX/MODULE.js is not defined
                    // we try to do that code for you... i.e. auto-load
                    if (error.requireType == 'scripterror') {
                        requirejs.onError = errorHandler;

                        var flag = false;
                        for (var m in error.requireModules) {
                            if (error.requireModules[m].indexOf('StarX/') == 0) {
                                flag = true;
                                break;
                            }
                        }
                        if (flag) {
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
                                    document.getElementById(config.element_id).text = "project StarDistanceMap not found";
                                }
                            });
                        } else {
                            errorHandler(error);
                        }
                    }
                    else {
                        errorHandler(error);
                    }
                }
                require(['StarX/' + data.StarX], function (StarX) {
                    requirejs.onError = errorHandler;
                    StarX.configure(data);
                });
//			return "<span id='"+id+"'>" + str.substr(2, str.length - 4 ) + "</span>";
                return "<span id='" + id + "'></span>";
            } else {
                return "REQUIRE NOT THERE";
            }
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
        if (in_load) {
            return;
        }
        in_load = true;
        var elements = [];
        var list = $("*:contains('{[\"StarX\":')");
        console.info("in load");
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
                var matches = html.match('(\\{\\["StarX":[^\\]]*\\]\\})');
                var splits = html.split(/(\{\["StarX":.*\]\})/);
                var new_html = '';
                for (var i = 0; i < splits.length; i++) {
                    if (splits[i].indexOf('{["StarX":') >= 0) {
                        new_html += parse(splits[i]);
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
            console.info('element', e.target, ' changed.');
            load();
        });
        load();
    }

    bind();
});
