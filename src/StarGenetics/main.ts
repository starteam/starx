/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="jsappmodel.ts" />

import $ = require("jquery");

import JSStarGenetics = require('StarGenetics/jsappwidget');

import GlobalState = require("../StarGenetics_Obsolete/state");
var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

export class StarGenetics {

    set_message(message, config) {
        $('#' + config.element_id).html(message);
    }

    configure(config:any) {
        var state = config['state'];
        var cls = new JSStarGenetics.StarGeneticsJSAppWidget(state,config);
            cls.run();
    }

}

if (false) {
    var x = new StarGenetics();
}
