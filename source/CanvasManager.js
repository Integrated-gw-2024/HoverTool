export class CanvasManager {
    p;
    canvas;
    aspectRatio;
    widthLimit;
    heightLimit;
    panelsWidth;

    constructor(P5) {
        this.p = P5;
        this.canvas = document.getElementById('defaultCanvas0');
        this.panelsWidth = 320;
        this.widthLimit = window.innerWidth - this.panelsWidth;
        this.heightLimit = window.innerHeight- 20;
    }

    resizeCanvas(Width, Height) {
        console.log(this.aspectDetector(Width, Height));
        this.p.resizeCanvas(Width, Height);
        if (this.aspectDetector(Width, Height) == "alignWidth") {
            let widthRatio = this.widthLimit / Width;
            this.canvas.style.width = `${Width * widthRatio}px`;
            this.canvas.style.height = `${Height * widthRatio}px`;
        }
        else if (this.aspectDetector(Width, Height) == "alignHeight") {
            let heightRatio = this.heightLimit / Height;
            this.canvas.style.width = `${Width * heightRatio}px`;
            this.canvas.style.height = `${Height * heightRatio}px`;
        }
    }
    createCanvas(Width, Height) {
        this.aspectRatio = Width / Height;
        console.log(this.aspectDetector(Width, Height))
        this.p.createCanvas(Width, Height);
        this.canvas.style.width = '100px';
        this.canvas.style.height = '100px';
    }

    aspectDetector(Width, Height) {
        let widthRatio = this.widthLimit / Width;
        if (Height * widthRatio > this.heightLimit) {
            return "alignHeight";
        } else {
            return "alignWidth";
        }
    }
}