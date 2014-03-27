/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="jsappmodel.ts" />
define(["require", "exports", "jquery", 'StarGenetics/jsappwidget', "StarGenetics/state"], function(require, exports, $, JSStarGenetics, GlobalState) {
    var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

    var StarGenetics = (function () {
        function StarGenetics() {
            this.context = {};
            this.edx_opts = {};
            this.in_reset = false;
            this.in_editor = false;
        }
        StarGenetics.prototype.edx_specific = function (config) {
            if (config['edx_opts']) {
                this.edx_opts = config['edx_opts'];
                if (this.edx_opts['full_screen'] == true || this.edx_opts['full_screen'] == 'true') {
                    $('.course-index').hide();
                    $('.course-material').hide();
                    $('.sequence-nav').hide();
                }
                if (this.edx_opts['hide_actions'] == true || this.edx_opts['hide_actions'] == 'true') {
                    $('section.action').hide();
                }
                if (this.edx_opts['studio_hostname'] == document.location.hostname) {
                    this.in_editor = true;
                }
            }
        };

        StarGenetics.prototype.edx_postinit = function (data) {
            console.info("edx_postinit", this);
            if (this.edx_opts['auto_load'] == true || this.edx_opts['auto_load'] == 'true') {
                if (!this.in_reset) {
                    this.cls.load();
                }
            }
        };

        StarGenetics.prototype.save = function (val) {
            var jq = $('[name=' + this.config.state + ']');
            var ret = $('#' + jq.attr('inputid'));
            ret.attr('value', encodeURI(val));
            if (this.edx_opts['hide_actions']) {
                $('input.check').click();
            }
            if (this.config.unsaved_message) {
                jq.show().text(this.config.unsaved_message);
            }
        };

        StarGenetics.prototype.load = function () {
            var jq = $('[name=' + this.config.state + ']');
            var ret = $('#' + jq.attr('inputid'));
            try  {
                return decodeURI(ret.attr('value'));
            } catch (e) {
                console.debug("value can not be decoded, failing back on raw");
                return ret ? ret.attr('value') : '';
            }
        };

        StarGenetics.prototype.configure = function (config) {
            var self = this;
            this.config = config;
            if (config['state']) {
                // enable edX integration
                this.context['io'] = {
                    load: function () {
                        return self.load();
                    },
                    save: function (state) {
                        self.save(state);
                    },
                    reset: function (state) {
                        $('#' + config.element_id).html("Restarting...");
                        self.in_reset = true;
                        self.cls = new JSStarGenetics.StarGeneticsJSAppWidget(self.context, config);
                        self.cls.run();
                    },
                    edx_postinit: function (state) {
                        self.edx_postinit(state);
                        self.in_reset = false;
                    }
                };
            } else {
                this.context['io'] = {
                    load: function () {
                        console.info("StarGenetics IO not enabled.");
                        return null;
                    },
                    save: function (state) {
                        console.info("StarGenetics IO not enabled.");
                    },
                    reset: function (state) {
                        self.in_reset = true;
                        self.cls = new JSStarGenetics.StarGeneticsJSAppWidget(self.context, config);
                        self.cls.run();
                    },
                    edx_postinit: function (state) {
                        self.edx_postinit(state);
                        self.in_reset = false;
                    }
                };
            }

            console.info("StarGenetics/main.ts", config);

            this.edx_specific(config);
            if (this.in_editor) {
                var config_str = JSON.stringify(config);
                config_str = config_str.replace(/,/g, ',\n');
                $('#' + config.element_id).html("<div style='background-color: #a0b0c0; font-size:12pt; font-family: verdana, helvetica, arial, sans-serif'>StarGenetics application: Editor Mode - to be developed.<br><a href='https://starx.mit.edu/'>StarX web site</a><br><div>" + config_str + "</div></div>");
            } else {
                this.cls = new JSStarGenetics.StarGeneticsJSAppWidget(this.context, config);
                this.cls.run();
            }
        };
        return StarGenetics;
    })();
    exports.StarGenetics = StarGenetics;

    if (false) {
        var x = new StarGenetics();
    }
});
//# sourceMappingURL=main.js.map
