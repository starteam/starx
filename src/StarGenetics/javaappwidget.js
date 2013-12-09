/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <amd-dependency path="StarGenetics/state" />
/// <amd-dependency path="StarGenetics/stargeneticsws.soy" />
define(["require", "exports", "StarGenetics/stargeneticsws.soy", "StarGenetics/state", "StarGenetics/state", "StarGenetics/stargeneticsws.soy"], function(require, exports, SGUI, GlobalState) {
    var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();

    var StarGeneticsJavaAppWidget = (function () {
        function StarGeneticsJavaAppWidget(state, config) {
            this.state = state;
            state.StarGeneticsAppWidgetState = new GlobalState.StarGeneticsAppWidgetState(config);
            this.config = config;
            this.widget_state = state.StarGeneticsAppWidgetState;

            //        this.$element = $('#' + this.state.StarGeneticsAppWidgetState.uid);
            this.set_message(SGUI.before_open());
            this.init();
        }
        StarGeneticsJavaAppWidget.prototype.element = function () {
            return $('#' + this.state.StarGeneticsAppWidgetState.uid);
        };

        StarGeneticsJavaAppWidget.prototype.set_message = function (message) {
            $('#' + this.state.StarGeneticsAppWidgetState.uid).html(message);
        };

        StarGeneticsJavaAppWidget.prototype.set_state = function (data) {
            this.state.StarGeneticsAppWidgetState.input_element.attr('value', data);
        };

        StarGeneticsJavaAppWidget.prototype.get_state = function () {
            return this.state.StarGeneticsAppWidgetState.input_element.attr('value');
        };

        StarGeneticsJavaAppWidget.prototype.init = function () {
            var self = this;
            this.establish_connection();
        };

        StarGeneticsJavaAppWidget.prototype.ping = function (socket) {
            var self = this;
            if (socket.readyState == WebSocket.OPEN) {
                console.info("ping");
                socket.send('{"command":"ping"}');
                setTimeout(function () {
                    self.ping(socket);
                }, 30000);
            }
        };

        StarGeneticsJavaAppWidget.prototype.onopen = function (socket, event) {
            this.set_message("Connection established!");
            var data = this.get_state();
            var context = {
                open: ('' + data).length > 16,
                new: true,
                save: false,
                socket: socket
            };
            this.update_ui(context);
        };

        StarGeneticsJavaAppWidget.prototype.onmessage = function (socket, messageevent) {
            var message = JSON.parse(messageevent.data);
            console.info("onmessage");
            console.info(message);
            if (message['command'] == 'save_response') {
                var data = message['stream'];
                this.set_state(data);
                $('.save_experiment_output').html(data);
                var data = this.get_state();
                var context = {
                    open: ('' + data).length > 16,
                    new: true,
                    save: true,
                    socket: socket
                };
                this.update_ui(context);
            }
        };

        StarGeneticsJavaAppWidget.prototype.onclose = function (socket, event) {
            var self = this;
            this.set_message("<b>StarGenetics not connected!</b><br>" + new Date());
            setTimeout(function () {
                self.establish_connection();
            }, 500);
        };

        StarGeneticsJavaAppWidget.prototype.onerror = function (socket, event) {
        };

        StarGeneticsJavaAppWidget.prototype.update_ui = function (context) {
            var self = this;
            var $element = this.element();
            $element.html(SGUI.onopen(context));

            $('button.sg_new_experiment', $element).click(function () {
                self.new_ps(context.socket);
            });
            $('button.sg_open_experiment', $element).click(function () {
                self.open_ps(context.socket);
            });

            $('button.sg_save_experiment', $element).click(function () {
                self.save_ps(context.socket);
            });
        };

        StarGeneticsJavaAppWidget.prototype.new_ps = function (socket) {
            socket.send(JSON.stringify(this.widget_state.new));
        };

        StarGeneticsJavaAppWidget.prototype.save_ps = function (socket) {
            socket.send(JSON.stringify(this.widget_state.save));
        };

        StarGeneticsJavaAppWidget.prototype.open_ps = function (socket) {
            var open = this.widget_state.open;
            open.stream = this.get_state();
            $.ajax({
                url: 'http://localhost:25261/',
                type: 'post',
                data: { data: JSON.stringify(open) }
            });
            //socket.send(JSON.stringify(open));
        };

        StarGeneticsJavaAppWidget.prototype.establish_connection = function () {
            var port = 25261;
            var socket = new WebSocket("ws://localhost:" + port + "/", "stargenetics");
            var self = this;

            console.info("establish_connection");

            socket.onopen = function (a) {
                self.onopen(socket, a);
                self.ping(socket);
                self.state.onopen(socket, a);
            };
            socket.onclose = function (closeevent) {
                self.onclose(socket, closeevent);
            };
            socket.onerror = function (a) {
                self.onerror(socket, a);
            };
            socket.onmessage = function (messageevent) {
                self.onmessage(socket, messageevent);
                self.state.onmessage(messageevent);
            };
        };

        StarGeneticsJavaAppWidget.prototype.run = function () {
        };
        return StarGeneticsJavaAppWidget;
    })();
    exports.StarGeneticsJavaAppWidget = StarGeneticsJavaAppWidget;
});
//# sourceMappingURL=javaappwidget.js.map
