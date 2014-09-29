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

    hide_genotype_dialog(w:JQuery) {
        $('.starpedigree_genotype_dialog', w).remove();
        $('.starpedigree_individual_border',w).css({'display':'none'});
    }

    show_genotype_dialog(w:JQuery, individual_id:number) {
        var self = this;
        var individual:m.Individual = _.find(self.model.ui.individuals, function (e) {
            return e.id == individual_id;
        });
        var options:any = self.model.ui.options;
        self.hide_genotype_dialog(w);
        var html = '';
        var individuals = _.sortBy(self.model.ui.individuals,function(q){return q.id;});
        html += ui.genotype_dialog({individual: individual, options: options, individuals:individuals });
        $(w).append(html);
        $('.starpedigree_individual_border[data-id='+individual_id+']',w).css({'display':'block'});
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
        $('.starpedigree_genotype_dialog_close',w).off('click').on('click', function () {
            self.hide_genotype_dialog(w);
        });
        $('.starpedigree_genotype_dialog_close_x',w).off('click').on('click', function () {
            self.hide_genotype_dialog(w);
        });
        $('.genotype_dialog_select_individual',w).off('change').on('change', function() {
            console.info("genotype_dialog_select_individual", $(this).val());
            self.show_genotype_dialog(w,$(this).val());
        });
        $('.starpedigree_genotype_prev',w).off('click').on('click', function() {
            var this_index = _.indexOf( individuals, individual);
            this_index--;
            if( this_index < 0 )
            {
                this_index = 0;
            }
            self.show_genotype_dialog(w,individuals[this_index].id);
        });
        $('.starpedigree_genotype_next',w).off('click').on('click', function() {
            var this_index = _.indexOf( individuals, individual);
            this_index++;
            if( this_index >= individuals.length )
            {
                this_index = individuals.length - 1 ;
            }
            self.show_genotype_dialog(w,individuals[this_index].id);
        });
    }

    add_interactions(w:JQuery) {
        var self = this;
        $('.starpedigree_individual', w).off('click').on('click', function (e) {
            console.info("add_interactions",$(this).data('id'));
            var individual_id = $(this).data('id');
            self.show_genotype_dialog(w, individual_id);
        });
    }

}