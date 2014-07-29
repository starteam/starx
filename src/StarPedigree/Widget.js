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

        Widget.prototype.add_interactions = function (w) {
            var self = this;
            $('.starpedigree_individual', w).off('click').on('click', function (e) {
                console.info($(this).data('id'));
                var html = '';
                var individual_id = $(this).data('id');
                var individual = _.find(self.model.ui.individuals, function (e) {
                    return e.id == individual_id;
                });
                var options = self.model.ui.options;
                $('.starpedigree_genotype_dialog', w).remove();
                html += ui.genotype_dialog({ individual: individual, options: options });
                window.individual = individual;
                $(w).append(html);
            });
        };
        return Widget;
    })();
    exports.Widget = Widget;
});
//# sourceMappingURL=Widget.js.map
