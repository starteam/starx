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
        if (config.model && config.model.indexOf('/') != -1) {
            top.html("Load:" + config.model);
            $.getJSON(config.model, function (json, textStatus, jqXHR) {
                console.info("data", json, "textStatus", textStatus, "jqXHR", jqXHR);
                top.html("Loaded:" + config.model);
                this.assignment = new model.Assignment(json);
                window['__StarX'] = this.assignment;
                this.widget = new ui.Widget(config, this.assignment);
                this.widget.run();

            });
        }
        else if (data[ config.model ]) {
            this.assignment = new model.Assignment(data[config.model]);
            window['__StarX'] = this.assignment;
            this.widget = new ui.Widget(config, this.assignment);
            this.widget.run();
        }
        else {
            this.assignment = new model.Assignment(data.model1);
            window['__StarX'] = this.assignment;
            this.widget = new ui.Widget(config, this.assignment);
            this.widget.run();
        }
//        top.html("Welcome to " + this.config.StarX + "!");
    }
}