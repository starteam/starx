/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />

declare var window;

import $ = require('jquery');
import StarTMI = require('StarTMI/tmi');
import integration = require("StarX/edXintegration");
var tmi = new StarTMI.TMI();
import model = require("StarPedigree/Assignment");
import data = require("StarPedigree/Model");
import ui = require("StarPedigree/Widget");

export class StarPedigree {
    config:any;
    widget:ui.Widget;
    assignment:model.Assignment;

    configure(config:any) {
        tmi.event('StarPedigree', 'Start');
        var edX = new integration.Integration(config);
        edX.configRaven();
        this.config = config;
        var self:StarPedigree = this;
        var top = $('#' + config.element_id);
        var text = '';
        top.html("Welcome to " + this.config.StarX);
        this.assignment = new model.Assignment(data.model1);
        this.widget = new ui.Widget(config,this.assignment);
        this.widget.run();
//        top.html("Welcome to " + this.config.StarX + "!");
        window['__StarX'] = this.assignment;
    }
}