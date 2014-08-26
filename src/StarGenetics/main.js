/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="../StarX/lib/jquery.ts" />
/// <reference path="jsappmodel.ts" />
define(["require", "exports", "StarX/lib/jquery", 'StarGenetics/jsappwidget', "StarGenetics/state", 'StarTMI/tmi'], function(require, exports, jQuery, JSStarGenetics, GlobalState, StarTMI) {
    var $ = jQuery['$'];

    var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

    var tmi = new StarTMI.TMI();

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
                if (this.edx_opts['studio_hostname'] == document.location.hostname) {
                    this.in_editor = true;
                    return;
                }
                if (this.edx_opts['full_screen'] == true || this.edx_opts['full_screen'] == 'true') {
                    $('.course-index').hide();
                    $('.course-material').hide();
                    $('.sequence-nav').hide();
                }
                if (this.edx_opts['hide_actions'] == true || this.edx_opts['hide_actions'] == 'true') {
                    $('section.action').hide();
                }
                this.hide_aria();
                tmi.event("StarGenetics", "edX", $('.user-link').text().replace(/\s*/g, '').replace('Dashboardfor:', ''));
            }
        };

        StarGenetics.prototype.hide_aria = function () {
            console.info("Aria hide start!");
            var jq = $('[name=' + this.config.state + ']');
            console.info("Aria hide start! 2 ", jq);
            var i4id = jq.attr('inputid');
            console.info("Aria hide start! 3 ", i4id);
            $('p.status[aria-describedby="' + i4id + '"]').hide();
            console.info("Aria hide start! 4 ", i4id);
        };

        StarGenetics.prototype.edx_postinit = function (data) {
            console.info("edx_postinit", this);
            if (this.edx_opts['auto_load'] == true || this.edx_opts['auto_load'] == 'true') {
                if (!this.in_reset) {
                    this.cls.load();
                }
            }
            this.hide_aria();
        };

        StarGenetics.prototype.save = function (val) {
            var jq = $('[name=' + this.config.state + ']');
            var i4id = jq.attr('inputid');
            var ret = $('#' + i4id);
            ret.attr('value', encodeURI(val));
            if (this.edx_opts['hide_actions']) {
                $('input.check, input.save').click();
            }
            if (this.config.unsaved_message) {
                jq.show().text(this.config.unsaved_message);
            }
            this.hide_aria();
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
            if (window['RavenConfig']) {
                try  {
                    window['RavenConfig']('https://b71ed16774dd47c896988d743f1ce940@app.getsentry.com/20171', { whitelistUrls: ['mit.edu'] }, function (Raven) {
                        if (Raven) {
                            if (config['edx_opts']) {
                                Raven.setUser({ id: $('.user-link').text().replace(/\s*/g, '').replace('Dashboardfor:', '') });
                                self.Raven = Raven;
                            }
                        }
                    });
                } catch (e) {
                }
            }

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
                    },
                    log: function (message, context) {
                        if (self.Raven && self.Raven.captureMessage) {
                            try  {
                                self.Raven.captureMessage(message, context);
                            } catch (e) {
                            }
                        }
                    }
                };
            } else if (config['serialization_mode'] == 'local') {
                this.context['io'] = {
                    load: function () {
                        return decodeURI(localStorage['stargenetics']);
                    },
                    save: function (state) {
                        localStorage['stargenetics'] = encodeURI(state);
                    },
                    reset: function (state) {
                        delete localStorage['stargenetics'];
                        self.in_reset = true;
                        self.cls = new JSStarGenetics.StarGeneticsJSAppWidget(self.context, config);
                        self.cls.run();
                    },
                    edx_postinit: function (state) {
                        self.edx_postinit(state);
                        self.in_reset = false;
                    },
                    log: function (message, context) {
                        if (self.Raven && self.Raven.captureMessage) {
                            try  {
                                self.Raven.captureMessage(message, context);
                            } catch (e) {
                            }
                        }
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
                    },
                    log: function (message, context) {
                        if (self.Raven && self.Raven.captureMessage) {
                            try  {
                                self.Raven.captureMessage(message, context);
                            } catch (e) {
                            }
                        }
                    }
                };
            }

            console.info("StarGenetics/main.ts", window['Raven'], config);

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
