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

/// <amd-reference path="StarGenetics/sg_client_mainframe.soy" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-ui" />
/// <amd-dependency path="StarGenetics/bundled_samples" />

import SGCSS = require("StarGenetics/sg_client_mainframe.css.soy");
import SGUIMAIN = require("StarGenetics/sg_client_mainframe.soy");
import bundled_samples = require("StarGenetics/bundled_samples");
import SGModel = require("StarGenetics/jsappmodel");
import SGState = require("../StarGenetics_Obsolete/state");
import VisualizerBase = require("StarGenetics/visualizers/base");
import SGSmiley = require("StarGenetics/visualizers/smiley");
import SGFly = require("StarGenetics/visualizers/fly");
import SGTests = require( "StarGenetics/tests/qunit");

import TEST = require("StarGenetics/tests/suite");
import compress = require("StarCommons/easy_deflate");

declare var jQuery;
var $ = jQuery;

export class StarGeneticsJSAppWidget {
    context:any;
    config:StarGeneticsConfig;
    stargenetics_interface:any = null;
    eventlistener_setup = false;
    model:SGModel.Top;

    constructor(context:any, config:StarGeneticsConfig) {
        var self:StarGeneticsJSAppWidget = this;
        this.context = context;
        this.config = config;

        var backend_model = undefined;
        if (config && config['config'] && config['config']['model_type'] == 'bundled_samples' && config['config']['bundled_samples']) {
            backend_model = bundled_samples[config['config']['bundled_samples']];
            config['config']['model'] = backend_model;
        }
        else {
            backend_model = bundled_samples.model1;
            config['config']['model'] = backend_model;
        }

        this.initModel(config);
        this.init();
    }

    /**
     * This method loads GWT frame & waits for it to finish loading
     */
        init() {
        var config = this.config;
        var url = (config['base_url'] ? config['base_url'] : '') + '/StarGenetics/gwtframe.html';
        $('#' + config.element_id).html("StarGenetics: ClientApp starting");
        var jq = $('<iframe id="' + config.element_id + '_gwt"/>').appendTo($('#' + config.element_id).parent()).hide();
        var q = jq[0];
        if (config['gwt_path']) {
            jq.attr('src', config['base_url'] + config['gwt_path']);
        } else {
            jq.attr('src', url);
        }
        $('<style>' + SGCSS.css_text({}) + '</style>').appendTo($('#' + config.element_id).parent());
        this.wait_for_sg_interface('#' + config.element_id + '_gwt', config, this);
    }

    /**
     * This method loads GWT frame & waits for it to finish loading
     */

