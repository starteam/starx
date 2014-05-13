define(["require", "exports"], function(require, exports) {
    var Remapper = (function () {
        function Remapper() {
        }
        Remapper.capitalize = function (str) {
            return str[0].toUpperCase() + str.substr(1);
        };

        Remapper.transform = function (input) {
            if (input == 'bodycolor') {
                return 'Body color';
            }
            if (input == 'Bodycolor') {
                return 'Body color';
            }
            return Remapper.capitalize(input);
        };
        return Remapper;
    })();
    exports.Remapper = Remapper;
});
//# sourceMappingURL=property_name_remap.js.map
