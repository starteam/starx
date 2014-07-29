/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarPedigree/widget_template.soy.d.ts" />
/// <reference path="../StarPedigree/widget_template.css.soy.d.ts" />
/// <reference path="../StarX/lib/underscore.d.ts" />


import $ = require('jquery');
import m = require("StarPedigree/Assignment");
import ui = require("StarPedigree/widget_template.soy");
import css = require("StarPedigree/widget_template.css.soy");
import underscore = require('../StarX/lib/underscore');
var _ = underscore._;

export class Widget {
    config:any;
    model:m.Assignment;
    workspace:JQuery;

    constructor(config:any, model:m.Assignment) {
        this.config = config;
        this.model = model;
        var main_element = $('#' + this.config.element_id);
        var html = ui.wrapper({config: this.config}) + css.css_html({});
        console.info(html);
        main_element.html(html);
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
        html += ui.render_generations({options: options});
        html += ui.render_individuals({individuals: individuals, options: options});
        html += ui.render_relationships({relationships: relationships, options: options});
        $(w).html(html);
        this.add_interactions(w);
    }

    add_interactions(w:JQuery) {
        var self = this;
        $('.starpedigree_individual', w).off('click').on('click', function (e) {
            console.info($(this).data('id'));
            var html = '';
            var individual_id = $(this).data('id');
            var individual = _.find(self.model.ui.individuals, function (e) {
                return e.id == individual_id;
            });
            var options:any = self.model.ui.options;
            $('.starpedigree_genotype_dialog', w).remove();
            html += ui.genotype_dialog({individual: individual, options: options});
            window.individual = individual;
            $(w).append(html);
        });
    }

}