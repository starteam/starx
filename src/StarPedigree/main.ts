/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/edXintegration.ts" />

declare var window;

import $ = require('jquery');
import StarTMI = require('StarTMI/tmi');
import integration = require("StarX/edXintegration");
var tmi = new StarTMI.TMI();

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
    }
}