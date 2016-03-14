/// <reference path="../StarX/lib/jquery.d.ts" />
/// <reference path="../StarGenetics/config.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    var StudentIDWidgetState = (function () {
        function StudentIDWidgetState(config) {
            this.element_id = config.element_id;
            this.student_id = config.StudentID;
        }
        Object.defineProperty(StudentIDWidgetState.prototype, "id", {
            get: function () {
                return this.student_id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StudentIDWidgetState.prototype, "uid", {
            get: function () {
                return this.element_id;
            },
            enumerable: true,
            configurable: true
        });
        return StudentIDWidgetState;
    }());
    exports.StudentIDWidgetState = StudentIDWidgetState;
    var StarGeneticsSelectExperimentWidgetState = (function () {
        function StarGeneticsSelectExperimentWidgetState(config) {
            this.config = config;
        }
        Object.defineProperty(StarGeneticsSelectExperimentWidgetState.prototype, "input_element", {
            get: function () {
                var ret;
                var jq = $('[name=' + this.config.State + ']');
                ret = $('#' + jq.attr('inputid'));
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarGeneticsSelectExperimentWidgetState.prototype, "uid", {
            get: function () {
                return this.config.element_id;
            },
            enumerable: true,
            configurable: true
        });
        return StarGeneticsSelectExperimentWidgetState;
    }());
    exports.StarGeneticsSelectExperimentWidgetState = StarGeneticsSelectExperimentWidgetState;
    var StarGeneticsAppWidgetState = (function () {
        function StarGeneticsAppWidgetState(config) {
            this.config = config;
        }
        Object.defineProperty(StarGeneticsAppWidgetState.prototype, "input_element", {
            get: function () {
                var ret;
                var jq = $('[name=' + this.config.State + ']');
                ret = $('#' + jq.attr('inputid'));
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarGeneticsAppWidgetState.prototype, "uid", {
            get: function () {
                return this.config['element_id'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarGeneticsAppWidgetState.prototype, "open", {
            get: function () {
                return this.config['open'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarGeneticsAppWidgetState.prototype, "new", {
            get: function () {
                return this.config['new'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarGeneticsAppWidgetState.prototype, "save", {
            get: function () {
                return this.config['save'];
            },
            enumerable: true,
            configurable: true
        });
        return StarGeneticsAppWidgetState;
    }());
    exports.StarGeneticsAppWidgetState = StarGeneticsAppWidgetState;
    var StarGeneticsState = (function () {
        function StarGeneticsState() {
            this.onmessages = {};
        }
        StarGeneticsState.prototype.setStudentID = function (config) {
            this.StudentIDWidgetState = new StudentIDWidgetState(config);
            return this.StudentIDWidgetState;
        };
        StarGeneticsState.prototype.setApp = function (config) {
            this.StarGeneticsAppWidgetState = new StarGeneticsAppWidgetState(config);
            return this.StarGeneticsAppWidgetState;
        };
        Object.defineProperty(StarGeneticsState.prototype, "student_id", {
            get: function () {
                var sid = this.StudentIDWidgetState;
                return sid ? sid.id : "__NOT_SET__";
            },
            enumerable: true,
            configurable: true
        });
        StarGeneticsState.prototype.onmessage = function (message) {
            var map = this.onmessages;
            for (var k in map) {
                var v = map[k];
                v.onmessage(message);
            }
        };
        StarGeneticsState.prototype.onopen = function (socket, event) {
            var map = this.onmessages;
            for (var k in map) {
                var v = map[k];
                v.onopen(socket, event);
            }
        };
        StarGeneticsState.prototype.listen_websocket = function (config, listener) {
            this.onmessages[config.element_id] = listener;
        };
        return StarGeneticsState;
    }());
    exports.StarGeneticsState = StarGeneticsState;
    var StarGeneticsGlobalState = (function () {
        function StarGeneticsGlobalState() {
            this.state = {};
        }
        StarGeneticsGlobalState.prototype.get_state = function (config) {
            var Group = config['Group'] || 'default';
            if (!this.state[Group]) {
                this.state[Group] = new StarGeneticsState();
            }
            var my_state = this.state[Group];
            return my_state;
        };
        return StarGeneticsGlobalState;
    }());
    exports.StarGeneticsGlobalState = StarGeneticsGlobalState;
});
//# sourceMappingURL=state.js.map