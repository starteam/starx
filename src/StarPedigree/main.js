/// <reference path="../StarX/lib/require.d.ts" />
/// <reference path="../StarX/lib/jquery.d.ts" />
define(["require", "exports", 'jquery', 'StarTMI/tmi', "StarX/edXintegration", "StarPedigree/Assignment", "StarPedigree/Model"], function(require, exports, $, StarTMI, integration, Assignment, Model) {
    

    var tmi = new StarTMI.TMI();

    var StarPedigree = (function () {
        function StarPedigree() {
        }
        StarPedigree.prototype.configure = function (config) {
            tmi.event('StarPedigree', 'Start');
            var edX = new integration.Integration(config);
            edX.configRaven();
            this.config = config;
            var self = this;
            var top = $('#' + config.element_id);
            var text = '';
            top.html("Welcome to " + this.config.StarX);
            var assignment = new Assignment.Assignment(Model.model1);
            console.info(assignment.ui);
            top.html("Welcome to " + this.config.StarX + "!");
            window['__StarX'] = assignment;
        };
        return StarPedigree;
    })();
    exports.StarPedigree = StarPedigree;
});
//# sourceMappingURL=main.js.map
