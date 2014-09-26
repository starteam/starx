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

    save_genotype(id:string, individual, $button?:JQuery):boolean {
        var map = {};
        $('.starpedigree_genotype_dialog_select[data-id="' + id + '"]').each(function () {
            var $select = $(this);
            var val = $select.val();
            var index = $select.data('index');
            map[index] = val;
        });
        var dipAlleles = [
            [map[0], map[2]],
            [map[1], map[3]]
        ];
        var is_genotype = individual.is_genotype(dipAlleles);
        if ($button) {
            if (is_genotype) {
                $button.text($button.data('text') + "- OK");
            }
            else {
                $button.text($button.data('text') + "- NOT OK!");
            }
        }
        individual.ui_metadata['genotype'] = dipAlleles;
        return is_genotype;
    }

    check_phase(id, individual, $button:JQuery) {
        var value = null;
        $('input[kind-id="' + id + '"]').each(function () {
            if ($(this).prop('checked')) {
                value = $(this).val()
            }
        });
        var map = {};
        $('.starpedigree_genotype_dialog_select[data-id="' + id + '"]').each(function () {
            var $select = $(this);
            var val = $select.val();
            var index = $select.data('index');
            map[index] = val;
        });
        var dipAlleles = [
            [map[0], map[2]],
            [map[1], map[3]]
        ];
        var check_phase = individual.is_phase(dipAlleles,value);
        console.info("check_phase", check_phase);
        return check_phase;
    }

    show_genotype_dialog(w:JQuery, individual_id:number) {
        var self = this;
        var individual:Individual = _.find(self.model.ui.individuals, function (e) {
            return e.id == individual_id;
        });
        var options:any = self.model.ui.options;
        $('.starpedigree_genotype_dialog', w).remove();
        var html = '';
        html += ui.genotype_dialog({individual: individual, options: options});
        $(w).append(html);
        $('.starpedigree_genotype_dialog', w).css({top:(individual.location.top+self.model.ui.options['cell_height'])+"px"});

        $('.starpedigree_genotype_dialog_check_genotype').off('click').on('click', function () {
            var $button = $(this);
            var id = $button.data('id');
            self.save_genotype(id, individual, $button);
        });
        $('.starpedigree_genotype_dialog_check_phase').off('click').on('click', function () {
            var $button = $(this);
            var id = $button.data('id');
            var is_genotype = self.save_genotype(id, individual, $('.starpedigree_genotype_dialog_check_genotype[data-id="' + id + '"'));
            self.check_phase(id, individual, $button);
        });
        $('.starpedigree_genotype_dialog_check_genotype_and_phase').off('click').on('click', function () {
            var $button = $(this);
            var id = $button.data('id');
            var is_genotype = self.save_genotype(id, individual, $('.starpedigree_genotype_dialog_check_genotype[data-id="' + id + '"'));
            var is_correct = is_genotype && self.check_phase(id, individual, $button);
            console.info("Check", is_correct);
        });
        $('.starpedigree_genotype_dialog_close').off('click').on('click', function () {
            $('.starpedigree_genotype_dialog', w).remove();
        });
    }

    add_interactions(w:JQuery) {
        var self = this;
        $('.starpedigree_individual', w).off('click').on('click', function (e) {
            console.info($(this).data('id'));
            var individual_id = $(this).data('id');
            self.show_genotype_dialog(w, individual_id);
        });
    }

}