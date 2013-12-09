/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <reference path="jsappmodel.ts" />
/// <reference path="visualizers/smiley.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jqueryui.d.ts" />
define(["require", "exports", "StarGenetics/sg_client_mainframe.soy", "StarGenetics/json_sample_model", "StarGenetics/jsappmodel", "StarGenetics/visualizers/smiley", "StarGenetics/visualizers/fly", "StarGenetics/tests/qunit", "jquery", "jquery-ui", "StarGenetics/json_sample_model"], function(require, exports, SGUIMAIN, json_sample_model, SGModel, SGSmiley, SGFly, SGTests) {
    var $ = jQuery;

    var StarGeneticsJSAppWidget = (function () {
        function StarGeneticsJSAppWidget(state, config) {
            var self = this;
            this.state = state;
            this.config = config;
            this.initModel();
            this.init();
        }
        /**
        * This method loads GWT frame & waits for it to finish loading
        */
        StarGeneticsJSAppWidget.prototype.init = function () {
            var config = this.config;
            $('#' + config.element_id).html("StarGenetics: ClientApp starting");
            $('<iframe id="' + config.element_id + '_gwt" src="/StarGenetics/gwtframe.html"/>').appendTo($('#' + config.element_id).parent()).hide();
            this.wait_for_sg_interface('#' + config.element_id + '_gwt', config, this);
        };

        /**
        * This method loads GWT frame & waits for it to finish loading
        */
        StarGeneticsJSAppWidget.prototype.wait_for_sg_interface = function (id, config, self) {
            console.info("wait_for_sg_interface");
            console.info(self.model.ui);

            var iframe = $(id)[0];
            var w = iframe['contentWindow'];

            if (w.__sg_bg_exec) {
                self.stargenetics_interface = w.__sg_bg_exec;
                console.info("Got it!... the interface");
                $('#' + config.element_id).html("StarGenetics: ClientApp running");
                window['stargenetics_interface'] = self.stargenetics_interface;
                self.postInit();
            } else {
                setTimeout(function () {
                    self.wait_for_sg_interface(id, config, self);
                }, 250);
                console.info("Waiting...");
            }
        };

        /**
        * Post init executes when GWT is loaded
        */
        StarGeneticsJSAppWidget.prototype.postInit = function () {
            this.start_client_app();
            this.testHook();
        };

        /**
        * Start Client App loads initial UI
        */
        StarGeneticsJSAppWidget.prototype.start_client_app = function () {
            var self = this;
            var main = $('#' + this.config.element_id);
            main.html(SGUIMAIN.main({ config: this.config }));
            $('.sg_open_ps', main).off('click').on('click', function () {
                console.info("Click on open");
                self.open();
            });
        };

        /**
        * Test Hook load QTest & if URL warrants it loads test suite
        */
        StarGeneticsJSAppWidget.prototype.testHook = function () {
            var self = this;
            if (SGTests.isTesting()) {
                SGTests.load(function (qunit) {
                    require(["StarGenetics/tests/suite"], function (suite) {
                        suite.testSuite(qunit, self);
                    });
                });
            }
        };

        StarGeneticsJSAppWidget.prototype.run = function () {
        };

        /**
        * This sets up model,
        * TODO: in the future it will decide on model to load from StarX configuration
        */
        StarGeneticsJSAppWidget.prototype.initModel = function () {
            var model = new SGModel.Top({
                backend: json_sample_model.model1,
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
            console.info(model);
            console.info("backend:");
            console.info(json_sample_model.model1);
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
            this.update_experiments(experiment, 'mate', callbacks);
        };

        /**
        * Run update experiment
        * @param experiments
        */
        StarGeneticsJSAppWidget.prototype.update_experiments = function (experiment, command, callbacks) {
            console.info("Running update_experiments");
            console.info(experiment.toJSON());
            var self = this;
            this.stargenetics_interface({
                token: '1',
                command: 'updateexperiment',
                data: {
                    experiment: experiment.toJSON(),
                    command: command
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
                    onerror: function () {
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
            var self = this;
            var main = $('.sg_workspace', '#' + this.config.element_id);
            main.html(SGUIMAIN.workspace({ model: this.model }));

            $('.sg_expand').off('click').on('click', function () {
                var c = self.model.ui.get($(this).data('kind'));
                c.expanded = $(this).data('expanded');
                self.show();
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
                self.mate(c, {
                    onsuccess: function () {
                        console.info("Mate success!");
                    }, onerror: function () {
                        console.info("Mate error!");
                    } });
                self.show();
            });

            $('.sg_strain_box').draggable({ revert: true });
            $('.sg_experiment_parent').droppable({ drop: function (e, ui) {
                    console.info("Hello World");
                    console.info(this);
                    console.info(e);
                    console.info(ui);

                    var target = $(this);
                    var source = ui.draggable;

                    var src_collection = self.model.ui.get(source.data('kind'));
                    var src_strain = src_collection.get(source.data('id'));
                    var target_collection = self.model.ui.get(target.data('kind'));
                    self.add_parent(target_collection, src_strain);
                    self.show();
                } });

            console.error("Visualizer config");
            var visualizer_name = (((((this.config['config'] || {})['model'] || {})['genetics'] || {})['visualizer'] || {})['name'] || "Not defined");
            var visualizer = new SGSmiley.Smiley();
            console.error(this.config);
            console.error(visualizer_name);
            if (visualizer_name == 'fly') {
                visualizer = new SGFly.Fly();
            }
            $('.sg_strain_visual canvas').each(function () {
                var c = self.model.ui.get($(this).data('kind'));
                var organism = c.get($(this).data('id'));
                console.error("RENDER");
                console.error(organism);
                visualizer.render($(this)[0], organism.properties, organism);
                window['c'] = this;
                window['v'] = visualizer;
                var qq = this;
                window['rr'] = function () {
                    console.info("Hello World!");
                    console.info(qq);
                    console.info(visualizer);
                    console.info(organism);
                    visualizer.render($(qq)[0], organism.properties, organism);
                };
            });
        };
        return StarGeneticsJSAppWidget;
    })();
    exports.StarGeneticsJSAppWidget = StarGeneticsJSAppWidget;
});
//# sourceMappingURL=jsappwidget.js.map
