/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />

import $ = require('jquery');
import StarTMI = require('StarTMI/tmi');
import integration = require("StarX/edXintegration");
var tmi = new StarTMI.TMI();

export class StarMinimal {
    context:any = {};

    configure(config:any) {
        tmi.event('StarPedigree', 'Start');
        var edX = new integration.Integration(config);
        edX.configRaven();

        this.context.edX = edX;
        this.context.TMI = tmi;
        this.context.config = config;
        var top = $('#' + config.element_id);

        // here comes rest of your code
        // you are provided with CONTEXT
        // context has:
        //  edX - edX integration
        //  TMI - Google Analytics integration
        //  config - Config provided by StarX
        top.html("Welcome to " + this.context.config.StarX);
    }
}