        wait_for_sg_interface(id, config, self) {
        var target = 'StarGenetics';
        console.info("wait_for_sg_interface");
        console.info(self.model.ui);
        if (!self.eventlistener_setup) {
            self.eventlistener_setup = {};
            window.addEventListener('message', function (event:any) {
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
                            self.eventlistener_setup[ data.uid ] = callbacks;
                            console.info("post message");
                            console.info(data);
                            data.starx = target;
                            $(id)[0]['contentWindow'].postMessage(data, config.base_url);
                        };
                        console.info("Got it!... the interface");
                        $('#' + config.element_id).html("StarGenetics: ClientApp running");
                        window['stargenetics_interface'] = self.stargenetics_interface;
                        self.postInit();
                    }
                    else if (data['uid'] && data['command'] == 'callback') {
                        if (self.eventlistener_setup[ data.uid ]) {
                            var callbacks = self.eventlistener_setup[data.uid];
                            var kind = data['kind'];
                            var callback_data = data.data;
                            if (callbacks[kind]) {
                                console.info("calling back " + data.uid + " " + kind);
                                callbacks[kind](callback_data);
                            }
                            else {
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
            }, config.base_url);
        }

        var success = false;
        if (self.stargenetics_interface) {
            console.info("Got it!... the interface");
            $('#' + config.element_id).html("StarGenetics: ClientApp running");
            window['stargenetics_interface'] = self.stargenetics_interface;
            self.postInit();
            success = true;
        }
        try {
            if (!success && w.__sg_bg_exec) {

                self.stargenetics_interface = w.__sg_bg_exec;
                console.info("Got it!... the interface");
                $('#' + config.element_id).html("StarGenetics: ClientApp running");
                window['stargenetics_interface'] = self.stargenetics_interface;
                self.postInit();
                success = true;
            }
        } catch (e) {
            console.info("Error");
            console.info(e);
        } finally {
        }

        if (!success) {
            setTimeout(function () {
                self.wait_for_sg_interface(id, config, self)
            }, 250);
            console.info("Waiting...");
        }
    }

    /**
     * Post init executes when GWT is loaded
     */
        postInit() {
        this.start_client_app();
        this.testHook();
    }

    /**
     * Start Client App loads initial UI
     */
        start_client_app() {
        var self:StarGeneticsJSAppWidget = this;
        var main = $('#' + this.config.element_id);
        main.html(SGUIMAIN.main({config: this.config}));

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
    }

    /**
     * Test Hook load QTest & if URL warrants it loads test suite
     */
        testHook() {
        var self:any = this;
        if (SGTests.isTesting()) {
            SGTests.load(function (qunit) {
//                import TEST = require("StarGenetics/tests/suite");
                TEST.testSuite(qunit, self);
//                require(["StarGenetics/tests/suite"], function (suite) {
//                    suite.testSuite(qunit, self);
//                });
            });
        }
    }

    run() {

    }

    /**
     * This sets up model,
     * TODO: in the future it will decide on model to load from StarX configuration
     */
        initModel(config) {
        console.info(config['config']);
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
    }

    /**
     * Opens StarGenetics backend with selected model
     */
        open(callbacks ?) {
        var self:StarGeneticsJSAppWidget = this;
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
    }

    /**
     * Lists strains & relaods UI
     */
        list_strains(callbacks ?) {
        console.info("Running liststrain");
        var self:StarGeneticsJSAppWidget = this;
        this.stargenetics_interface({
            token: '1',
            command: 'liststrains',
            data: {
            },
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
    }

    /**
     * add parent
     * @param experiments
     */
        add_parent(experiment:SGModel.Experiment, strain:SGModel.Strain) {
        experiment.addParent(strain);
    }

    /**
     * Run mating experiment
     * @param experiments
     */
        mate(experiment:SGModel.Experiment, callbacks ?) {
        this.update_experiments(experiment, 'mate', callbacks);
    }

    /**
     * Run update experiment
     * @param experiments
     */
        update_experiments(experiment:SGModel.Experiment, command:string, callbacks ?) {
        console.info("Running update_experiments");
        console.info(experiment.toJSON());
        var self:StarGeneticsJSAppWidget = this;
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
                onerror: function (data) {
                    console.info(data);
                    SGTests.onsuccess(callbacks);
                    console.info("update_experiments Got error!");
                }
            }
        });

    }

