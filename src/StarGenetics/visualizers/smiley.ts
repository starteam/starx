/// <reference path="base.ts" />

import base = require("StarGenetics/visualizers/base");

export class Smiley extends base.BaseVisualizer implements base.Visualizer {
    smileyWidth = 75;
    smileyHeight = 75;

    bodyRadius:number = .8;

    constructor()
    {
        super();
        this.width = this.smileyWidth;
        this.height = this.smileyHeight;
    }


    render(canvas:HTMLCanvasElement, properties:any,organism:any) {
        console.info("Smiley render ");
        console.info(canvas);
        console.info(properties);

        var context = this.prepare(canvas);
        this.clearImage(context);
        this.drawBody(context, properties);
        this.drawEyes(context, properties);
        this.drawMouth(context, properties);
//        this.drawSterile(context,properties);
//        this.drawMatings(context,properties);
        this.commit(context);
        console.info("Smiley render done");

    }

    drawBody(context:CanvasRenderingContext2D, properties:any) {
        context.beginPath();
        context.arc(0, 0, this.bodyRadius, 0, 2 * Math.PI, false);
        context.fillStyle = properties['bodycolor'].value;
        context.fill();
        context.closePath();
    }

    drawEyes(context:CanvasRenderingContext2D, properties:any) {
        var x0 = this.bodyRadius * .4;
        var y0 = this.bodyRadius * .2;
        var r = this.bodyRadius * .2
        context.beginPath();
        context.arc(-x0, -y0, r, 0, 2 * Math.PI, false);
        context.arc(+x0, -y0, r, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();

    }

    drawMouth(context:CanvasRenderingContext2D, properties:any) {
        if (properties['mouth'].value == 'happy') {
            this.drawMouthHappy(context,properties);
        }
        else if (properties['mouth'].value == 'sad') {
            this.drawMouthSad(context,properties);
        }
        else
        {
            this.drawMouthNeutral(context,properties);
        }
    }

    drawMouthNeutral(context:CanvasRenderingContext2D, properties:any) {
            var d = .5;
        var x0 = this.bodyRadius * d;
        var y0 = this.bodyRadius * d;
        var r = this.bodyRadius * .2
        context.beginPath();
        context.fillRect(-x0, y0, 2 * x0, y0 * .2);
        context.fill();
        context.closePath();
    }

    drawMouthHappy(context:CanvasRenderingContext2D, properties:any) {
            var d = .5;
        var x0 = this.bodyRadius * d;
        var y0 = this.bodyRadius * d;
        var r = this.bodyRadius * .05;
        context.beginPath();
        context.fillRect(-x0, y0, 2 * x0, y0 * .2);
        context.fillRect(-x0, y0, r , -y0 *.4 ) ;
        context.fillRect(x0-r, y0, r , -y0 *.4 ) ;
        context.fill();
        context.closePath();
    }

    drawMouthSad(context:CanvasRenderingContext2D, properties:any) {
            var d = .5;
        var x0 = this.bodyRadius * d;
        var y0 = this.bodyRadius * d;
        var r = this.bodyRadius * .05;
        context.beginPath();
        context.fillRect(-x0, y0, 2 * x0, y0 * .2);
        context.fillRect(-x0, y0, r , y0 *.4 ) ;
        context.fillRect(x0, y0, r , y0 *.4 ) ;
        context.fill();
        context.closePath();
    }

}