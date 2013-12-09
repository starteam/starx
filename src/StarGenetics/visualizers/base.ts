export interface Visualizer {
    render(canvas:HTMLCanvasElement, properties:any,organism:any);
}

export class BaseVisualizer {
    width:number = 75;
    height:number = 75;

    prepare(canvas:HTMLCanvasElement):CanvasRenderingContext2D {

        canvas.setAttribute('width', '' + this.width);
        canvas.setAttribute('height', '' + this.height);
        var context = canvas.getContext("2d");
        context.save();
        context.scale(this.width / 4, this.height / 4);
        context.translate(1, 1);
        return context;
    }

    clearImage(context:CanvasRenderingContext2D) {
        context.clearRect(-1, -1, 1, 1);
    }

    commit(context) {
        //context.commit();
        context.restore();

    }

}
