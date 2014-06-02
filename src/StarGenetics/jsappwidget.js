/// <reference path="../StarGenetics/state.ts" />
/// <reference path="../StarGenetics/config.d.ts" />
/// <reference path="jsappmodel.ts" />
/// <reference path="visualizers/smiley.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jqueryui.d.ts" />
/// <reference path="../StarGenetics/sg_client_mainframe.soy.d.ts" />
/// <reference path="../StarGenetics/sg_client_mainframe.css.soy.d.ts" />
/// <reference path="../StarCommons/easy_deflate.d.ts" />
define(["require", "exports", "StarGenetics/sg_client_mainframe.css.soy", "StarGenetics/sg_client_mainframe.soy", "StarGenetics/bundled_samples", "StarGenetics/jsappmodel", "StarGenetics/visualizers/smiley", "StarGenetics/visualizers/fly", "StarGenetics/tests/qunit", 'StarTMI/tmi', "StarGenetics/tests/suite", "StarCommons/easy_deflate", "jquery", "jquery-ui", "StarGenetics/bundled_samples"], function(require, exports, SGCSS, SGUIMAIN, bundled_samples, SGModel, SGSmiley, SGFly, SGTests, StarTMI, TEST, compress) {
    var tmi = new StarTMI.TMI();

    var $ = jQuery;

    var StarGeneticsJSAppWidget = (function () {
        function StarGeneticsJSAppWidget(context, config) {
            this.stargenetics_interface = null;
            this.eventlistener_setup = false;
            this.postInitExecuted = false;
            var self = this;
            this.context = context;
            this.config = config;
            this.workspace = $('#' + config.element_id);

            var backend_model = undefined;
            if (config && config['config'] && config['config']['model_type'] == 'bundled_samples' && config['config']['bundled_samples']) {
                tmi.event("StarGenetics", "Start", config['config']['bundled_samples']);
                backend_model = bundled_samples[config['config']['bundled_samples']];
                config['config']['model'] = backend_model;
            } else {
                tmi.event("StarGenetics", "Start", "Model1");
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
                    onerror: function (a, b) {
                        self.context['io']['log']("StarGenetics - Load");
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
                        self.context['io']['log']("StarGenetics - ListStrains");
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
            return experiment.addParent(strain);
        };

        /**
        * add strain
        * @param experiments
        */
        StarGeneticsJSAppWidget.prototype.add_strain = function (experiment, strain) {
            experiment.add_strain(strain);
            return true;
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
                var how_many_progenies = prompt("How many more progeny would you like to add? Enter a number between 1 and 500.", "" + avg_count);
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
                                this.context['io']['log']("StarGenetics - Avg number of progenies is less than 0");
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
                        self.context['io']['log']("StarGenetics - update_experiments");
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
            console.info("CONFIG", self.config);
            if (self.config['feature_flag']) {
                this.model['_feature_flag_'] = self.config['feature_flag'];
            }
            var main = $('.sg_workspace', '#' + this.config.element_id);
            main.html(SGUIMAIN.workspace({ model: this.model }));

            $('.sg_experiment_box_floaty').off('click').on('click', function (e) {
                var id = $(this).data('kind');
                self.model.ui.experiments.show_experiment = id;
                tmi.event("StarGenetics", "sg_select_experiment");
                e.stopPropagation();
                self.show();
            });

            $('.sg_dialog_close', main).off('click').on('click', function () {
                debugger;
                var $parent = $(this).closest('[data-widget="dialog"]');
                $parent.detach();
            });

            $('.sg_expand_males').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var phenotype = JSON.stringify(phenotype_id);

                //            c['phenotypes'][phenotype].show_more_males = $(this).data('state');
                tmi.event("StarGenetics", "sg_expand_males");

                //            self.show();
                var $parent = $(this).closest('.sg_experiment_box');
                var $dialog = $(SGUIMAIN.sg_expand_females({ experiment: c, phenotype: phenotype, list_kind: 'males_list' })).appendTo($parent);
                var offset_parent = $parent.offset();
                var offset_this = $(this).offset();
                $dialog.css({ top: (offset_this['top'] - offset_parent['top']) + "px", left: (offset_this.left - offset_parent.left) + "px" });
                self.apply_visualizer($dialog);
                self.apply_strain_drag_and_drop(main);
            });
            $('.sg_move_start_males').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var phenotype = JSON.stringify(phenotype_id);
                c['phenotypes'][phenotype].start_index_male = c['phenotypes'][phenotype].start_index_male + ($(this).data('state') == '+' ? 5 : -5);
                tmi.event("StarGenetics", "sg_move_start_males");
                self.show();
            });

            $('.sg_expand_females').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var phenotype = JSON.stringify(phenotype_id);

                //            c['phenotypes'][phenotype].show_more_females = $(this).data('state');
                tmi.event("StarGenetics", "sg_expand_females");
                var $parent = $(this).closest('.sg_experiment_box');
                var $dialog = $(SGUIMAIN.sg_expand_females({ experiment: c, phenotype: phenotype, list_kind: 'females_list' })).appendTo($parent);
                var offset_parent = $parent.offset();
                var offset_this = $(this).offset();
                $dialog.css({ top: (offset_this.top - offset_parent.top) + "px", left: (offset_this.left - offset_parent.left) + "px" });
                self.apply_visualizer($dialog);
                self.apply_strain_drag_and_drop(main);
                self.sg_dialog_close($dialog, undefined);
            });
            $('.sg_move_start_females').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var phenotype = JSON.stringify(phenotype_id);
                c['phenotypes'][phenotype].start_index_female = c['phenotypes'][phenotype].start_index_female + ($(this).data('state') == '+' ? 5 : -5);
                tmi.event("StarGenetics", "sg_move_start_females");
                self.show();
            });

            $('.sg_show_more').off('click').on('click', function () {
                var more = $(this).data('increment');
                if (more == '+') {
                    self.model.ui.experiments.show_more(5);
                } else if (more == '-') {
                    self.model.ui.experiments.show_more(-5);
                }
                tmi.event("StarGenetics", "sg_show_more", more);

                self.show();
            });

            $('.sg_expand').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.expanded = $(this).data('expanded');
                tmi.event("StarGenetics", "sg_expand", $(this).data('expanded'));
                self.show();
            });

            $('.sg_rename').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                if (c) {
                    var old_name = c.name;
                    var new_name = prompt("Please enter new experiment name:", old_name);
                    if (new_name != null) {
                        c.name = new_name;
                        _.each(c.list, function (s) {
                            if (s.name.indexOf(old_name) == 0) {
                                s.name = new_name + s.name.substr(old_name.length);
                            }
                        });
                        tmi.event("StarGenetics", "sg_rename", old_name + " -> " + new_name);
                        self.show();
                    }
                }
            });

            var sg_current_experiment_name_input_hide = function () {
                $('.sg_current_experiment_name_save').css({ 'visibility': 'hidden' });
                $('.sg_current_experiment_name_cancel').css({ 'visibility': 'hidden' });
                $('.sg_current_experiment_name').css({ 'background-color': 'rgba(0,128,0,0)' });
            };

            var sg_current_experiment_name_input_show = function () {
                $('.sg_current_experiment_name_save').css({ 'visibility': 'visible' });
                $('.sg_current_experiment_name_cancel').css({ 'visibility': 'visible' });
                $('.sg_current_experiment_name').css({ 'background-color': 'rgba(0,128,0,.7)' });
            };
            var sg_current_experiment_name_input_change = function () {
                var c = self.model.ui.get($(this).data('kind'));
                if (c) {
                    var old_name = c.name;
                    var new_name = $(this).val();
                    console.info("old_name", old_name, "new_name", new_name);
                    if (new_name != null && new_name.length > 0 && new_name != old_name) {
                        sg_current_experiment_name_input_show();
                    } else {
                        sg_current_experiment_name_input_hide();
                    }
                }
            };

            sg_current_experiment_name_input_hide();
            $('.sg_current_experiment_name_input').off('focus').on('focus', function () {
                sg_current_experiment_name_input_show();
            });

            $('.sg_current_experiment_name_input').off('blur').on('blur', sg_current_experiment_name_input_change);

            $('.sg_current_experiment_name_save').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                if (c) {
                    var old_name = c.name;
                    var new_name = $('.sg_current_experiment_name_input[data-kind="' + $(this).data('kind') + '"]').val();
                    if (new_name != null && new_name.length > 0) {
                        c.name = new_name;
                        _.each(c.list, function (s) {
                            if (s.name.indexOf(old_name) == 0) {
                                s.name = new_name + s.name.substr(old_name.length);
                            }
                        });
                        tmi.event("StarGenetics", "sg_rename", old_name + " -> " + new_name);
                        self.show();
                    }
                }
            }).css({ visibility: 'hidden' });

            $('.sg_current_experiment_name_cancel').off('click').on('click', function () {
                //            }
                self.show();
            }).css({ visibility: 'hidden' });

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
                        tmi.event("StarGenetics", "sg_discard");
                    }
                }
                self.show();
            });

            $('.sg_experiment_parent_remove').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                if (c instanceof SGModel.NewExperiment) {
                    var newexp = c;
                    newexp.clearParent($(this).data('id'));
                    tmi.event("StarGenetics", "sg_experiment_parent_remove");
                    self.show();
                }
            });

            $('.sg_s_strain_remove').off('click').on('click', function () {
                console.info("sg_s_strain_remove");
                var c = self.model.ui.get($(this).data('kind'));
                console.info("sg_s_strain_remove", c);
                if (c instanceof SGModel.NewExperiment) {
                    var newexp = c;
                    newexp.clearParent($(this).data('id'));
                    tmi.event("StarGenetics", "sg_experiment_strain_remove");
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
                tmi.event("StarGenetics", "sg_strain_expand_properties", "" + c.propertiesVisible);
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
                tmi.event("StarGenetics", "sg_new_experiment_mate");

                //            $('.sg_new_experiment_box').css({'overflow': 'hidden'}).animate({ 'height': 25}, 750, function () {
                self.mate(c, {
                    onsuccess: function () {
                        console.info("Mate success!");
                    }, onerror: function () {
                        console.info("Mate error!");
                        self.context['io']['log']("StarGenetics - Mate Error");
                    }, avg_offspring_count: count
                });
                self.show();
                //$('.sg_new_experiment_box').css({'overflow': 'hidden'}).height(0).animate({ 'height': 160}, 2000);
                //            });
            });
            $('.sg_new_experiment_mate_count').off('keyup').on('keyup', function (e) {
                console.info($(this).val());
                $('.sg_new_experiment_mate').attr('disabled', !(parseInt($(this).val()) > 0));
            });
            $('.sg_experiment_mate').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                tmi.event("StarGenetics", "sg_experiment_mate");
                self.mate(c, {
                    onsuccess: function () {
                        console.info("Mate success!");
                    }, onerror: function () {
                        console.info("Mate error!");
                        self.context['io']['log']("StarGenetics - Mate Error");
                    } });
                self.show();
            });

            $('.sg_strain_box', '.sg_mini_experiment_box').draggable({ 'disabled': true }).addClass('sg_strain_box_nohover');

            $('.sg_experiment_parent').droppable({ drop: function (e, ui) {
                    var target = $(this);
                    var source = ui.draggable;

                    var src_collection = self.model.ui.get(source.data('kind'));
                    var src_strain = src_collection.get(source.data('id'));
                    var target_collection = self.model.ui.get(target.data('kind'));
                    var success = self.add_parent(target_collection, src_strain);
                    if (!success) {
                        return;
                    }
                    tmi.event("StarGenetics", "sg_experiment_parent", src_strain.name);
                    self.show();
                } });

            $('.sg_add_strain_box').droppable({ drop: function (e, ui) {
                    var target = $(this);
                    var source = ui.draggable;
                    var src_collection = self.model.ui.get(source.data('kind'));
                    var src_strain = src_collection.get(source.data('id'));
                    var target_collection = self.model.ui.get(target.data('kind'));
                    target_collection.add_strain(src_strain);
                    tmi.event("StarGenetics", "sg_experiment_parent", src_strain.name);
                    self.show();
                } });

            $('.sg_expand_class').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                var phenotype_id = $(this).data('phenotype-id');
                var class_name = $(this).data('class-name');
                var phenotype = JSON.stringify(phenotype_id);
                tmi.event("StarGenetics", "sg_expand_class");
                var $table = $(this).closest('.sg_slider_table');
                var $parent = $table.parent();
                var $dialog = $(SGUIMAIN.sg_expand_class({ experiment: c, phenotype: phenotype, name: class_name })).appendTo($parent);
                var offset_parent = $parent.offset();
                var offset_this = $(this).offset();

                //            setTimeout(function () {
                $dialog.css({ top: "30px", left: "150px", width: ($parent.width() - 70) + "px", height: $table.height() + "px", position: "absolute" });

                var w = $('.sg_slider_widget_wrapper', $dialog);
                var w_1 = $('.sg_expand_dialog_strain', w).width() + 15;
                var count = c['phenotypes'][phenotype]['list'].length;
                console.info("here we go:", w_1, count);
                var hh = ($table.height() - 30);
                if (hh > 130) {
                    hh = 130;
                }
                w.css({ width: ($parent.width() - 50) + "px", height: hh + "px" });
                $('.sg_expand_class_dialog_list', w).css({ 'width': (count * w_1) + 'px', 'height': '50px' });
                console.info("And this is the dialog", $('.sg_slider_widget_wrapper', $dialog));

                //            }, 1);
                //            $dialog.css({top: (offset_this.top - offset_parent.top) + "px", left: (offset_this.left - offset_parent.left) + "px", width:$parent.width() + "px" , height: $parent.height() + "px"});
                self.apply_visualizer($dialog);
                self.apply_strain_drag_and_drop(main);
                self.sg_dialog_close($dialog, $table);
                setTimeout(function () {
                    $table.css({ visibility: 'hidden' });
                }, 1);
                //            $table.animate({'opacity':'toggle'});
            });

            self.apply_visualizer(main);
            self.apply_strain_drag_and_drop(main);

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
                var really_reset = confirm("Are you sure that you would like to reset your StarGenetics window? This will delete all of your current, unsaved work within StarGenetics.");
                if (really_reset) {
                    self.reset();
                }
            });
        };

        StarGeneticsJSAppWidget.prototype.sg_dialog_close = function ($dialog, $table) {
            $('.sg_dialog_close', $dialog).off('click').on('click', function () {
                var $parent = $(this).closest('[data-widget="dialog"]');
                $parent.detach();
                setTimeout(function () {
                    $table.css({ visibility: 'visible' });
                }, 1);
            });
        };

        StarGeneticsJSAppWidget.prototype.apply_visualizer = function (scope) {
            var self = this;
            var visualizer_name = (((((this.config['config'] || {})['model'] || {})['genetics'] || {})['visualizer'] || {})['name'] || "Not defined");
            var visualizer = new SGSmiley.Smiley();
            if (visualizer_name == 'fly') {
                visualizer = new SGFly.Fly();
            }
            $('.sg_strain_visual canvas', scope).each(function () {
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
        };

        StarGeneticsJSAppWidget.prototype.apply_strain_drag_and_drop = function (scope) {
            var self = this;
            $('.sg_strain_box').draggable({
                revert: true,
                start: function (e) {
                    var parent = $(e.target).closest('.sg_slider_widget_wrapper');

                    //                var parent = [];
                    //                $(e.target).parents('.sg_slider_widget_wrapper').each(function () {
                    //                    parent.push(this);
                    //                })
                    console.info(parent);
                    $(parent).each(function () {
                        console.info("Start", this);
                        window['box'] = this;
                        var left_scroll = this.scrollLeft;
                        var top_scroll = this.scrollTop;
                        $(this).data('overflow-x', $(this).css('overflow-x'));
                        $(this).data('overflow-y', $(this).css('overflow-y'));

                        $(this).css({ 'overflow-x': 'visible', 'overflow-y': 'visible', 'margin-bottom': '10px' }).scrollLeft(-0).scrollTop(-9);
                        var table = $('[data-widget="slider-table"]', this).css({
                            'position': 'relative',
                            'left': -left_scroll + 'px',
                            'top': -top_scroll + 'px',
                            'padding-bottom': '16px'
                        });
                        var elem = $(e.target).closest('.sg_expand_dialog_strain');
                        $('.sg_expand_dialog_strain', table).not(elem).each(function () {
                            if (self.is_overflow_hidden($(this), $(parent))) {
                                $(this).css({ 'visibility': 'hidden' });
                            }
                        });
                    });
                    console.info("Start", e, $(e.target).parents('.sg_experiment_box'), $(e.target).parents('.sg_strains_box'));
                },
                stop: function (e) {
                    var parent = $(e.target).closest('.sg_slider_widget_wrapper');

                    //                var parent = [];
                    //                $(e.target).parents('.sg_slider_widget_wrapper').each(function () {
                    //                    parent.push(this);
                    //                })
                    $(parent).each(function () {
                        var $table = $('[data-widget="slider-table"]', this);
                        var left_scroll = parseInt($table.css('left'));
                        var top_scroll = parseInt($table.css('top'));
                        $table.css({
                            'position': 'relative',
                            'left': '0px',
                            'top': '0px'
                        });
                        $(this).css({ 'overflow-x': $(this).data('overflow-x'), 'overflow-y': $(this).data('overflow-y'), 'margin-bottom': '0px' }).scrollLeft(-left_scroll).scrollTop(-top_scroll);
                        $('.sg_expand_dialog_strain', $table).css({ 'visibility': 'visible' });
                    });

                    console.info("Stop", e, $(e.target).parents('.sg_experiment_box'), $(e.target).parents('.sg_strains_box'));
                },
                helper: function (event) {
                    console.info("HELPER", event, this);
                    var copy = $(this).clone().removeAttr("id");
                    copy.append(SGUIMAIN.plus_floaty({}));
                    copy.data('never_hide', true);
                    var canvas0 = $('canvas', this)[0];
                    if (canvas0) {
                        var canvas = $('canvas', copy)[0];
                        canvas.width = canvas0.width;
                        canvas.height = canvas0.height;
                        var context = canvas.getContext('2d');
                        context.drawImage(canvas0, 0, 0);
                    }
                    $(".sg_select_strain_target").detach();
                    return copy;
                }
            }).addClass('sg_strain_box_hover');
            $('.sg_strain_box').off('click').on('click', function () {
                $(".sg_select_strain_target").detach();
                var id = $(this).data('id');
                var kind = $(this).data('kind');

                var html = SGUIMAIN.sg_select_strain_target({
                    kind: kind,
                    id: id
                });
                var parent = $(this).offsetParent();
                var this_offset = $(this).position();
                var css = {
                    'top': (this_offset.top) + 'px',
                    'left': (this_offset.left - 125) + 'px',
                    'height': $(this).height() + 'px'
                };
                $(html).appendTo(parent).css(css);
            });

            $(self.workspace).off('click', '.sg_add_to_mating_site').on('click', '.sg_add_to_mating_site', function () {
                console.info("sg_add_to_mating_site", this);
                var c = self.model.ui.get($(this).data('kind'));
                var src_strain = c.get($(this).data('id'));
                var target = $('.sg_experiment_parent').first();
                var target_collection = self.model.ui.get(target.data('kind'));
                var success = self.add_parent(target_collection, src_strain);
                if (!success) {
                    self.show();
                    return;
                }
                tmi.event("StarGenetics", "sg_experiment_parent", src_strain.name);
                self.show();
            });

            $(self.workspace).off('click', '.sg_add_to_strains').on('click', '.sg_add_to_strains', function () {
                console.info("sg_add_to_mating_site", this);
                var c = self.model.ui.get($(this).data('kind'));
                var src_strain = c.get($(this).data('id'));
                var target_collection = self.model.ui.get('strains');
                var success = self.add_strain(target_collection, src_strain);
                if (!success) {
                    return;
                }
                tmi.event("StarGenetics", "sg_experiment_parent", src_strain.name);
                self.show();
            });
        };

        StarGeneticsJSAppWidget.prototype.is_overflow_hidden = function (elem, parent) {
            var elem_offset = elem.offset();
            var parent_offset = parent.offset();
            if (elem_offset['top'] < parent_offset['top']) {
                return true;
            }
            return false;
        };

        StarGeneticsJSAppWidget.prototype.reset = function () {
            var self = this;
            tmi.event("StarGenetics", "Reset");
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
                        tmi.event("StarGenetics", "Save", "" + (compressed ? compressed.length : 0));

                        self.context['io']['save'](compressed);
                    }, onerror: function (a, b) {
                        window['localStorage']['sg_save'] = a;
                        self.context['io']['log']("StarGenetics - Save Error");
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
                if (data) {
                    var ts_model = data['ts_model'];
                    var gwt_model = data['gwt_model'];
                    if (ts_model && gwt_model) {
                        self.stargenetics_interface({
                            token: '1', command: 'open', data: { protocol: 'Serialized_1', model: gwt_model },
                            callbacks: {
                                onsuccess: function (ret, b) {
                                    self.model = new SGModel.Top(ts_model);
                                    tmi.event("StarGenetics", "Load", "" + (str_data ? str_data.length : 0));

                                    self.show();
                                }, onerror: function (a, b) {
                                    window['stargenetics_save'] = a;
                                    self.context['io']['log']("StarGenetics - Load Error");
                                } } });
                    }
                }
            }
        };
        return StarGeneticsJSAppWidget;
    })();
    exports.StarGeneticsJSAppWidget = StarGeneticsJSAppWidget;
});
//# sourceMappingURL=jsappwidget.js.map
