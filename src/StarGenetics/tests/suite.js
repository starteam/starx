/// <reference path="../../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../jsappwidget.ts" />
/// <reference path="../jsappmodel.ts" />
/// <reference path="../../../../starx/src/StarX/lib/jquery.d.ts" />
define(["require", "exports"], function(require, exports) {
    var $ = jQuery;

    var q;
    var app;

    function testSuite(qunit, jsappwidget) {
        console.info("running tests");
        q = qunit;
        app = jsappwidget;
        open_ps();
        liststrains();
        expandstrains();
        collapsestrains();
        expandstrains();
        expandnewexperiment();
        collapsenewexperiment();
        expandnewexperiment();
        expand_visuals_strains();
        set_experiment();
    }
    exports.testSuite = testSuite;

    function open_ps() {
        q.test("open", function () {
            app.open({
                onsuccess: function () {
                    console.info("Open passed");
                    q.ok(true);
                },
                onerror: function () {
                    console.info("Open failed");
                    q.ok(false);
                }
            });
        });
    }

    function liststrains() {
        q.test("liststrains", function () {
            app.list_strains({
                onsuccess: function () {
                    console.info("test_liststrains passed");
                    q.ok(true);
                },
                onerror: function () {
                    console.info("test_liststrains failed");
                    q.ok(false);
                }
            });
        });
    }

    function expand(kind, expanded) {
        q.test("expand " + kind, function () {
            var expand = $('.sg_expand[data-kind="' + kind + '"][data-expanded="' + expanded + '"]');
            q.equal(expand.size(), 1, "need at one sg_expand");
            expand.click();
        });
    }

    function expand_visuals(kind, expanded) {
        q.test("expand_visuals " + kind, function () {
            var expand = $('.sg_strain_expand_visuals[data-kind="' + kind + '"][data-expanded-visuals="' + expanded + '"]');
            q.equal(expand.size(), 1, "need at one sg_strain_expand_visuals");
            expand.click();
        });
    }

    function expandstrains() {
        expand('strains', 'true');
    }

    function collapsestrains() {
        expand('strains', 'false');
    }

    function expand_visuals_strains() {
        expand_visuals('strains', 'true');
    }

    function collapse_visuals_strains() {
        expand_visuals('strains', 'false');
    }

    function expandnewexperiment() {
        expand('new_experiment', 'true');
    }

    function collapsenewexperiment() {
        expand('new_experiment', 'false');
    }

    function set_experiment() {
        q.test("set_new_experiment", function () {
            $('.sg_clear_parents[data-kind="new_experiment"]').click();
            var list = app.model.ui.strains.list;
            var experiment = app.model.ui.get('new_experiment');
            app.add_parent(experiment, list[0]);
            app.add_parent(experiment, list[1]);
            app.mate(experiment, {
                onsuccess: function () {
                    console.info("test_liststrains passed");
                    q.ok(true);
                },
                onerror: function () {
                    console.info("test_liststrains failed");
                    q.ok(false);
                }
            });
        });
    }
});
