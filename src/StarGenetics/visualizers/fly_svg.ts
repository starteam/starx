/// <reference path="../../StarX/lib/jquery.d.ts" />
/// <reference path="../../StarX/lib/jquery.svg.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-svg" />
/// <amd-dependency path="jquery-svgdom" />

export class FlySVG {

    width: number = 50;
    height: number = 50;
    strokeWidth: number = 0.25; // Default
    legColor: string = 'black';
    aristaeColor: string = 'black';
    headColor: string = 'black';
    eyeColor: string = 'red';
    bodyColor: string = 'rgb(152, 118, 84)';
    wingColor: string = 'rgba(64, 64, 64, 0.2)';
    sexCombColor: string = 'black';
    aristae: number = 1;
    wingSize: number = 1;
    isMale: boolean = true;

    _get(properties: any, key: string, defaultValue: string): any {
        if (properties && properties.hasOwnProperty(key)) {
            var c = properties[key]
            if (c.hasOwnProperty('value')) {
                return c['value'];
            }
        }
        return defaultValue;
    }

    render(container: any, organism: any) {
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
    }

    size($container: any, svg: any) {
        var $svg = $(svg.root());

        $container.width(this.width);
        $container.height(this.height);
        $svg.attr('width', this.width);
        $svg.attr('height', this.height);
        $svg.attr('viewBox', '0 0 ' + this.width + ' ' + this.height);
    }

    // Applies default drawing params, scaling and translation transforms
    getGroup(svg: any) {
        var g = svg.group({
            strokeWidth: this.strokeWidth,
            transform: 'scale(1.5, 1.5)'
        });

        return svg.group(g, {transform: 'translate(16.5, 12)'});
    }

    getEyeColor(properties: any) {
        return this._get(properties, 'eyecolor', this.eyeColor);
    }

    getBodyColor(properties: any) {
        return this._get(properties, 'bodycolor', this.bodyColor);
    }

    getAristae(properties: any) {
        return parseFloat(this._get(properties, 'aristae', '' + this.aristae));
    }

    getWingSize(properties: any) {
        return parseFloat(this._get(properties, 'wingsize', '' + this.wingSize))
    }

    getIsMale(organism: any) {
        return organism.sex == 'MALE';
    }

    drawLegs(g: any, svg: any) {
        var dx = 3.75, dy = -1;

        svg.line(g, dx, dy, dx * 2, -5, {stroke: this.legColor});
        svg.line(g, dx, dy, dx * 2, 1, {stroke: this.legColor});
        svg.line(g, dx, dy, dx * 2, 8, {stroke: this.legColor});
        svg.line(g, -dx, dy, -dx * 2, -5, {stroke: this.legColor});
        svg.line(g, -dx, dy, -dx * 2, 1, {stroke: this.legColor});
        svg.line(g, -dx, dy, -dx * 2, 8, {stroke: this.legColor});
    }

    drawAristae(g: any, svg: any) {
        var length = 2.5;
        svg.line(g, -1, -9.5, -1 - length, -9.5 - length, {stroke: this.aristaeColor});
        svg.line(g, 1, -9.5, 1 + length, -9.5 - length, {stroke: this.aristaeColor});
    }

    drawHead(g: any, svg: any) {
        svg.ellipse(g, 0, -7.75, 4, 2, {stroke: this.headColor, fill: this.headColor});
    }

    drawEyes(g: any, svg: any) {
        var ang = 40/180*Math.PI;

        svg.circle(g, -2.0, -7.75, 2.0, {stroke: this.headColor, fill: this.headColor});
        svg.circle(g, 2.0, -7.75, 2.0, {stroke: this.headColor, fill: this.headColor});

        svg.path(g, this.arc(svg, -1.9, -7.75, 1.5, ang, ang + Math.PI),
            {stroke: this.eyeColor, fill: this.eyeColor}
        );
        svg.path(g, this.arc(svg, 1.9, -7.75, 1.5, -ang, -ang + Math.PI),
            {stroke: this.eyeColor, fill: this.eyeColor}
        );
    }

    drawBody(g: any, svg: any) {
        if (this.isMale) {
            // Short, narrow body
            svg.ellipse(g, 0, 2, 4, 10, {stroke: this.bodyColor, fill: this.bodyColor});
        }
        else {
            // Long, wide body
            svg.ellipse(g, 0, 5, 5.5, 12.5, { stroke: this.bodyColor, fill: this.bodyColor }); // Female long
        }
    }

    drawWings(g: any, svg: any) {
        // TODO: implement wing sizing
        if (this.wingSize < 0.1) {
            return;
        }
        svg.ellipse(g, -2.5, 7, 3, 14, {stroke: this.wingColor, fill: this.wingColor});
        svg.ellipse(g, 2.5, 7, 3, 14, {stroke: this.wingColor, fill: this.wingColor});
    }

    drawSexCombs(g: any, svg: any) {
        var dx = 3.75, dy = -1;

        svg.circle(g, -dx * 1.65, dy - 2.5, 0.75, {stroke: this.sexCombColor, fill: this.sexCombColor});
        svg.circle(g, dx * 1.65, dy - 2.5, 0.75, {stroke: this.sexCombColor, fill: this.sexCombColor});
    }

    drawMaleSexMarker(g: any, svg: any) {
        svg.circle(g, 10, 14.5, 4, {strokeWidth: 0.75, stroke: 'black', fill: 'none'});
        svg.line(g, 13, 11.5, 16, 8.5, {strokeWidth: 0.75, stroke: 'black'});
        // Arrow tip
        svg.line(g, 16, 8.5, 13, 8.5, { strokeWidth: 0.75, stroke: 'black' });
        svg.line(g, 16, 8.1, 16, 11.9, { strokeWidth: 0.75, stroke: 'black' });
    }

    drawFemaleSexMarker(g: any, svg: any) {
        svg.circle(g, 11, 12.5, 4, { strokeWidth: 0.75, stroke: 'black', fill: 'none' });
        // Cross
        svg.line(g, 11, 16.5, 11, 21.5, { strokeWidth: 0.75, stroke: 'black' });
        svg.line(g, 9, 19.5, 13, 19.5, { strokeWidth: 0.75, stroke: 'black' });
    }

    // Axes & origin for visual building
    drawAxes(svg) {
        svg.line(25, 25, 25, 50, {stroke: 'black'});
        svg.line(25, 25, 50, 25, {stroke: 'black'});
        svg.circle(25, 25, 2, {fill: 'black', stroke: 'black'});
    }

    // Draw an arc, HTML canvas style
    arc(svg, xc, yc, radius, startAngle, endAngle, isClockwise?) {
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
}
