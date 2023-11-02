export class CanvasManager{
    p;

    constructor(P5){
        this.p = P5;
    }

    resizeCanvas(Width, Height){
        this.p.resizeCanvas(Width, Height);
    }
    createCanvas(Width, Height){
        this.p.createCanvas(Width, Height);
    }
}