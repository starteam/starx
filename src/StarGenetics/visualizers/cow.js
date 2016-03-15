/// <reference path="../../StarX/lib/jquery.d.ts" />
/// <reference path="../../StarX/lib/jquery.svg.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-svg" />
/// <amd-dependency path="jquery-svgdom" />
define(["require", "exports", "jquery", "jquery-svg", "jquery-svgdom"], function (require, exports) {
    "use strict";
    var Cow = (function () {
        function Cow() {
            this.baseUrl = '/StarGenetics/visualizers/images/cow/';
            this.initWidth = 305; // Initial SVG file width
            this.initHeight = 220; // Initial SVG file height
        }
        Cow.prototype.render = function (container, organism) {
            var $container = $(container);
            // Create SVG node
            $container.svg();
            // Get SVG wrapper
            var svg = $container.svg('get');
            this.loadOrganism(this.baseUrl, svg, organism);
            this.resize($container, svg, 152, 110);
        };
        Cow.prototype.resize = function ($container, svg, width, height) {
            var widthRatio = this.initWidth / width, heightRatio = this.initHeight / height, $svg = $(svg.root());
            $container.width(width);
            $container.height(height);
            $svg.attr('width', width);
            $svg.attr('height', height);
            $svg.attr('viewBox', '0 0 ' + widthRatio * width + ' ' + heightRatio * height);
        };
        // Get ids which will let us retrieve the correct file name
        Cow.prototype.getBodyShapeId = function (organism) {
            var sex = organism.sex === 'MALE' ? 'bull' : 'cow';
            var hump = organism.properties.hump.value ? 'hump' : 'humpless';
            return [sex, hump].join('-');
        };
        Cow.prototype.getSpecklesId = function (organism) {
            return organism.properties.speckles.value ? 'speckles' : '';
        };
        Cow.prototype.getSpotsId = function (organism) {
            return organism.properties.spots.value ? 'spots' : '';
        };
        Cow.prototype.getFaceId = function (organism) {
            return 'face';
        };
        Cow.prototype.getHornsId = function (organism) {
            return organism.properties.horns.value ? [organism.properties.hornsize.value, 'horns', organism.properties.hornshape.value].join('-') : '';
        };
        Cow.prototype.getUdderId = function (organism) {
            return organism.sex !== 'MALE' ? 'udder' : '';
        };
        Cow.prototype.getSexId = function (organism) {
            return organism.sex === 'MALE' ? 'male-brand' : 'female-brand';
        };
        Cow.prototype.getBodyShapeImage = function (baseUrl, organism) {
            var fileName = baseUrl + this.getBodyShapeId(organism) + '.txt';
            console.info('Loading body image: ' + fileName);
            return fileName;
        };
        Cow.prototype.getSpecklesImage = function (baseUrl, organism) {
            var id = this.getSpecklesId(organism), fileName = '';
            if (id !== '') {
                fileName = baseUrl + id + '.txt';
                console.info('Loading speckles image: ' + fileName);
            }
            return fileName;
        };
        Cow.prototype.getSpotsImage = function (baseUrl, organism) {
            var id = this.getSpotsId(organism), fileName = '';
            if (id !== '') {
                fileName = baseUrl + id + '.txt';
                console.info('Loading spots image: ' + fileName);
            }
            return fileName;
        };
        Cow.prototype.getFaceImage = function (baseUrl, organism) {
            var fileName = baseUrl + this.getFaceId(organism) + '.txt';
            console.info('Loading face image: ' + fileName);
            return fileName;
        };
        Cow.prototype.getHornsImage = function (baseUrl, organism) {
            var id = this.getHornsId(organism), fileName = '';
            if (id !== '') {
                fileName = baseUrl + id + '.txt';
                console.info('Loading horns image: ' + fileName);
            }
            return fileName;
        };
        Cow.prototype.getUdderImage = function (baseUrl, organism) {
            var id = this.getUdderId(organism), fileName = '';
            if (id !== '') {
                fileName = baseUrl + id + '.txt';
                console.info('Loading udder image: ' + fileName);
            }
            return fileName;
        };
        Cow.prototype.getSexImage = function (baseUrl, organism) {
            var fileName = baseUrl + this.getSexId(organism) + '.txt';
            console.info('Loading sex image: ' + fileName);
            return fileName;
        };
        Cow.prototype.colorBody = function (svg, organism) {
            var id = this.getBodyShapeId(organism);
            $('#' + id + ' .body-color', svg.root()).each(function () {
                $(this).attr('fill', organism.properties.bodycolor.value);
            });
        };
        Cow.prototype.colorSpeckles = function (svg, organism) {
            var id = this.getSpecklesId(organism);
            if (id !== '') {
                $('#' + id + ' .speckles-color', svg.root()).each(function () {
                    $(this).attr('fill', organism.properties.specklescolor.value);
                });
            }
        };
        Cow.prototype.colorSpots = function (svg, organism) {
            var id = this.getSpotsId(organism);
            if (id !== '') {
                $('#' + id + ' .spots-color', svg.root()).each(function () {
                    $(this).attr('fill', organism.properties.spotscolor.value);
                });
            }
        };
        Cow.prototype.colorFace = function (svg, organism) {
            var id = this.getFaceId(organism);
            $('#' + id + ' .face-color', svg.root()).each(function () {
                $(this).attr('fill', organism.properties.facecolor.value);
            });
        };
        Cow.prototype.loadOrganism = function (baseUrl, svg, organism) {
            var self = this, specklesImage, spotsImage, hornsImage, udderImage, bodyShapeCall, specklesCall, spotsCall, faceCall, hornsCall, udderCall, sexCall, empty = $.Deferred().resolve();
            // Painting order that has to be respected (because shapes overlap):
            // Body shape, speckles, spots, face, horns, udder, sex
            // Speckles, spots, horns, udder are optional. If not defined, we set the function call to a
            // resolved deferred, returning nothing. Passing an empty string to $.get is not a good idea,
            // it will return unwanted data.
            svg.clear();
            // Get body shape image
            bodyShapeCall = $.get(this.getBodyShapeImage(baseUrl, organism));
            // Get speckles image, if ever
            specklesImage = this.getSpecklesImage(baseUrl, organism);
            specklesCall = specklesImage !== '' ? $.get(specklesImage) : empty;
            // Get spots image, if ever
            spotsImage = this.getSpotsImage(baseUrl, organism);
            spotsCall = spotsImage !== '' ? $.get(spotsImage) : empty;
            // Get face image
            faceCall = $.get(this.getFaceImage(baseUrl, organism));
            // Get horns image, if ever
            hornsImage = this.getHornsImage(baseUrl, organism);
            hornsCall = hornsImage !== '' ? $.get(hornsImage) : empty;
            // Get udder image, if ever
            udderImage = this.getUdderImage(baseUrl, organism);
            udderCall = udderImage !== '' ? $.get(udderImage) : empty;
            // Get sex image
            var sexImage = this.getSexImage(baseUrl, organism);
            sexCall = sexImage !== '' ? $.get(sexImage) : empty;
            $.when(bodyShapeCall, specklesCall, spotsCall, faceCall, hornsCall, udderCall, sexCall).done(function () {
                $.each(arguments, function (index, value) {
                    if (value) {
                        svg.add(value[0]);
                    }
                });
                self.colorBody(svg, organism);
                self.colorSpeckles(svg, organism);
                self.colorSpots(svg, organism);
                self.colorFace(svg, organism);
            });
            console.info('The following phenotype is displayed: ', organism);
        };
        return Cow;
    }());
    exports.Cow = Cow;
});
//# sourceMappingURL=cow.js.map