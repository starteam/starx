/// <reference path="../StarGenetics_Obsolete/state.ts" />
/// <reference path="../StarGenetics_Obsolete/config.d.ts" />
/// <reference path="jsappmodel.ts" />
/// <reference path="visualizers/smiley.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jqueryui.d.ts" />
/// <reference path="../StarGenetics/sg_client_mainframe.soy.d.ts" />
/// <reference path="../StarGenetics/sg_client_mainframe.css.soy.d.ts" />
/// <reference path="../StarCommons/easy_deflate.d.ts" />
define(["require", "exports", "StarGenetics/sg_client_mainframe.css.soy", "StarGenetics/sg_client_mainframe.soy", "StarGenetics/bundled_samples", "StarGenetics/jsappmodel", "StarGenetics/visualizers/smiley", "StarGenetics/visualizers/fly", "StarGenetics/tests/qunit", "StarGenetics/tests/suite", "StarCommons/easy_deflate", "jquery", "jquery-ui", "StarGenetics/bundled_samples"], function(require, exports, SGCSS, SGUIMAIN, bundled_samples, SGModel, SGSmiley, SGFly, SGTests, TEST, compress) {
    var $ = jQuery;

    var StarGeneticsJSAppWidget = (function () {
        function StarGeneticsJSAppWidget(context, config) {
            this.stargenetics_interface = null;
            this.eventlistener_setup = false;
            this.postInitExecuted = false;
            var self = this;
            this.context = context;
            this.config = config;

            var backend_model = undefined;
            if (config && config['config'] && config['config']['model_type'] == 'bundled_samples' && config['config']['bundled_samples']) {
                backend_model = bundled_samples[config['config']['bundled_samples']];
                config['config']['model'] = backend_model;
            } else {
                backend_model = bundled_samples.model1;
                config['config']['model'] = backend_model;
            }

            this.initModel(config);
            this.init();
        }
        /**
        * This method loads GWT frame & waits for it to finish loading
        */
        StarGeneticsJSAppWidget.prototype.init = function () {
            var config = this.config;
            var url = (config['base_url'] ? config['base_url'] : '') + '/StarGenetics/gwtframe.html';
            $('#' + config.element_id).html("StarGenetics: ClientApp starting");
            var jq = $('<iframe id="' + config.element_id + '_gwt" style="width:0px;height:0px"/>').appendTo($('#' + config.element_id).parent()).hide({});
            var q = jq[0];
            if (config['gwt_path']) {
                jq.attr('src', config['base_url'] + config['gwt_path']);
            } else {
                jq.attr('src', url);
            }
            $('<style>' + SGCSS.css_text({}) + '</style>').appendTo($('#' + config.element_id).parent());
            this.wait_for_sg_interface('#' + config.element_id + '_gwt', config, this);
        };

        /**
        * This method loads GWT frame & waits for it to finish loading
        */
        StarGeneticsJSAppWidget.prototype.wait_for_sg_interface = function (id, config, self) {
            var target = 'StarGenetics';
            console.info("wait_for_sg_interface");
            if (!self.eventlistener_setup) {
                self.eventlistener_setup = {};
                window.addEventListener('message', function (event) {
                    console.info("StarGenetics Message");
                    console.info(event);
                    if (event && event['data']) {
                        var data = event.data;
                        if (data['command'] == 'it_is_up') {
                            self.stargenetics_interface = function (data) {
                                var uid = Math.random();
                                data.uid = 'CB' + uid;
                                var callbacks = {};
                                if (data['callbacks']['onsuccess']) {
                                    callbacks['onsuccess'] = data['callbacks']['onsuccess'];
                                    data['callbacks']['onsuccess'] = true;
                                }
                                if (data['callbacks']['onerror']) {
                                    callbacks['onerror'] = data['callbacks']['onerror'];
                                    data['callbacks']['onerror'] = true;
                                }
                                self.eventlistener_setup[data.uid] = callbacks;
                                console.info("post message");
                                console.info(data);
                                data.starx = target;
                                $(id)[0]['contentWindow'].postMessage(data, '*');
                            };
                            self.postInit(self.stargenetics_interface);
                        } else if (data['uid'] && data['command'] == 'callback') {
                            if (self.eventlistener_setup[data.uid]) {
                                var callbacks = self.eventlistener_setup[data.uid];
                                var kind = data['kind'];
                                var callback_data = data.data;
                                if (callbacks[kind]) {
                                    console.info("calling back " + data.uid + " " + kind);
                                    callbacks[kind](callback_data);
                                } else {
                                    console.info("processing ISSUE " + data.uid);
                                    console.info(data);
                                }
                            }
                        } else {
                            console.info("skipping");
                            console.info(event);
                        }
                    }
                }, false);
            }
            var iframe = $(id)[0];
            var w = iframe['contentWindow'];
            if (w && w.postMessage) {
                w.postMessage({
                    token: '1',
                    command: 'is_up',
                    starx: target
                }, '*');
            }

            var success = false;
            if (self.stargenetics_interface) {
                self.postInit(self.stargenetics_interface);
                success = true;
            }
            try  {
                if (!success && w.__sg_bg_exec) {
                    self.stargenetics_interface = w.__sg_bg_exec;
                    self.postInit(self.stargenetics_interface);
                    success = true;
                }
            } catch (e) {
                console.info("Error");
                console.info(e);
            } finally {
            }

            if (!success) {
                setTimeout(function () {
                    self.wait_for_sg_interface(id, config, self);
                }, 250);
                console.info("Waiting...");
            }
        };

        /**
        * Post init executes when GWT is loaded
        */
        StarGeneticsJSAppWidget.prototype.postInit = function (sg_interface) {
            if (!this.postInitExecuted) {
                window['stargenetics_interface'] = sg_interface;

                $('#' + this.config.element_id).html("StarGenetics: ClientApp running");
                this.postInitExecuted = true;
                this.start_client_app();
                this.testHook();
                console.info("postInit");
                this.edx_hook();
            }
        };

        /**
        * edX hooks
        */
        StarGeneticsJSAppWidget.prototype.edx_hook = function () {
            this.context['io']['edx_postinit']();
        };

        /**
        * Start Client App loads initial UI
        */
        StarGeneticsJSAppWidget.prototype.start_client_app = function () {
            var self = this;
            var main = $('#' + this.config.element_id);
            main.html(SGUIMAIN.main({ config: this.config }));

            self.open({
                onsuccess: function () {
                    self.list_strains({
                        onsuccess: function () {
                            console.info("liststrains on open");
                        }
                    });
                }
            });
            //        $('.sg_open_ps', main).off('click').on('click', function () {
            //            console.info("Click on open");
            //            self.open({
            //                onsuccess: function () {
            //                    self.list_strains({
            //                        onsuccess: function () {
            //                            console.info("liststrains on open");
            //                        }
            //                    });
            //                }
            //            });
            //
            //        });
        };

        /**
        * Test Hook load QTest & if URL warrants it loads test suite
        */
        StarGeneticsJSAppWidget.prototype.testHook = function () {
            var self = this;
            if (SGTests.isTesting()) {
                SGTests.load(function (qunit) {
                    //                import TEST = require("StarGenetics/tests/suite");
                    TEST.testSuite(qunit, self);
                    //                require(["StarGenetics/tests/suite"], function (suite) {
                    //                    suite.testSuite(qunit, self);
                    //                });
                });
            }
        };

        StarGeneticsJSAppWidget.prototype.run = function () {
        };

        /**
        * This sets up model,
        * TODO: in the future it will decide on model to load from StarX configuration
        */
        StarGeneticsJSAppWidget.prototype.initModel = function (config) {
            var model = new SGModel.Top({
                //backend: json_sample_model.model1,
                backend: config['config']['model'],
                ui: {
                    strains: {
                        list: []
                    },
                    new_experiment: {
                        list: []
                    },
                    experiments: {
                        list: []
                    }
                }
            });
            this.model = model;
            window['model'] = model;
        };

        /**
        * Opens StarGenetics backend with selected model
        */
        StarGeneticsJSAppWidget.prototype.open = function (callbacks) {
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'open',
                data: {
                    protocol: 'Version_1',
                    model: this.model.backend
                },
                callbacks: {
                    onsuccess: function (a, b) {
                        SGTests.onsuccess(callbacks);
                        self.show();
                    },
                    onerror: function () {
                        SGTests.onerror(callbacks);
                    }
                }
            });
        };

        /**
        * Lists strains & relaods UI
        */
        StarGeneticsJSAppWidget.prototype.list_strains = function (callbacks) {
            console.info("Running liststrain");
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'liststrains',
                data: {},
                callbacks: {
                    onsuccess: function (data, b) {
                        var strains = data.payload.strains;
                        SGTests.onsuccess(callbacks);
                        self.model.ui.strains.set_list(strains);
                        self.show();
                    },
                    onerror: function (q) {
                        SGTests.onerror(callbacks);
                    }
                }
            });
        };

        /**
        * add parent
        * @param experiments
        */
        StarGeneticsJSAppWidget.prototype.add_parent = function (experiment, strain) {
            experiment.addParent(strain);
        };

        /**
        * Run mating experiment
        * @param experiments
        */
        StarGeneticsJSAppWidget.prototype.mate = function (experiment, callbacks) {
            var avg_count;
            if (!callbacks['avg_offspring_count']) {
                avg_count = 50;
                try  {
                    avg_count = parseInt(this.model.backend.genetics.engine.avg_offspring_count);
                } catch (e) {
                }
                var how_many_progenies = prompt("How many progenies (up to 500)?", "" + avg_count);
                if (how_many_progenies && parseInt(how_many_progenies) != 0) {
                    var c = parseInt(how_many_progenies);
                    if (c > 500) {
                        c = 500;
                    }
                    if (c > 0) {
                        this.update_experiments(experiment, { command: 'mate', avg_offspring_count: c }, callbacks);
                    } else {
                        if (callbacks && callbacks.onerror) {
                            try  {
                                callbacks.onerror({
                                    'message': 'Avg number of progenies is less than 0'
                                });
                            } catch (e) {
                            }
                        }
                    }
                }
            } else {
                this.update_experiments(experiment, { command: 'mate', avg_offspring_count: callbacks['avg_offspring_count'] }, callbacks);
            }
        };

        /**
        * Run update experiment
        * @param experiments
        */
        StarGeneticsJSAppWidget.prototype.update_experiments = function (experiment, opts, callbacks) {
            console.info("Running update_experiments");
            console.info(experiment.toJSON());
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'updateexperiment',
                data: {
                    experiment: experiment.toJSON(),
                    command: opts.command,
                    avg_offspring_count: opts.avg_offspring_count
                },
                callbacks: {
                    onsuccess: function (data, b) {
                        console.info("update_experiments OK");
                        console.info(data);
                        console.info(b);
                        experiment.update_experiment(data.payload);
                        self.model.ui.experiments.update_experiment(experiment);
                        if (experiment instanceof SGModel.NewExperiment) {
                            self.model.ui.clearNewExperiment();
                        }
                        SGTests.onsuccess(callbacks);
                        self.show();
                    },
                    onerror: function (data) {
                        console.info(data);
                        SGTests.onsuccess(callbacks);
                        console.info("update_experiments Got error!");
                    }
                }
            });
        };

        /**
        * Redraws UI
        */
        StarGeneticsJSAppWidget.prototype.show = function () {
            var zoom_bugs_factor = 2;
            var self = this;
            var main = $('.sg_workspace', '#' + this.config.element_id);
            main.html(SGUIMAIN.workspace({ model: this.model }));

            $('.sg_experiment_box_floaty').off('click').on('click', function (e) {
                var id = $(this).data('kind');
                self.model.ui.experiments.show_experiment = id;
                console.info("Clicked here");
                e.stopPropagation();
                self.show();
            });

            $('.sg_expand_males').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var phenotype = JSON.stringify(phenotype_id);
                c['phenotypes'][phenotype].show_more_males = $(this).data('state');
                self.show();
            });
            $('.sg_move_start_males').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var phenotype = JSON.stringify(phenotype_id);
                c['phenotypes'][phenotype].start_index_male = c['phenotypes'][phenotype].start_index_male + ($(this).data('state') == '+' ? 5 : -5);
                self.show();
            });

            $('.sg_expand_females').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var phenotype = JSON.stringify(phenotype_id);
                c['phenotypes'][phenotype].show_more_females = $(this).data('state');
                self.show();
            });
            $('.sg_move_start_females').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var phenotype = JSON.stringify(phenotype_id);
                c['phenotypes'][phenotype].start_index_female = c['phenotypes'][phenotype].start_index_female + ($(this).data('state') == '+' ? 5 : -5);
                self.show();
            });

            $('.sg_show_more').off('click').on('click', function () {
                var more = $(this).data('increment');
                if (more == '+') {
                    self.model.ui.experiments.show_more(5);
                } else if (more == '-') {
                    self.model.ui.experiments.show_more(-5);
                }
                self.show();
            });

            $('.sg_expand').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.expanded = $(this).data('expanded');
                self.show();
            });

            $('.sg_rename').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                if (c) {
                    var old_name = c.name;
                    var new_name = prompt("Please enter new experiment name:", old_name);
                    c.name = new_name || c.name;
                    _.each(c.list, function (s) {
                        if (s.name.indexOf(old_name) == 0) {
                            s.name = new_name + s.name.substr(old_name.length);
                        }
                    });

                    self.show();
                }
            });

            $('.sg_discard').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                if (c instanceof SGModel.Experiment) {
                    var exp = c;
                    console.info("DISCARD", c.name);
                    var to_discard = confirm("Are you sure you want to discard " + exp.name + "?");
                    if (to_discard) {
                        exp.discarded = true;
                        console.info("DISCARD PRE:", self.model.ui.experiments.list);
                        self.model.ui.experiments.remove(exp);
                        console.info("DISCARD DONE:", self.model.ui.experiments.list);
                    }
                }
                self.show();
            });

            $('.sg_experiment_parent_remove').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                if (c instanceof SGModel.NewExperiment) {
                    var newexp = c;
                    newexp.clearParent($(this).data('id'));
                    self.show();
                }
            });

            $('.sg_strain_expand_visuals').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.visualsVisible = $(this).data('expanded-visuals');
                self.show();
            });
            $('.sg_strain_expand_properties').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.propertiesVisible = $(this).data('expanded-properties');
                self.show();
            });
            $('.sg_clear_parents').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.clearParents();
                self.show();
            });

            $('.sg_new_experiment_mate').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var count = parseInt($('.sg_new_experiment_mate_count').val());
                if (!(count > 0)) {
                    console.info("count is ", count);
                    $('.sg_new_experiment_mate').attr('disabled', true);
                    return;
                }
                $('.sg_new_experiment_box').css({ 'overflow': 'hidden' }).animate({ 'height': 25 }, 750, function () {
                    self.mate(c, {
                        onsuccess: function () {
                            console.info("Mate success!");
                        }, onerror: function () {
                            console.info("Mate error!");
                        }, avg_offspring_count: count
                    });
                    self.show();
                    $('.sg_new_experiment_box').css({ 'overflow': 'hidden' }).height(0).animate({ 'height': 160 }, 2000);
                });
            });
            $('.sg_new_experiment_mate_count').off('keyup').on('keyup', function (e) {
                console.info($(this).val());
                $('.sg_new_experiment_mate').attr('disabled', !(parseInt($(this).val()) > 0));
            });
            $('.sg_experiment_mate').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                console.info("sg_experiment_mate");
                console.info(c);
                self.mate(c, {
                    onsuccess: function () {
                        console.info("Mate success!");
                    }, onerror: function () {
                        console.info("Mate error!");
                    } });
                self.show();
            });
            $('.sg_strain_box').draggable({
                revert: true,
                start: function (e) {
                    var parent = [];
                    $(e.target).parents('.sg_slider_widget_wrapper').each(function () {
                        parent.push(this);
                    });
                    console.info(parent);
                    $(parent).each(function () {
                        console.info("Start", this);
                        window['box'] = this;
                        var left_scroll = this.scrollLeft;
                        $(this).css({ 'overflow-x': 'visible', 'margin-bottom': '15px' });
                        $('[data-widget="slider-table"]', this).css({
                            'position': 'relative',
                            'left': -left_scroll + 'px'
                        });
                    });
                    console.info("Start", e, $(e.target).parents('.sg_experiment_box'), $(e.target).parents('.sg_strains_box'));
                },
                stop: function (e) {
                    var parent = [];
                    $(e.target).parents('.sg_slider_widget_wrapper').each(function () {
                        parent.push(this);
                    });
                    $(parent).each(function () {
                        var $table = $('[data-widget="slider-table"]', this);
                        var left_scroll = parseInt($table.css('left'));
                        $table.css({
                            'position': 'relative',
                            'left': '0px'
                        });
                        $(this).css({ 'overflow-x': 'scroll', 'margin-bottom': '0px' }).scrollLeft(-left_scroll);
                    });
                    console.info("Stop", e, $(e.target).parents('.sg_experiment_box'), $(e.target).parents('.sg_strains_box'));
                },
                helper: function (event) {
                    console.info("HELPER", event, this);
                    var copy = $(this).clone().removeAttr("id");
                    copy.append(SGUIMAIN.plus_floaty({}));
                    var canvas0 = $('canvas', this)[0];
                    if (canvas0) {
                        var canvas = $('canvas', copy)[0];
                        canvas.width = canvas0.width;
                        canvas.height = canvas0.height;
                        var context = canvas.getContext('2d');
                        context.drawImage(canvas0, 0, 0);
                    }
                    return copy;
                }
            }).addClass('sg_strain_box_hover');

            $('.sg_strain_box', '.sg_mini_experiment_box').draggable({ 'disabled': true }).addClass('sg_strain_box_nohover');

            $('.sg_experiment_parent').droppable({ drop: function (e, ui) {
                    var target = $(this);
                    var source = ui.draggable;

                    var src_collection = self.model.ui.get(source.data('kind'));
                    var src_strain = src_collection.get(source.data('id'));
                    var target_collection = self.model.ui.get(target.data('kind'));
                    self.add_parent(target_collection, src_strain);
                    self.show();
                } });

            $('.sg_add_strain_box').droppable({ drop: function (e, ui) {
                    var target = $(this);
                    var source = ui.draggable;
                    var src_collection = self.model.ui.get(source.data('kind'));
                    var src_strain = src_collection.get(source.data('id'));
                    var target_collection = self.model.ui.get(target.data('kind'));
                    target_collection.add_strain(src_strain);
                    self.show();
                } });

            var visualizer_name = (((((this.config['config'] || {})['model'] || {})['genetics'] || {})['visualizer'] || {})['name'] || "Not defined");
            var visualizer = new SGSmiley.Smiley();
            if (visualizer_name == 'fly') {
                visualizer = new SGFly.Fly();
            }
            $('.sg_strain_visual canvas').each(function () {
                var c = self.model.ui.get($(this).data('kind'));
                var organism = c.get($(this).data('id'));
                visualizer.render($(this)[0], organism.properties, organism);
                window['c'] = this;
                window['v'] = visualizer;
                var qq = this;
                window['rr'] = function () {
                    visualizer.render($(qq)[0], organism.properties, organism);
                };
            });

            console.info("Save handler");
            $('.sg_workspace_save', main).off('click').on('click', function () {
                console.info("Save");
                self.save();
            });

            $('.sg_workspace_load', main).off('click').on('click', function () {
                console.info("Load");
                self.load();
            });

            $('.sg_workspace_reset', main).off('click').on('click', function () {
                console.info("Reset");
                self.reset();
            });
        };

        StarGeneticsJSAppWidget.prototype.reset = function () {
            var self = this;
            var data = self.context['io']['reset']();
        };

        StarGeneticsJSAppWidget.prototype.save = function () {
            var self = this;
            self.stargenetics_interface({
                token: '1', command: 'save', data: { protocol: 'Version_1' },
                callbacks: {
                    onsuccess: function (ret, b) {
                        var gwt_model = ret['payload']['model'];
                        var ts_model = self.model.__data__;
                        var data = {
                            gwt_model: gwt_model,
                            ts_model: ts_model
                        };
                        var str_data = JSON.stringify(data);
                        var compressed = compress.deflate(str_data);
                        window['localStorage']['sg_save'] = compressed;
                        console.info(self);
                        console.info(self.context);
                        console.info(self.context['io']);
                        console.info(compressed);

                        self.context['io']['save'](compressed);
                    }, onerror: function (a, b) {
                        console.info("error:");
                        console.info(a);
                        console.info(window['localStorage']);
                        console.info(window['localStorage']['sg_save']);
                        window['localStorage']['sg_save'] = a;
                        console.info(window['localStorage']['sg_save']);
                        console.info(a['payload']['error']);
                    } } });
        };

        StarGeneticsJSAppWidget.prototype.load = function () {
            var self = this;
            var data = self.context['io']['load']();
            if (data) {
                console.info("In Load");
                var compressed = data;
                var str_data = compress.inflate(compressed);
                var data = JSON.parse(str_data);
                var ts_model = data['ts_model'];
                var gwt_model = data['gwt_model'];
                console.info("In Load 2");
                console.info(data);

                self.stargenetics_interface({
                    token: '1', command: 'open', data: { protocol: 'Serialized_1', model: gwt_model },
                    callbacks: {
                        onsuccess: function (ret, b) {
                            self.model = new SGModel.Top(ts_model);

                            console.info("Loaded");
                            self.show();
                        }, onerror: function (a, b) {
                            console.info("error:");
                            console.info(a);
                            window['stargenetics_save'] = a;
                            console.info(a['payload']['error']);
                        } } });
            }
        };
        return StarGeneticsJSAppWidget;
    })();
    exports.StarGeneticsJSAppWidget = StarGeneticsJSAppWidget;
});
//# sourceMappingURL=jsappwidget.js.map
