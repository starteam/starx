/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />

declare var window;

import $ = require('jquery');
import StarTMI = require('StarTMI/tmi');
import integration = require("StarX/edXintegration");
var tmi = new StarTMI.TMI();
import Assignment = require("StarPedigree/Assignment");
import Model = require("StarPedigree/Model");

export class StarPedigree {
    config:any;

    configure(config:any) {
        tmi.event('StarPedigree', 'Start');
        var edX = new integration.Integration(config);
        edX.configRaven();
        this.config = config;
        var self:StarPedigree = this;
        var top = $('#' + config.element_id);
        var text = '';
        top.html("Welcome to " + this.config.StarX);
        var assignment = new Assignment.Assignment(Model.model1);
        console.info( assignment.ui ) ;
        top.html("Welcome to " + this.config.StarX + "!");
        window['__StarX'] = assignment;
    }
}