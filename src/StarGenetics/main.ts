/// <reference path="jsappmodel.ts" />
/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
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

import $ = require("jquery");

import GlobalState = require("StarGenetics/state");
var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

export class StarGenetics {

    widgets = {
        'JavaApp': {
            'require': 'StarGenetics/javaappwidget',
            'class': 'StarGeneticsJavaAppWidget'},
        'JSApp': {
            'require': 'StarGenetics/jsappwidget',
            'class': 'StarGeneticsJSAppWidget'
        },
        'SelectExperiment':{
            'require': 'StarGenetics/selectexperiment',
            'class': 'StarGeneticsSelectExperimentWidget'
        }
    };

    configure(config:StarGeneticsConfig) {
        var state = StarGeneticsGlobalState.get_state(config);
        if (typeof(this.widgets[config.Widget]) != 'undefined') {
            var map = this.widgets[config.Widget];
            var mod = require(map['require']);
            var cls = new mod[map['class']](state, config);
            cls.run();
        }
        else if (config.Widget == 'StudentID') {
            this.student_id_widget(state, config);
        }
        else {
            console.info("This starts main");
            this.set_message("StarGenetics: Other", config);
        }
    }

    set_message(message, config) {
        $('#' + config.element_id).html(message);
    }

    student_id_widget(state, config) {
        var StudentID = state.setStudentID(config);
        $('#' + StudentID.uid).html("StudentID set.");
    }
}

if (false) {
    var x = new StarGenetics();
}
