/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarPedigree/widget_template.soy.d.ts" />
/// <reference path="../StarPedigree/widget_template.css.soy.d.ts" />
define(["require", "exports", 'jquery', "StarPedigree/widget_template.soy", "StarPedigree/widget_template.css.soy"], function(require, exports, $, ui, css) {
    var Widget = (function () {
        function Widget(config, data) {
            this.config = config;
            this.data = data;
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
        };
        return Widget;
    })();
    exports.Widget = Widget;
});
//# sourceMappingURL=Widget.js.map
