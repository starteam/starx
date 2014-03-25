/// <reference path="base.ts" />
import base = require("StarGenetics/visualizers/base");

export class Fly extends base.BaseVisualizer implements base.Visualizer {

    bodyRadius:number = .8;
    legsColor = 'black';
    bodyColor = 'rgb(152,118,84)';
    headColor = 'black';
    eyeColor = 'red';
    wingColor = 'rgba(64,64,64,.2)';
    aristaeLength = 1;
    wingSize = 1;

    _get(properties:any, key:string, default_value:string):any {
        if (properties) {
            var c = properties[key]
            if (c && c['value']) {
                return c['value'];
            }
        }
        return default_value;
    }

    eyecolor(properties:any) {
        return this._get(properties, 'eyecolor', this.eyeColor);
    }

    bodycolor(properties:any) {
        return this._get(properties, 'bodycolor', this.bodyColor);
    }

    aristae(properties:any) {
        return parseFloat(this._get(properties, 'aristae', '' + this.aristaeLength));
    }

    wingsize(properties:any) {
        return parseFloat(this._get(properties, 'wingsize', '' + this.wingSize))
    }

    constructor() {
        super();
    }

    render(canvas:HTMLCanvasElement, properties:any, organism:any) {
        var context = this.prepare(canvas);
        this.clearImage(context);
        context.translate(.5, .2);
        this.drawLegs(context, properties, organism['sex']);
        this.drawAristae(context, properties, organism['sex']);
        this.drawHead(context, properties, organism['sex']);
        this.drawEyes(context, properties, organism['sex']);
        this.drawBody(context, properties, organism['sex']);
        this.drawWings(context, properties, organism['sex']);
        this.commit(context);
    }

    isFemale(sex:string) {
        return 'FEMALE'.toLowerCase() == ('' + sex).toLowerCase();
    }

    drawBody(context:CanvasRenderingContext2D, properties:any, sex:string) {
        var radius = .4;
        context.translate(0, .2 * radius);
        if (this.isFemale(sex)) {
            this.drawBody_female(context, properties);
        }
        else {
            this.drawBody_male(context, properties);
        }
        context.translate(0, -.2 * radius);
    }

    drawBody_male(context:CanvasRenderingContext2D, properties:any) {
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
        context.rect(0, 0 - .01, radius * 2, radius + 2 * .01)
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
    }

    drawBody_female(context:CanvasRenderingContext2D, properties:any) {
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

    }

    drawLegs(context:CanvasRenderingContext2D, properties:any, sex:string) {
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
    }

    drawLine(context:CanvasRenderingContext2D, x0:number, y0:number, x1:number, y1:number) {
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
    }

    drawHead(context:CanvasRenderingContext2D, properties:any, sex:string) {
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
    }


    drawEyes(context:CanvasRenderingContext2D, properties:any, sex:string) {
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
    }

    drawAristae(context:CanvasRenderingContext2D, properties:any, sex:string) {
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
    }

    drawWings(context:CanvasRenderingContext2D, properties:any, sex:string) {
        // need to implement wing sizing
        var wingsize = this.wingsize(properties);
        if( wingsize < .1 )
        {
            return;
        }
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
    }
}