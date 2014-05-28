/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarPedigree/widget_template.soy.d.ts" />
/// <reference path="../StarPedigree/widget_template.css.soy.d.ts" />


import $ = require('jquery');
import m = require("StarPedigree/Assignment");
import ui = require("StarPedigree/widget_template.soy");
import css = require("StarPedigree/widget_template.css.soy");

export class Widget {
    config:any;
    model:m.Assignment;
    workspace:JQuery;

    constructor(config:any,model:m.Assignment)
    {
        this.config = config;
        this.model = model;
        var main_element = $('#'+this.config.element_id);
        var html =ui.wrapper({config:this.config}) + css.css_html({});
        console.info( html ) ;
        main_element.html(html );
        this.workspace = $('.starpedigree_workspace', main_element);
    }

    run():void {
        this.show();
    }

    show():void {
        var w = this.workspace;
        var html = '';
        var individuals:m.Individual[] = this.model.ui.individuals;
        var relationships:m.Relationship[] = this.model.ui.relationships;
        var options:any = this.model.ui.options;
        html += ui.render_generations({options:options});
        html += ui.render_individuals({individuals:individuals,options:options});
        html += ui.render_relationships({relationships:relationships,options:options});
        $(w).html(html);
    }

}