/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarPedigree/widget_template.soy.d.ts" />
/// <reference path="../StarPedigree/widget_template.css.soy.d.ts" />
/// <reference path="../StarX/lib/underscore.d.ts" />
define(["require", "exports", 'jquery', "StarPedigree/widget_template.soy", "StarPedigree/widget_template.css.soy", '../StarX/lib/underscore'], function(require, exports, $, ui, css, underscore) {
    var _ = underscore._;

    var Widget = (function () {
        function Widget(config, model) {
            this.config = config;
            this.model = model;
            var main_element = $('#' + this.config.element_id);
            var html = ui.wrapper({ config: this.config }) + css.css_html({});
            console.info(html);
            main_element.html(html);
            this.workspace = $('.starpedigree_workspace', main_element);
        }
        Widget.prototype.run = function () {
            this.show();
        };

        Widget.prototype.show = function () {
            var w = this.workspace;
            var html = '';
            var individuals = this.model.ui.individuals;
            var relationships = this.model.ui.relationships;
            var options = this.model.ui.options;
            html += ui.render_generations({ options: options });
            html += ui.render_individuals({ individuals: individuals, options: options });
            html += ui.render_relationships({ relationships: relationships, options: options });
            $(w).html(html);
            this.add_interactions(w);
        };

        Widget.prototype.save_genotype = function (id, individual, $button) {
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
            if (is_genotype) {
                $button.text($button.data('text') + "- OK");
            } else {
                $button.text($button.data('text') + "- NOT OK!");
            }
            individual.ui_metadata['genotype'] = dipAlleles;
            return is_genotype;
        };

        Widget.prototype.check_phase = function (id, individual, $button) {
            var value = null;
            $('input[kind-id="' + id + '"]').each(function () {
                if ($(this).prop('checked')) {
                    value = $(this).val();
                }
            });
        };

        Widget.prototype.show_genotype_dialog = function (w, individual_id) {
            var self = this;
            var individual = _.find(self.model.ui.individuals, function (e) {
                return e.id == individual_id;
            });
            var options = self.model.ui.options;
            $('.starpedigree_genotype_dialog', w).remove();
            var html = '';
            html += ui.genotype_dialog({ individual: individual, options: options });
            $(w).append(html);
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
            $('.starpedigree_genotype_dialog_close').off('click').on('click', function () {
                $('.starpedigree_genotype_dialog', w).remove();
            });
        };

        Widget.prototype.add_interactions = function (w) {
            var self = this;
            $('.starpedigree_individual', w).off('click').on('click', function (e) {
                console.info($(this).data('id'));
                var individual_id = $(this).data('id');
                self.show_genotype_dialog(w, individual_id);
            });
        };
        return Widget;
    })();
    exports.Widget = Widget;
});
//# sourceMappingURL=Widget.js.map
