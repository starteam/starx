/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarX/lib/jqueryui.d.ts" />
/// <reference path="jsappmodel.ts" />
/// <amd-dependency path="lib/soyutils" />

import $ = require("jquery");

import JSStarGenetics = require('StarGenetics/jsappwidget');

import GlobalState = require("StarGenetics/state");
var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

export class StarGenetics {
    config:any;
    context:any = {};

    save(val:string) {
        var jq = $('[name=' + this.config.state + ']');
        var ret = $('#' + jq.attr('inputid'));
        ret.attr('value', encodeURI(val));
        if( this.config.unsaved_message ) {
            jq.show().text( this.config.unsaved_message );
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
                }
            }
        }

        console.info("StarGenetics/main.ts");
        console.info(config);

        var cls = new JSStarGenetics.StarGeneticsJSAppWidget(this.context, config);
        cls.run();
    }

}

if (false) {
    var x = new StarGenetics();
}