    /**
     * Redraws UI
     */
        show() {
        var zoom_bugs_factor = 2;
        var self:StarGeneticsJSAppWidget = this;
        var main = $('.sg_workspace', '#' + this.config.element_id);
        main.html(SGUIMAIN.workspace({model: this.model}));
        setTimeout(function () {
            $('.sg_experiment_holder').each(function (index, holder) {
                var width = 0;
                var jq = $(this);
                var parent = jq.parent();
                var parent_width = parent.width();
                jq.children().each(function (i, c) {
                    console.info("width pre: ", width);
                    width += c.getBoundingClientRect().width + 2;
                    console.info("width post: ", width);

                });
                console.info("width calc:", width);
//                if( /Chrome/.test(navigator.appVersion ))
//                {
//                   width = width / 2; // ZOOM BUG
//                }
                width *= zoom_bugs_factor;
//                width = Math.round( width+1);
                console.info("width set: ", width);
                jq.css({'width': width + 'px'});
            });

            var sliders = $('div.sg_slider', main);
            sliders.each(function (index, slider) {
                var id = $(slider).data('kind');
                var table = $('[data-kind="' + id + '"][data-widget="slider-table"]');
                var thumb = $('.sg_slider_thumb', slider);
                var parent = table.parent();
                var parent_width = parent.width();
                var table_width = table.width();
                if (parent_width == 0) {
                    $(slider).hide();
                }
                else if (table_width < parent_width) {
                    $(slider).hide();
                }
                else {
                    console.info("table is");
                    console.info(table);

                    thumb.css({'width': Math.round(parent_width / table_width * 100) + '%'});
                    thumb.draggable({
                        containment: 'parent',
                        axis: "x",
                        drag: function (event) {
                            console.info("slider");
                            console.info(event);
                            var jq = $(this);
                            var parent = $(this).parent();
                            var this_offset = jq.offset();
                            var parent_offset = parent.offset();
                            var left_offset = this_offset.left - parent_offset.left;
                            var this_width = jq.width();
                            var parent_width = parent.width();
                            var scale = 1;
                            console.info(this_width);
                            if (this_width != 0) {
                                scale = (parent_width / this_width);
                            }
                            var table_offset = -left_offset * scale;
                            console.info(table);
                            table.css({'left': table_offset + 'px'});
                        }
                    });
                }
            });

        }, 10);

        $('.sg_experiment_box_floaty').off('click').on('click', function (e) {
            var id = $(this).data('kind');
            self.model.ui.experiments.show_experiment = id;
            console.info("Clicked here");
            e.stopPropagation();
            self.show();
        });


        $('.sg_expand_males').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            var phenotype_id = $(this).data('phenotype-id');
            var phenotype = JSON.stringify(phenotype_id);
            c['phenotypes'][phenotype].show_more_males = $(this).data('state');
            self.show();
        });
        $('.sg_move_start_males').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            var phenotype_id = $(this).data('phenotype-id');
            var phenotype = JSON.stringify(phenotype_id);
            c['phenotypes'][phenotype].start_index_male = c['phenotypes'][phenotype].start_index_male + ($(this).data('state') == '+' ? 5 : -5);
            self.show();
        });

        $('.sg_expand_females').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            var phenotype_id = $(this).data('phenotype-id');
            var phenotype = JSON.stringify(phenotype_id);
            c['phenotypes'][phenotype].show_more_females = $(this).data('state');
            self.show();
        });
        $('.sg_move_start_females').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
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
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            c.expanded = $(this).data('expanded');
            self.show();
        });
        $('.sg_strain_expand_visuals').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            c.visualsVisible = $(this).data('expanded-visuals');
            self.show();
        });
        $('.sg_strain_expand_properties').off('click').on('click', function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            c.propertiesVisible = $(this).data('expanded-properties');
            self.show();
        });
        $('.sg_clear_parents').off('click').on('click', function () {
            var c:SGModel.Experiment = <SGModel.Experiment>self.model.ui.get($(this).data('kind'));
            c.clearParents();
            self.show();
        });
        $('.sg_new_experiment_mate').off('click').on('click', function () {
            var c:SGModel.Experiment = <SGModel.Experiment>self.model.ui.get($(this).data('kind'));
            $('.sg_new_experiment_box').css({'overflow': 'hidden'}).animate({ 'height': 25}, 750, function () {
                self.mate(c, {onsuccess: function () {
                    console.info("Mate success!");

                }, onerror: function () {
                    console.info("Mate error!");
                }});
                self.show();
                $('.sg_new_experiment_box').css({'overflow': 'hidden'}).height(0).animate({ 'height': 160}, 2000);

            });
        });
        $('.sg_experiment_mate').off('click').on('click', function () {
            var c:SGModel.Experiment = <SGModel.Experiment>self.model.ui.get($(this).data('kind'));
            console.info("sg_experiment_mate");
            console.info(c);
            self.mate(c, {onsuccess: function () {
                console.info("Mate success!");

            }, onerror: function () {
                console.info("Mate error!");
            }});
            self.show();
        });
        $('.sg_strain_box').draggable({
            revert: true,
            start: function (e) {
                var parent = [];
                $(e.target).parents('.sg_slider_widget_wrapper').each(function(){
                    parent.push(this);
                })
                console.info( parent );
                $(parent).each( function() {
                    console.info( "Start" , this );
                    window['box'] = this;
                    var left_scroll = this.scrollLeft;
                    $(this).css({'overflow-x':'visible'});
                    $('[data-widget="slider-table"]',this).css({
                        'position':'relative',
                        'left':-left_scroll+'px',
                        'margin-bottom':'14px'
                    });
                });
                console.info("Start", e, $(e.target).parents('.sg_experiment_box'),$(e.target).parents('.sg_strains_box') );
            },
            stop: function (e) {
                var parent = [];
                $(e.target).parents('.sg_slider_widget_wrapper').each(function(){
                    parent.push(this);
                })
                $(parent).each( function() {
                    var $table = $('[data-widget="slider-table"]',this)
                    var left_scroll = parseInt($table.css('left')) ;
                    $table.css({
                        'position':'relative',
                        'left':'0px',
                        'margin-bottom':'0px'
                    });
                    $(this).css({'overflow-x':'scroll'}).scrollLeft(-left_scroll);
                });
                console.info("Stop", e, $(e.target).parents('.sg_experiment_box'),$(e.target).parents('.sg_strains_box') );
            }


        });
        $('.sg_experiment_parent').droppable({/*accept: '.sg_strain_box',*/
            drop: function (e, ui) {
                var target = $(this);
                var source = ui.draggable;

                var src_collection:SGModel.Collapsable = self.model.ui.get(source.data('kind'));
                var src_strain:SGModel.Strain = src_collection.get(source.data('id'));
                var target_collection:SGModel.Experiment = <SGModel.Experiment>self.model.ui.get(target.data('kind'));
                self.add_parent(target_collection, src_strain);
                self.show();
            }});

        $('.sg_add_strain_box').droppable({/*accept: '.sg_strain_box',*/
            drop: function (e, ui) {
                var target = $(this);
                var source = ui.draggable;
                var src_collection:SGModel.Collapsable = self.model.ui.get(source.data('kind'));
                var src_strain:SGModel.Strain = src_collection.get(source.data('id'));
                var target_collection:SGModel.Strains = <SGModel.Strains>self.model.ui.get(target.data('kind'));
                console.info("Drop");
                console.info(source);
                console.info(src_strain);
                console.info(target_collection);
                target_collection.add_strain(src_strain);
                self.show();
            }});

        var visualizer_name:string = (((((this.config['config'] || {})['model'] || {})['genetics'] || {})['visualizer'] || {})['name'] || "Not defined");
        var visualizer:VisualizerBase.Visualizer = new SGSmiley.Smiley();
        if (visualizer_name == 'fly') {
            visualizer = new SGFly.Fly();
        }
        $('.sg_strain_visual canvas').each(function () {
            var c:SGModel.Collapsable = self.model.ui.get($(this).data('kind'));
            var organism:SGModel.Strain = c.get($(this).data('id'));
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

        console.info("Save handler");
        $('.sg_workspace_save', main).off('click').on('click', function () {
            console.info("Save");
            self.stargenetics_interface({token: '1', command: 'save', data: {protocol: 'Version_1'},
                callbacks: {onsuccess: function (ret, b) {
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
                }}})
        });

        $('.sg_workspace_load', main).off('click').on('click', function () {
            console.info("Load");
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

                self.stargenetics_interface({token: '1', command: 'open', data: {protocol: 'Serialized_1', model: gwt_model },
                    callbacks: {onsuccess: function (ret, b) {
                        self.model = new SGModel.Top(ts_model);

                        console.info("Loaded");
                        self.show();

                    }, onerror: function (a, b) {
                        console.info("error:");
                        console.info(a);
                        window['stargenetics_save'] = a;
                        console.info(a['payload']['error']);
                    }}})
            }
        });

    }

}