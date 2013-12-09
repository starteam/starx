/// <reference path="jsappmodel.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/jquery-ui-1.8.x.d.ts" />
/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <amd-dependency path="StarGenetics/stargeneticsws.soy" />
/// <amd-dependency path="StarGenetics/sg_client_mainframe.soy" />
/// <amd-dependency path="css!StarGenetics/sg_client_mainframe.css" />
/// <amd-dependency path="StarGenetics/state" />
/// <amd-dependency path="StarGenetics/javaappwidget" />
/// <amd-dependency path="StarGenetics/jsappwidget" />
/// <amd-dependency path="StarGenetics/jsappmodel" />
/// <amd-dependency path="StarGenetics/selectexperiment" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-ui" />
define(["require", "exports", "StarGenetics/stargeneticsws.soy", "StarGenetics/sg_client_mainframe.soy", "css!StarGenetics/sg_client_mainframe.css", "StarGenetics/state", "StarGenetics/javaappwidget", "StarGenetics/jsappwidget", "StarGenetics/jsappmodel", "StarGenetics/selectexperiment", "jquery", "jquery-ui"], function(require, exports) {
    var $ = require("jquery");

    var GlobalState = require("StarGenetics/state");
    var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

    var StarGenetics = (function () {
        function StarGenetics() {
            this.widgets = {
                'JavaApp': {
                    'require': 'StarGenetics/javaappwidget',
                    'class': 'StarGeneticsJavaAppWidget' },
                'JSApp': {
                    'require': 'StarGenetics/jsappwidget',
                    'class': 'StarGeneticsJSAppWidget'
                },
                'SelectExperiment': {
                    'require': 'StarGenetics/selectexperiment',
                    'class': 'StarGeneticsSelectExperimentWidget'
                }
            };
        }
        StarGenetics.prototype.configure = function (config) {
            var state = StarGeneticsGlobalState.get_state(config);
            if (typeof (this.widgets[config.Widget]) != 'undefined') {
                var map = this.widgets[config.Widget];
                var mod = require(map['require']);
                var cls = new mod[map['class']](state, config);
                cls.run();
            } else if (config.Widget == 'StudentID') {
                this.student_id_widget(state, config);
            } else {
                console.info("This starts main");
                this.set_message("StarGenetics: Other", config);
            }
        };

        StarGenetics.prototype.set_message = function (message, config) {
            $('#' + config.element_id).html(message);
        };

        StarGenetics.prototype.student_id_widget = function (state, config) {
            var StudentID = state.setStudentID(config);
            $('#' + StudentID.uid).html("StudentID set.");
        };
        return StarGenetics;
    })();
    exports.StarGenetics = StarGenetics;

    if (false) {
        var x = new StarGenetics();
    }
});
//# sourceMappingURL=main.js.map
