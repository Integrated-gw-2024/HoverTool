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
        this.canvasElement = document.getElementById('canvas');
        console.log(this.canvasElement);
        this.panelsWidth = 380;
        this.widthLimit = window.innerWidth - this.panelsWidth;
        this.heightLimit = window.innerHeight- 40;
    }

    resizeCanvas(Width, Height) {
        console.log(this.aspectDetector(Width, Height));
        this.p.resizeCanvas(Width, Height);
        if (this.aspectDetector(Width, Height) == "alignWidth") {
            let widthRatio = this.widthLimit / Width;
            this.canvas.style.width = `${Width * widthRatio}px`;
            this.canvas.style.height = `${Height * widthRatio}px`;
            this.canvasElement.style.width = `${Width * widthRatio}px`;
            this.canvasElement.style.height = `${Height * widthRatio}px`;
        }
        else if (this.aspectDetector(Width, Height) == "alignHeight") {
            let heightRatio = this.heightLimit / Height;
            this.canvas.style.width = `${Width * heightRatio}px`;
            this.canvas.style.height = `${Height * heightRatio}px`;
            this.canvasElement.style.width = `${Width * heightRatio}px`;
            this.canvasElement.style.height = `${Height * heightRatio}px`;
        }
    }
    createCanvas(Width, Height) {
        this.aspectRatio = Width / Height;
        console.log(this.aspectDetector(Width, Height))
        let canvas = this.p.createCanvas(Width, Height);
        canvas.parent('canvas');
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

    aspectDetector(Width, Height) {
        let widthRatio = this.widthLimit / Width;
        if (Height * widthRatio > this.heightLimit) {
            return "alignHeight";
        } else {
            return "alignWidth";
        }
    }
}