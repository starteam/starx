/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarTMI/tmi.ts" />

declare var window;

import $ = require("jquery");
import StarTMI = require("StarTMI/tmi");
var tmi:StarTMI.TMI = new StarTMI.TMI();

import WidgetModule = require("StarDistanceMap/widget");

var old_value = '';
var demo_config = {
    display_map: 'true',
    genes: [
        {
            id: 'M1',
            name: 'M-1'
        },
        {
            id: 'M2',
            name: 'M-2'
        },
        {
            id: 'M3',
            name: 'M-3'
        },
        {
            id: 'M4',
            name: 'M-4'
        },
        {
            id: 'M5',
            name: 'M-5'
        },
        {
            id: 'M6',
            name: 'M-6'
        },
        {
            id: 'le',
            name: 'le'
        },
        {
            id: 'xy',
            name: 'XY'
        }
    ],
    gene_groups: [
        {
            title: 'Strains',
            genes: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6']
        },
        {   title: 'Mapping Strains',
            genes: ['le', 'xy']
        }
    ],
    color_genes: true,
    chromosomes: [
        {name: 'Chromosome 1', sex_linked: false},
        {name: 'Chromosome 2', sex_linked: false}
    ],
    centromere: false,
    callback: function (obj) {
        console.info(obj);
        console.info(obj.ascii);
        if (old_value != obj.ascii) {
            this.tmi.event('StarX_DistanceMatrix', "DemoConfig", obj.ascii);
            old_value = obj.ascii;
        }
    }
}
export class StarDistanceMap {
    config:any;

    input_div(text, state) {
        var jq = $('[name=' + this.config.state + ']');
        jq.show().text(text);
        var ret = $('#' + jq.attr('inputid'));
        ret.attr('value', state);
    }

    get_input() {
        var jq = $('[name=' + this.config.state + ']');
        var ret = $('#' + jq.attr('inputid'));
        var state = ret.attr('value');
        try {
            if(state)
            {
                var s = JSON.parse(state);
                jq.show().text(s['ascii']);
                return s;
            }
        } catch(e) {
            console.info(e);
        }
        return undefined;
    }

    input_element() {
        console.info("input element");
        try
        {
            throw "new";
        }
        catch(e)
        {
            console.info(e);
        }
        var jq = $('[name=' + this.config.state + ']');
        console.info(jq);
        var ret = $('#' + jq.attr('inputid'));
        console.info(ret);
        console.info(ret.attr('value'));
        return ret;
    }

    callback(data) {
        console.info(data);
        this.input_div(data['ascii'], JSON.stringify(data));
        $('#' + this.config.element_id + '_output').text(data['ascii']);
    }

    configure_widget(selector, context, callback) {

//        var html = "<div class='swg_widget' style='position: relative;left:0px;top:0px;border-radius:8px;width:810px; height:300px;background-color:yellow'></div>";
//        $(selector).append(html).ready(
//            function () {
        new WidgetModule.GeneDistanceWidget(context.config, $(selector), callback);
//            }
//        );
        //$('body').css('background-color','rgb(242,240,230)');
    }

    configure(config:any) {
        var self:StarDistanceMap = this;
        this.config = config;
        var context = config;
        if(!context.config)
        {
            context.config = demo_config;
        }
        config.widget_id = config.element_id + '_widget';
        var display_map = '';
        if( context.config['display_map'] )
        {
            config.output_id = config.element_id + '_output';
            display_map = 'Your map:<span style="height: 1.5em" id="' + context.output_id + '"></span>';
        }
        $('#' + config.element_id).html('<div>'+display_map+'<span id="' + context.widget_id + '"></span></div>');
        var saved = this.get_input();
        if (saved && context.config ) {
            context.config.saved = saved;
        }
        this.configure_widget($('#' + context.widget_id), context, function (data) {
            self.callback(data);
        });

        tmi.event('StarX_DistanceMatrix',context['group'] ? context['group'] : "NoGroup", "Start");

    }
}

console.info( "HERE");
if (false) {
    var x = new StarDistanceMap();
}
