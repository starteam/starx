/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="jsappmodel.ts" />

import $ = require("jquery");

import JSStarGenetics = require('StarGenetics/jsappwidget');

import GlobalState = require("StarGenetics/state");
var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

export class StarGenetics {
    config:any;
    context:any = {};
    edx_opts:any = {};
    cls:JSStarGenetics.StarGeneticsJSAppWidget;
    in_reset:boolean = false;
    in_editor:boolean = false;

    edx_specific(config:any) {
        if (config['edx_opts']) {
            this.edx_opts = config['edx_opts'];
            if (this.edx_opts['full_screen'] == true || this.edx_opts['full_screen'] == 'true') {
                $('.course-index').hide();
                $('.course-material').hide();
                $('.sequence-nav').hide();
            }
            if (this.edx_opts['hide_actions'] == true || this.edx_opts['hide_actions'] == 'true') {
                $('section.action').hide();
            }
            if( this.edx_opts['studio_hostname'] == document.location.hostname )
            {
                this.in_editor = true;
            }
        }
    }

    edx_postinit(data:any) {
        console.info( "edx_postinit" , this);
        if (this.edx_opts['auto_load'] == true || this.edx_opts['auto_load'] == 'true') {
            if(! this.in_reset ) {
                this.cls.load();
            }
        }
    }

    save(val:string) {
        var jq = $('[name=' + this.config.state + ']');
        var ret = $('#' + jq.attr('inputid'));
        ret.attr('value', encodeURI(val));
        if (this.edx_opts['hide_actions']) {
            $('input.check').click();
        }
        if (this.config.unsaved_message) {
            jq.show().text(this.config.unsaved_message);
        }
    }

    load():string {
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

    configure(config:any) {
        var self:StarGenetics = this;
        this.config = config;
        if (config['state']) {
            // enable edX integration
            this.context['io'] = {
                load: function ():string {
                    return self.load();
                },
                save: function (state:string) {
                    self.save(state);
                },
                reset: function(state) {
                    $('#'+config.element_id).html( "Restarting...");
                    self.in_reset = true;
                    self.cls = new JSStarGenetics.StarGeneticsJSAppWidget(self.context, config);
                    self.cls.run();
                },
                edx_postinit: function (state) {
                    self.edx_postinit(state);
                    self.in_reset = false;
                }
            }
        }
        else {
            this.context['io'] = {
                load: function ():string {
                    console.info("StarGenetics IO not enabled.");
                    return null;
                },
                save: function (state:string) {
                    console.info("StarGenetics IO not enabled.");
                },
                reset: function(state) {
                    self.in_reset = true;
                    self.cls = new JSStarGenetics.StarGeneticsJSAppWidget(self.context, config);
                    self.cls.run();
                },
                edx_postinit: function (state) {
                    self.edx_postinit(state);
                    self.in_reset = false;
                }
            }
        }

        console.info("StarGenetics/main.ts",config);

        this.edx_specific(config);
        if( this.in_editor )
        {
            var config_str = JSON.stringify(config);
            config_str = config_str.replace(/,/g,',\n');
            $('#'+config.element_id).html( "<div style='background-color: #a0b0c0; font-size:12pt; font-family: verdana, helvetica, arial, sans-serif'>StarGenetics application: Editor Mode - to be developed.<br><a href='https://starx.mit.edu/'>StarX web site</a><br><div>"+config_str+"</div></div>");
        }
        else
        {
            this.cls = new JSStarGenetics.StarGeneticsJSAppWidget(this.context, config);
            this.cls.run();
        }
    }

}

if (false) {
    var x = new StarGenetics();
}
