/// <reference path="../StarX/lib/knockout.d.ts"/>
/// <reference path="../StarX/lib/jquery.d.ts" />

import kout = require( "../StarX/lib/knockout");
var ko:KnockoutStatic = kout.ko;
import editor = require( "../StarSimpleText/editor.soy");
import $ = require('jquery');
import main = require( "../StarSimpleText/main");

function AppViewModel(config) {
    this.preview =function(q) {
        var preview_config = JSON.parse(q);
        preview_config.element_id = config.element_id+"_Preview";
        var m = new main.StarSimpleText();
        m.configure(preview_config);
    }

    this.cols = ko.observable(config.cols? config.cols : "40");
    this.rows = ko.observable(config.rows? config.rows :"5");
    this.min_widget_height = ko.observable(config.min_widget_height?config.min_widget_height:"100px");
    this.state = ko.observable("jshidden");

    this.starx_text = ko.computed(function() {
        var starx = {
            StarX: "StarSimpleText",
            cols: this.cols(),
            rows: this.rows(),
            state: this.state(),
            min_widget_height: this.min_widget_height()
        }

        return JSON.stringify(starx);
    }, this, {notify:'always'});

    this.starx_text.subscribe(this.preview);
    this.preview( this.starx_text());
}

export class StarSimpleTextEditor {

    configure(config:any) {
        window['knockout'] = ko;
        console.info( "Editor config" , config, ko );
        var $e = $('#'+config.element_id)
        $e.html(editor.main({config:config}));
        ko.applyBindings(new AppViewModel(config), $e[0]);

    }

}
