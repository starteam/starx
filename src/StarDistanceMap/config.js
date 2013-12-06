/// <reference path="config.d.ts" />
define(["require", "exports"], function(require, exports) {
    var ConfigElement = (function () {
        function ConfigElement(name) {
            this.name = name;
        }
        return ConfigElement;
    })();
    exports.ConfigElement = ConfigElement;

    exports.config = [
        new ConfigElement('show'),
        new ConfigElement('hide')
    ];
});
//# sourceMappingURL=config.js.map
