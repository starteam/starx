/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <amd-dependency path="StarGenetics/selectexperiment.soy" />
define(["require", "exports", "StarGenetics/selectexperiment.soy"], function(require, exports) {
    var SGUI = require("StarGenetics/selectexperiment.soy");

    var StarGeneticsSelectExperimentWidget = (function () {
        function StarGeneticsSelectExperimentWidget(state, config) {
            this.state = state;
            this.config = config;
            console.info("StarGeneticsSelectExperimentWidget");
            console.info(config);
            this.set_message("Welcome!");
            $('button', '#' + this.config['element_id']).click();
            window.select_experiment = this;
            state.listen_websocket(config, this);
            var parent = $('#' + this.config['element_id']);
            var self = this;
            var selector = '.sg_1_select_experiment';
            $(parent).off('change', selector).on('change', selector, function (e) {
                self.onchange(e, this);
            });
        }
        StarGeneticsSelectExperimentWidget.prototype.input_element = function () {
            console.info("input element");
            var ret;
            var jq = $('[name=' + this.config.State + ']');
            console.info(jq);
            var ret = $('#' + jq.attr('inputid'));
            console.info(ret);
            console.info(ret.attr('value'));
            return ret;
        };

        StarGeneticsSelectExperimentWidget.prototype.set_state = function (data) {
            console.info("Set STATE" + data);
            $(this.input_element()).attr('value', data);
        };

        StarGeneticsSelectExperimentWidget.prototype.get_state = function () {
            return $(this.input_element()).attr('value');
        };

        StarGeneticsSelectExperimentWidget.prototype.set_message = function (message) {
            $('#' + this.config['element_id']).html(message);
        };

        StarGeneticsSelectExperimentWidget.prototype.onmessage = function (message) {
            var data = JSON.parse(message.data);
            if (data.command == 'list_experiment_response') {
                console.info("Experiment list");
                console.info(data.experiments);
                this.experiments = data.experiments;
                this.update_ui();
            }
        };

        StarGeneticsSelectExperimentWidget.prototype.update_ui = function () {
            var state = this.get_state();
            console.info(state);
            this.set_message(SGUI.select_experiments({ experiments: this.experiments, selected: this.get_state() }));
        };

        StarGeneticsSelectExperimentWidget.prototype.onchange = function (e, ui) {
            this.set_state($(ui).val());
        };

        StarGeneticsSelectExperimentWidget.prototype.onopen = function (socket, event) {
            this.socket = socket;
            socket.send(JSON.stringify({ 'command': 'list_experiments' }));
        };
        return StarGeneticsSelectExperimentWidget;
    })();
    exports.StarGeneticsSelectExperimentWidget = StarGeneticsSelectExperimentWidget;
});
//# sourceMappingURL=selectexperiment.js.map
