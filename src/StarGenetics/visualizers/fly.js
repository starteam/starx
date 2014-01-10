var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "StarGenetics/visualizers/base"], function(require, exports, base) {
    var Fly = (function (_super) {
        __extends(Fly, _super);
        function Fly() {
            _super.call(this);
            this.bodyRadius = .8;
            this.legsColor = 'black';
            this.bodyColor = 'rgb(152,118,84)';
            this.headColor = 'black';
            this.eyeColor = 'red';
            this.wingColor = 'rgba(200,200,200,.8)';
            this.aristaeLength = 1;
        }
        Fly.prototype._get = function (properties, key, default_value) {
            if (properties) {
                var c = properties[key];
                if (c && c['value']) {
                    return c['value'];
                }
            }
            return default_value;
        };

        Fly.prototype.eyecolor = function (properties) {
            return this._get(properties, 'eyecolor', this.eyeColor);
        };

        Fly.prototype.bodycolor = function (properties) {
            return this._get(properties, 'bodycolor', this.bodyColor);
        };

        Fly.prototype.aristae = function (properties) {
            return parseFloat(this._get(properties, 'aristae', '' + this.aristaeLength));
        };

        Fly.prototype.render = function (canvas, properties, organism) {
            console.info("Fly render");
            console.info(properties);
            console.info(organism);
            var context = this.prepare(canvas);
            this.clearImage(context);
            context.translate(0, .2);
            this.drawLegs(context, properties, organism['sex']);
            this.drawAristae(context, properties, organism['sex']);
            this.drawHead(context, properties, organism['sex']);
            this.drawEyes(context, properties, organism['sex']);
            this.drawBody(context, properties, organism['sex']);
            this.drawWings(context, properties, organism['sex']);
            this.commit(context);
        };

        Fly.prototype.isFemale = function (sex) {
            return 'FEMALE'.toLowerCase() == ('' + sex).toLowerCase();
        };

        Fly.prototype.drawBody = function (context, properties, sex) {
            var radius = .4;
            context.translate(0, .2 * radius);
            if (this.isFemale(sex)) {
                this.drawBody_female(context, properties);
            } else {
                this.drawBody_male(context, properties);
            }
            context.translate(0, -.2 * radius);
        };

        Fly.prototype.drawBody_male = function (context, properties) {
            var scaler = 1;
            var radius = .4;

            var bodycolor = this.bodycolor(properties);
            context.save();
            context.beginPath();
            context.translate(0, -radius);
            context.scale(1, 1.1);
            context.arc(0, 0, scaler * radius, 1 * Math.PI, 2 * Math.PI, false);
            context.fillStyle = bodycolor;
            context.fill();
            context.closePath();
            context.restore();

            context.save();
            context.beginPath();
            context.translate(-radius, -radius);
            context.scale(1, 1.1);
            context.rect(0, 0 - .01, radius * 2, radius + 2 * .01);
            context.fillStyle = bodycolor;
            context.fill();
            context.closePath();
            context.restore();
            context.save();

            context.beginPath();
            context.scale(1, 2.27);
            context.arc(0, 0, scaler * radius, 0 * Math.PI, 1 * Math.PI, false);
            context.fillStyle = bodycolor;
            context.fill();
            context.closePath();
            context.restore();
        };

        Fly.prototype.drawBody_female = function (context, properties) {
            var scaler = 1;
            var radius = .4;
            var scale_down = 1.30;
            var bodycolor = this.bodycolor(properties);

            context.save();
            context.beginPath();
            context.translate(0, -radius);
            context.scale(1, 1.1);
            context.arc(0, 0, scaler * radius, 1 * Math.PI, 2 * Math.PI, false);
            context.fillStyle = bodycolor;
            context.fill();
            context.closePath();
            context.restore();

            context.save();
            context.beginPath();
            context.scale(1, 1.1);
            context.moveTo(-radius, -radius - .01);
            context.lineTo(-radius * scale_down, 0.01);
            context.lineTo(radius * scale_down, 0.01);
            context.lineTo(radius, -radius);
            context.lineTo(-radius, -radius - .01);
            context.fillStyle = bodycolor;
            context.fill();
            context.closePath();
            context.restore();
            context.save();

            context.beginPath();
            context.scale(scale_down, 3.5);
            context.arc(0, 0, scaler * radius, 0 * Math.PI, 1.01 * Math.PI, false);
            context.fillStyle = bodycolor;
            context.fill();
            context.closePath();
            context.restore();
        };

        Fly.prototype.drawLegs = function (context, properties, sex) {
            var dx = 0.375;
            var dy = -0.1;
            context.save();
            context.beginPath();
            context.lineWidth = 0.022;
            context.lineCap = "round";
            context.lineJoin = "mitter";
            context.fillStyle = this.legsColor;

            this.drawLine(context, dx, dy, dx * 2, -.5);
            this.drawLine(context, dx, dy, dx * 2, .1);
            this.drawLine(context, dx, dy, dx * 2, .8);

            this.drawLine(context, -dx, dy, -dx * 2, -.5);
            this.drawLine(context, -dx, dy, -dx * 2, .1);
            this.drawLine(context, -dx, dy, -dx * 2, .8);

            context.stroke();
            context.closePath();
            if (!this.isFemale(sex)) {
                context.beginPath();
                context.arc(-dx * 1.7, dy - .25, .07, 0, 2 * Math.PI, false);
                context.fill();
                context.closePath();
                context.beginPath();
                context.arc(dx * 1.7, dy - .25, .07, 0, 2 * Math.PI, false);
                context.fill();
                context.closePath();
            }
            context.restore();
        };

        Fly.prototype.drawLine = function (context, x0, y0, x1, y1) {
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
        };

        Fly.prototype.drawHead = function (context, properties, sex) {
            var radius = .3;
            var scaler = 1;
            context.save();
            context.beginPath();
            context.translate(0, -radius * 2.2);
            context.scale(1.375, 1);
            context.arc(0, 0, scaler * radius, 0 * Math.PI, 2 * Math.PI, false);
            context.fillStyle = this.headColor;
            context.fill();
            context.closePath();
            context.restore();
        };

        Fly.prototype.drawEyes = function (context, properties, sex) {
            context.save();
            context.beginPath();
            context.fillStyle = this.headColor;
            context.arc(-.20, -.775, .20, 0, 2 * Math.PI, true);
            context.arc(.20, -.775, .20, 0, 2 * Math.PI, true);
            context.fill();
            context.closePath();
            context.beginPath();
            context.fillStyle = this.eyecolor(properties);
            var ang = 40. / 180 * Math.PI;
            context.arc(.20 - .01, -.775 + .01, .20 - 0.02, ang, ang + Math.PI, true);
            context.fill();
            context.closePath();
            context.beginPath();
            context.arc(-.20 + .01, -.775 + .01, .20 - .02, -ang, -ang - Math.PI, true);
            context.fill();
            context.closePath();
            context.restore();
        };

        Fly.prototype.drawAristae = function (context, properties, sex) {
            context.save();
            context.lineWidth = 0.022;
            context.lineCap = "round";
            context.lineJoin = "mitter";
            context.fillStyle = this.legsColor;
            var length = this.aristae(properties) * .2;
            this.drawLine(context, -.10, -.95, -.10 - length, -.95 - length);
            this.drawLine(context, +.10, -.95, +.10 + length, -.95 - length);
            context.stroke();
            context.strokeStyle = undefined;
            context.restore();
        };

        Fly.prototype.drawWings = function (context, properties, sex) {
            // need to implement wing sizing
            context.save();
            context.translate(-.22, .58);
            context.scale(.3, 1.3);
            context.beginPath();
            context.fillStyle = this.wingColor;
            context.arc(0, 0, 1, 0 * Math.PI, 1.5 * Math.PI, false);
            context.fill();
            context.closePath();
            context.restore();
            context.save();
            context.translate(+.22, .58);
            context.scale(.3, 1.3);
            context.beginPath();
            context.fillStyle = this.wingColor;
            context.arc(0, 0, 1, 1 * Math.PI, 1.5 * Math.PI, true);
            context.fill();
            context.closePath();
            context.restore();
        };
        return Fly;
    })(base.BaseVisualizer);
    exports.Fly = Fly;
});
//# sourceMappingURL=fly.js.map
