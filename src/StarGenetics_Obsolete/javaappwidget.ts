/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="state.ts" />
/// <reference path="config.d.ts" />
/// <amd-dependency path="StarGenetics/state" />
/// <amd-dependency path="StarGenetics/stargeneticsws.soy" />

import SGUI = require("StarGenetics/stargeneticsws.soy");
import GlobalState = require("StarGenetics/state");
var StarGeneticsGlobalState = new GlobalState.StarGeneticsGlobalState();



export class StarGeneticsJavaAppWidget {
    state:any;
    widget_state:any;
    config:any;
    element() {
        return $('#' + this.state.StarGeneticsAppWidgetState.uid);
    }

    set_message(message) {
        $('#' + this.state.StarGeneticsAppWidgetState.uid).html(message);
    }

    set_state(data:string) {
        this.state.StarGeneticsAppWidgetState.input_element.attr('value', data);
    }

    get_state():string {
        return this.state.StarGeneticsAppWidgetState.input_element.attr('value');
    }

    constructor(state:any, config:StarGeneticsConfig) {
        this.state = state;
        state.StarGeneticsAppWidgetState = new GlobalState.StarGeneticsAppWidgetState(config);
        this.config = config;
        this.widget_state = state.StarGeneticsAppWidgetState;
//        this.$element = $('#' + this.state.StarGeneticsAppWidgetState.uid);
        this.set_message(SGUI.before_open());
        this.init();
    }

    init() {
        var self = this;
        this.establish_connection();
    }

    ping(socket) {
        var self = this;
        if (socket.readyState == WebSocket.OPEN) {
            console.info("ping");
            socket.send('{"command":"ping"}');
            setTimeout(function () {
                self.ping(socket);
            }, 30000);
        }
    }

    onopen(socket, event) {
        this.set_message("Connection established!");
        var data = this.get_state();
        var context = {
            open: ('' + data).length > 16,
            new: true,
            save: false,
            socket: socket
        }
        this.update_ui(context);

    }

    onmessage(socket, messageevent) {
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
            }
            this.update_ui(context);
        }
    }

    onclose(socket, event) {
        var self = this;
        this.set_message(
            "<b>StarGenetics not connected!</b><br>" + new Date());
        setTimeout(function () {
            self.establish_connection();
        }, 500);
    }

    onerror(socket, event) {

    }

    update_ui(context) {
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
    }

    new_ps(socket) {
        socket.send(JSON.stringify(this.widget_state.new));
    }

    save_ps(socket) {
        socket.send(JSON.stringify(this.widget_state.save));
    }

    open_ps(socket) {
        var open = this.widget_state.open;
        open.stream = this.get_state();
        $.ajax({
            url: 'http://localhost:25261/',
            type: 'post',
            data: {data:JSON.stringify(open)}
        });
        //socket.send(JSON.stringify(open));
    }

    establish_connection() {
        var port = 25261;
        var socket = new WebSocket("ws://localhost:" + port + "/", "stargenetics");
        var self = this;

        console.info("establish_connection");

        socket.onopen = function (a) {
            self.onopen(socket, a);
            self.ping(socket);
            self.state.onopen(socket,a);

        }
        socket.onclose = function (closeevent) {
            self.onclose(socket, closeevent);
        }
        socket.onerror = function (a) {
            self.onerror(socket, a);
        }
        socket.onmessage = function (messageevent) {
            self.onmessage(socket, messageevent);
            self.state.onmessage(messageevent);
        }

    }

    run()
    {

    }
}