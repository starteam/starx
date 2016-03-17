/// <reference path="../../StarX/lib/jquery.d.ts" />
/// <reference path="../../StarX/lib/jquery.svg.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-svg" />
/// <amd-dependency path="jquery-svgdom" />
define(["require", "exports", "jquery", "jquery-svg", "jquery-svgdom"], function (require, exports) {
    "use strict";
    var FlySVG = (function () {
        function FlySVG() {
            this.width = 50;
            this.height = 50;
            this.strokeWidth = 0.25; // Default
            this.legColor = 'black';
            this.aristaeColor = 'black';
            this.headColor = 'black';
            this.eyeColor = 'red';
            this.bodyColor = 'rgb(152, 118, 84)';
            this.wingColor = 'rgba(64, 64, 64, 0.2)';
            this.sexCombColor = 'black';
            this.aristae = 1;
            this.wingSize = 1;
            this.isMale = true;
        }
        FlySVG.prototype._get = function (properties, key, defaultValue) {
            if (properties && properties.hasOwnProperty(key)) {
                var c = properties[key];
                if (c.hasOwnProperty('value')) {
                    return c['value'];
                }
            }
            return defaultValue;
        };
        FlySVG.prototype.render = function (container, organism) {
            var $container = $(container), svg, g;
            // Create SVG node
            $container.svg();
            // Get SVG wrapper
            svg = $container.svg('get');
            g = this.getGroup(svg);
            this.eyeColor = this.getEyeColor(organism.properties);
            this.bodyColor = this.getBodyColor(organism.properties);
            this.aristae = this.getAristae(organism.properties);
            this.wingSize = this.getWingSize(organism.properties);
            this.isMale = this.getIsMale(organism);
            this.drawLegs(g, svg);
            this.drawAristae(g, svg);
            this.drawHead(g, svg);
            this.drawEyes(g, svg);
            this.drawBody(g, svg);
            this.drawWings(g, svg);
            if (this.isMale) {
                this.drawSexCombs(g, svg);
                this.drawMaleSexMarker(g, svg);
            }
            else {
                this.drawFemaleSexMarker(g, svg);
            }
            this.size($container, svg);
            console.log('JM LOOK HERE: ', this.isMale);
        };
        FlySVG.prototype.size = function ($container, svg) {
            var $svg = $(svg.root());
            $container.width(this.width);
            $container.height(this.height);
            $svg.attr('width', this.width);
            $svg.attr('height', this.height);
            $svg.attr('viewBox', '0 0 ' + this.width + ' ' + this.height);
        };
        // Applies default drawing params, scaling and translation transforms
        FlySVG.prototype.getGroup = function (svg) {
            var g = svg.group({
                strokeWidth: this.strokeWidth,
                transform: 'scale(1.5, 1.5)'
            });
            return svg.group(g, { transform: 'translate(16.5, 12)' });
        };
        FlySVG.prototype.getEyeColor = function (properties) {
            return this._get(properties, 'eyecolor', this.eyeColor);
        };
        FlySVG.prototype.getBodyColor = function (properties) {
            return this._get(properties, 'bodycolor', this.bodyColor);
        };
        FlySVG.prototype.getAristae = function (properties) {
            return parseFloat(this._get(properties, 'aristae', '' + this.aristae));
        };
        FlySVG.prototype.getWingSize = function (properties) {
            return parseFloat(this._get(properties, 'wingsize', '' + this.wingSize));
        };
        FlySVG.prototype.getIsMale = function (organism) {
            return organism.sex == 'MALE';
        };
        FlySVG.prototype.drawLegs = function (g, svg) {
            var dx = 3.75, dy = -1;
            svg.line(g, dx, dy, dx * 2, -5, { stroke: this.legColor });
            svg.line(g, dx, dy, dx * 2, 1, { stroke: this.legColor });
            svg.line(g, dx, dy, dx * 2, 8, { stroke: this.legColor });
            svg.line(g, -dx, dy, -dx * 2, -5, { stroke: this.legColor });
            svg.line(g, -dx, dy, -dx * 2, 1, { stroke: this.legColor });
            svg.line(g, -dx, dy, -dx * 2, 8, { stroke: this.legColor });
        };
        FlySVG.prototype.drawAristae = function (g, svg) {
            var length = 2.5;
            svg.line(g, -1, -9.5, -1 - length, -9.5 - length, { stroke: this.aristaeColor });
            svg.line(g, 1, -9.5, 1 + length, -9.5 - length, { stroke: this.aristaeColor });
        };
        FlySVG.prototype.drawHead = function (g, svg) {
            svg.ellipse(g, 0, -7.75, 4, 2, { stroke: this.headColor, fill: this.headColor });
        };
        FlySVG.prototype.drawEyes = function (g, svg) {
            var ang = 40 / 180 * Math.PI;
            svg.circle(g, -2.0, -7.75, 2.0, { stroke: this.headColor, fill: this.headColor });
            svg.circle(g, 2.0, -7.75, 2.0, { stroke: this.headColor, fill: this.headColor });
            svg.path(g, this.arc(svg, -1.9, -7.75, 1.5, ang, ang + Math.PI), { stroke: this.eyeColor, fill: this.eyeColor });
            svg.path(g, this.arc(svg, 1.9, -7.75, 1.5, -ang, -ang + Math.PI), { stroke: this.eyeColor, fill: this.eyeColor });
        };
        FlySVG.prototype.drawBody = function (g, svg) {
            if (this.isMale) {
                // Short, narrow body
                svg.ellipse(g, 0, 2, 4, 10, { stroke: this.bodyColor, fill: this.bodyColor });
            }
            else {
                // Long, wide body
                svg.ellipse(g, 0, 5, 5.5, 12.5, { stroke: this.bodyColor, fill: this.bodyColor }); // Female long
            }
        };
        FlySVG.prototype.drawWings = function (g, svg) {
            // TODO: implement wing sizing
            if (this.wingSize < 0.1) {
                return;
            }
            svg.ellipse(g, -2.5, 7, 3, 14, { stroke: this.wingColor, fill: this.wingColor });
            svg.ellipse(g, 2.5, 7, 3, 14, { stroke: this.wingColor, fill: this.wingColor });
        };
        FlySVG.prototype.drawSexCombs = function (g, svg) {
            var dx = 3.75, dy = -1;
            svg.circle(g, -dx * 1.65, dy - 2.5, 0.75, { stroke: this.sexCombColor, fill: this.sexCombColor });
            svg.circle(g, dx * 1.65, dy - 2.5, 0.75, { stroke: this.sexCombColor, fill: this.sexCombColor });
        };
        FlySVG.prototype.drawMaleSexMarker = function (g, svg) {
            svg.circle(g, 10, 14.5, 4, { strokeWidth: 0.75, stroke: 'black', fill: 'none' });
            svg.line(g, 13, 11.5, 16, 8.5, { strokeWidth: 0.75, stroke: 'black' });
            // Arrow tip
            svg.line(g, 16, 8.5, 13, 8.5, { strokeWidth: 0.75, stroke: 'black' });
            svg.line(g, 16, 8.1, 16, 11.9, { strokeWidth: 0.75, stroke: 'black' });
        };
        FlySVG.prototype.drawFemaleSexMarker = function (g, svg) {
            svg.circle(g, 11, 12.5, 4, { strokeWidth: 0.75, stroke: 'black', fill: 'none' });
            // Cross
            svg.line(g, 11, 16.5, 11, 21.5, { strokeWidth: 0.75, stroke: 'black' });
            svg.line(g, 9, 19.5, 13, 19.5, { strokeWidth: 0.75, stroke: 'black' });
        };
        // Axes & origin for visual building
        FlySVG.prototype.drawAxes = function (svg) {
            svg.line(25, 25, 25, 50, { stroke: 'black' });
            svg.line(25, 25, 50, 25, { stroke: 'black' });
            svg.circle(25, 25, 2, { fill: 'black', stroke: 'black' });
        };
        // Draw an arc, HTML canvas style
        FlySVG.prototype.arc = function (svg, xc, yc, radius, startAngle, endAngle, isClockwise) {
            var path, xs, ys, xe, ye, dAngle, largeArc, largeAngle, clockwise, TWO_PI = 2 * Math.PI;
            // Coerce our angles to the [0, 2pi] range
            startAngle = startAngle > TWO_PI ? startAngle % TWO_PI : startAngle;
            endAngle = endAngle > TWO_PI ? endAngle % TWO_PI : endAngle;
            startAngle = startAngle < 0 ? startAngle + TWO_PI : startAngle;
            endAngle = endAngle < 0 ? endAngle + TWO_PI : endAngle;
            // Get start point
            xs = xc + radius * Math.cos(startAngle);
            ys = yc - radius * Math.sin(startAngle);
            // Get end point
            xe = xc + radius * Math.cos(endAngle);
            ye = yc - radius * Math.sin(endAngle);
            largeAngle = Math.abs(endAngle - startAngle) > Math.PI;
            clockwise = typeof isClockwise === 'undefined' ? 0 : isClockwise;
            if (endAngle > startAngle) {
                largeArc = clockwise ? (!largeAngle) : largeAngle;
            }
            else {
                largeArc = clockwise ? largeAngle : (!largeAngle);
            }
            path = svg.createPath();
            path.move(xs, ys);
            path.arc(radius, radius, 0, largeArc, clockwise, xe, ye);
            path.line(xc, yc);
            path.close();
            return path;
        };
        ;
        return FlySVG;
    }());
    exports.FlySVG = FlySVG;
});
//# sourceMappingURL=fly_svg.js.map