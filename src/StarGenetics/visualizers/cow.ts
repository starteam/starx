/// <reference path="../../StarX/lib/jquery.d.ts" />
/// <reference path="../../StarX/lib/jquery.svg.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-svg" />
/// <amd-dependency path="jquery-svgdom" />

export class Cow {

    baseUrl: string = '/StarGenetics/visualizers/images/cow/';
    initWidth: number = 305;  // Initial SVG file width
    initHeight: number = 220; // Initial SVG file height

    constructor() {
        if (location.hostname == 'math.mit.edu') {
            this.baseUrl = 'http://math.mit.edu/~jmc/starx/StarGenetics/visualizers/images/cow/';
        }
    }

    render(container: any, organism: any) {
        var $container = $(container);
        // Create SVG node
        $container.svg();
        // Get SVG wrapper
        var svg = $container.svg('get');
        this.loadOrganism(this.baseUrl, svg, organism);
        this.resize($container, svg, 152, 110);
    }

    resize($container: any, svg: any, width: number, height: number) {
        var widthRatio = this.initWidth / width,
            heightRatio = this.initHeight / height,
            $svg = $(svg.root());

        $container.width(width);
        $container.height(height);
        $svg.attr('width', width);
        $svg.attr('height', height);
        $svg.attr('viewBox', '0 0 ' + widthRatio * width + ' ' + heightRatio * height);
    }

    // Get ids which will let us retrieve the correct file name
    getBodyShapeId(organism: any) {
        var sex = organism.sex === 'MALE' ? 'bull' : 'cow';
        var hump = organism.properties.hump.value ? 'hump' : 'humpless';

        return [sex, hump].join('-');
    }

    getSpecklesId(organism: any) {
        return organism.properties.speckles.value ? 'speckles' : '';
    }

    getSpotsId(organism: any) {
        return organism.properties.spots.value ? 'spots' : '';
    }

    getFaceId(organism: any) {
        return 'face';
    }

    getHornsId(organism: any) {
        return organism.properties.horns.value ? [organism.properties.hornsize.value, 'horns', organism.properties.hornshape.value].join('-') : '';
    }

    getUdderId(organism: any) {
        return organism.sex !== 'MALE' ? 'udder' : '';
    }

    getSexId(organism: any) {
        return organism.sex === 'MALE' ? 'male-brand' : 'female-brand';
    }

    getBodyShapeImage(baseUrl: string, organism: any) {
        var fileName = baseUrl + this.getBodyShapeId(organism) + '.txt';

        console.info('Loading body image: ' + fileName);
        return fileName;
    }

    getSpecklesImage(baseUrl: string, organism: any) {
        var id = this.getSpecklesId(organism), fileName = '';

        if (id !== '') {
            fileName = baseUrl + id + '.txt';
            console.info('Loading speckles image: ' + fileName);
        }

        return fileName;
    }

    getSpotsImage(baseUrl: string, organism: any) {
        var id = this.getSpotsId(organism), fileName = '';

        if (id !== '') {
            fileName = baseUrl + id + '.txt';
            console.info('Loading spots image: ' + fileName);
        }

        return fileName;
    }

    getFaceImage(baseUrl: string, organism: any) {
        var fileName = baseUrl + this.getFaceId(organism) + '.txt';

        console.info('Loading face image: ' + fileName);
        return fileName;
    }

    getHornsImage(baseUrl: string, organism: any) {
        var id = this.getHornsId(organism), fileName = '';

        if (id !== '') {
            fileName = baseUrl + id + '.txt';
            console.info('Loading horns image: ' + fileName);
        }

        return fileName;
    }

    getUdderImage(baseUrl: string, organism: any) {
        var id = this.getUdderId(organism), fileName = '';

        if (id !== '') {
            fileName = baseUrl + id + '.txt';
            console.info('Loading udder image: ' + fileName);
        }

        return fileName;
    }

    getSexImage(baseUrl: string, organism: any) {
        var fileName = baseUrl + this.getSexId(organism) + '.txt';

        console.info('Loading sex image: ' + fileName);
        return fileName;
    }

    colorBody(svg: any, organism: any) {
        var id = this.getBodyShapeId(organism);

        $('#' + id + ' .body-color', svg.root()).each(function() {
            $(this).attr('fill', organism.properties.bodycolor.value);
        });
    }

    colorSpeckles(svg: any, organism: any) {
        var id = this.getSpecklesId(organism);

        if (id !== '') {
            $('#' + id + ' .speckles-color', svg.root()).each(function() {
                $(this).attr('fill', organism.properties.specklescolor.value);
            });
        }
    }

    colorSpots(svg: any, organism: any) {
        var id = this.getSpotsId(organism);

        if (id !== '') {
            $('#' + id + ' .spots-color', svg.root()).each(function() {
                $(this).attr('fill', organism.properties.spotscolor.value);
            });
        }
    }

    colorFace(svg: any, organism: any) {
        var id = this.getFaceId(organism);

        $('#' + id + ' .face-color', svg.root()).each(function() {
            $(this).attr('fill', organism.properties.facecolor.value);
        });
    }

    loadOrganism(baseUrl: string, svg: any, organism: any) {
        var self = this, specklesImage, spotsImage, hornsImage , udderImage,
        bodyShapeCall, specklesCall, spotsCall, faceCall, hornsCall, udderCall, sexCall,
        empty = $.Deferred().resolve();
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

        $.when(bodyShapeCall, specklesCall, spotsCall, faceCall, hornsCall, udderCall, sexCall).done(function() {
            $.each(arguments, function(index, value) {
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
    }
}
