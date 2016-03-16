/// <reference path="../../StarX/lib/jquery.d.ts" />
/// <reference path="../../StarX/lib/jquery.svg.d.ts" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="jquery-svg" />
/// <amd-dependency path="jquery-svgdom" />

export class Pea {

    baseUrl = '/StarGenetics/visualizers/images/pea/';
    initWidth = 200;  // Initial SVG file width
    initHeight = 200; // Initial SVG file height
    // Color dictionary
    colors = {
        green: '#50b461',
        pink: '#f48ca8',
        purple: '#d69fc8',
        red: '#be1e2d',
        yellow: '#f1da68',
        white: '#ffffff'
    };

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
    getStemId(organism: any) {
        return [organism.properties.plantheight.value, 'stem'].join('-');
    }

    getFlowerId(organism: any) {
        return [organism.properties.plantheight.value, 'stem', organism.properties.flowerpodposition.value, 'flower'].join('-');
    }

    getPodId(organism: any) {
        return [organism.properties.plantheight.value, 'stem', organism.properties.flowerpodposition.value, organism.properties.podshape.value, 'pod'].join('-');
    }

    getSeedId(organism: any) {
        return [organism.properties.peashape.value, 'seed'].join('-');
    }

    getStemImage(baseUrl: string, organism: any) {
        var fileName = baseUrl + this.getStemId(organism) + '.txt';

        console.info('Loading stem image: ' + fileName);
        return fileName;
    }

    getFlowerImage(baseUrl: string, organism: any) {
        var fileName = baseUrl + this.getFlowerId(organism) + '.txt';

        console.info('Loading flower image: ' + fileName);
        return fileName;
    }

    getPodImage(baseUrl: string, organism: any) {
        var fileName = baseUrl + this.getPodId(organism) + '.txt';

        console.info('Loading pod image: ' + fileName);
        return fileName;
    }

    getSeedImage(baseUrl: string, organism: any) {
        var fileName = baseUrl + this.getSeedId(organism) + '.txt';

        console.info('Loading seed image: ' + fileName);
        return fileName;
    }

    colorFlower(svg: any, organism: any) {
        var id = this.getFlowerId(organism), self = this;

        $('#' + id + ' .flower-color', svg.root()).each(function() {
            $(this).attr('fill', self.colors[organism.properties.flowercolor.value]);
        });
    }

    colorPod(svg: any, organism: any) {
        var id = this.getPodId(organism), self = this;

        $('#' + id + ' .pod-color', svg.root()).each(function() {
            $(this).attr('fill', self.colors[organism.properties.podcolor.value]);
        });
    }

    colorSeed(svg: any, organism: any) {
        var id = this.getSeedId(organism), self = this;

        $('#' + id + ' .seed-color', svg.root()).each(function() {
            $(this).attr('fill', self.colors[organism.properties.peacolor.value]);
        });
    }

    loadOrganism(baseUrl: string, svg: any, organism: any) {
        var self = this, stemCall, flowerCall, podCall, seedCall;

        svg.clear();
        // Get stem image
        stemCall = $.get(this.getStemImage(baseUrl, organism));

        // Get flower image
        flowerCall = $.get(this.getFlowerImage(baseUrl, organism));

        // Get pod image
        podCall = $.get(this.getPodImage(baseUrl, organism));

        // Get seed image
        seedCall = $.get(this.getSeedImage(baseUrl, organism));

        $.when(stemCall, flowerCall, podCall, seedCall).done(function() {
            $.each(arguments, function(index, value) {
                if (value) {
                    svg.add(value[0]);
                }
            });
            self.colorFlower(svg, organism);
            self.colorPod(svg, organism);
            self.colorSeed(svg, organism);
        });
        console.info('The following phenotype is displayed: ', organism);
    }
}
