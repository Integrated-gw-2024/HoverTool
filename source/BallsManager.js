import { Ball } from "./Ball";

export class BallsManager {
    svgArray;
    balls = [];
    p;
    constructor(P, SvgArray) {
        this.p = P
        this.svgArray = SvgArray.svgArray;
        this.createBalls();
    }

    createBalls() {
        for (let i = 0; i < this.svgArray.length; i++) {
            let position = this.p.createVector(
                this.svgArray[i].position.x,
                this.svgArray[i].position.y
            );
            let fill = this.svgArray[i].fill;
            let radius = this.svgArray[i].radius;
            let strokeColor = this.svgArray[i].strokeColor;
            let strokeWeight = this.svgArray[i].strokeWeight;
            this.balls.push(new Ball(this.p, position.x, position.y, radius, fill, strokeColor, strokeWeight));
        }
    }

    update() {
        for (let ball of this.balls) {
            ball.update();
        }
    }

    display() {
        for (let ball of this.balls) {
            ball.display();
        }
    }

    setPARAMS(){
        
    }

    reset(){
        for (let ball of this.balls) {
            ball.reset();
        }
    }

}