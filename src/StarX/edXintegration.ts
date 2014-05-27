/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jquery.ts" />

import jQuery = require("StarX/lib/jquery");
var $ = jQuery['$'];
import StarTMI = require('StarTMI/tmi');
var tmi = new StarTMI.TMI();


export class Integration {
    config:any = {};
    edx_opts:any = {};
    in_reset:boolean = false;
    public in_editor:boolean = false;
    public autoload:boolean = false;

    constructor(config:any) {
        this.config = config || {};
    }

    init() {
        var config = this.config;
        if (config['edx_opts']) {
            if (this.edx_opts['studio_hostname'] == document.location.hostname) {
                this.in_editor = true;
                return;
            }
        }
        if (this.edx_opts['full_screen'] == true || this.edx_opts['full_screen'] == 'true') {
            $('.course-index').hide();
            $('.course-material').hide();
            $('.sequence-nav').hide();
        }

        if (this.edx_opts['hide_actions'] == true || this.edx_opts['hide_actions'] == 'true') {
            $('section.action').hide();
        }

        if (this.edx_opts['auto_load'] == true || this.edx_opts['auto_load'] == 'true') {
            this.autoload = true;
        }
        tmi.event(this.config.StarX || "Unknown", "edX", $('.user-link').text().replace(/\s*/g, '').replace('Dashboardfor:', ''));
    }

    public save(val:string) {
        var jq = $('[name=' + this.config.state + ']');
        var ret = $('#' + jq.attr('inputid'));
        ret.attr('value', encodeURI(val));
        if (this.edx_opts['hide_actions']) {
            $('input.check, input.save').click();
        }
        if (this.config.unsaved_message) {
            jq.show().text(this.config.unsaved_message);
        }
    }

    public load():string {
        var jq = $('[name=' + this.config.state + ']');
        var ret = $('#' + jq.attr('inputid'));
        try {
            return decodeURI(ret.attr('value'));
        }
        catch (e) {
            console.debug("value can not be decoded, failing back on raw");
            return ret ? ret.attr('value') : '';
        }
    }

    public configRaven() {
        tmi.configure_raven(
            'https://b71ed16774dd47c896988d743f1ce940@app.getsentry.com/20171', { whitelistUrls: ['mit.edu'] }, function (Raven) {
                if (Raven) {
                    if (this.config['edx_opts']) {
                        Raven.setUser({ id: $('.user-link').text().replace(/\s*/g, '').replace('Dashboardfor:', '') });
                    }
                }
            });


    }

}