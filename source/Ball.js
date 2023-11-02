export class Ball{
    //静的なプロパティ
    initPosition;
    radius;
    strokeColor;
    strokeWeight;
    p;
    //変動するプロパティ
    position;
    velocity;
    acceleration;
    //可変なプロパティ
    waitSpeed;
    waitGravity;

    constructor(P, PosX, PosY, Radius, Fill, StrokeColor, StrokeWeight){
        this.p = P;
        this.initPosition = this.p.createVector(PosX, PosY);
        this.radius = Radius * 2;
        this.fill = Fill;
        console.log(this.fill);
        this.strokeColor = StrokeColor;
        this.strokeWeight = StrokeWeight;
        this.init();
        this.reset();
    }

    //変動するプロパティを初期化
    reset(){
        this.position = this.p.createVector(this.initPosition.x,this.initPosition.y);
        this.velocity = this.p.createVector(0,0);
        this.acceleration = this.p.createVector(0,0);
    }

    //可変なプロパティを初期化
    init(){
        this.waitGravity = 350;
        this.waitSpeed = 0.017;
    }

    update(){
        console.log(0);
        this.randomWait();
    }

    display(){
        this.p.fill(this.fill);
        this.p.strokeWeight(this.strokeWeight);
        this.p.stroke(this.strokeColor);
        this.p.circle(this.position.x, this.position.y, this.radius);
    }

    randomWait(){
        //初期値と現在地との距離を算出し、それをgravityで細分化した値をratioとしている
        let ratio = this.p.dist(this.position.x, this.position.y, this.initPosition.x, this.initPosition.y) / this.waitGravity;
        if (this.position.x > this.initPosition.x) {
            this.acceleration.x += this.p.random(-this.waitSpeed - ratio, this.waitSpeed);
        }
        if (this.position.x <= this.initPosition.x) {
            this.acceleration.x += this.p.random(-this.waitSpeed, this.waitSpeed + ratio);
        }
        if (this.position.y > this.initPosition.y) {
            this.acceleration.y += this.p.random(-this.waitSpeed - ratio, this.waitSpeed);
        }
        if (this.position.y <= this.initPosition.y) {
            this.acceleration.y += this.p.random(-this.waitSpeed, this.waitSpeed + ratio);
        }
        this.acceleration.limit(0.7);
        this.position.x += this.acceleration.x;
        this.position.y += this.acceleration.y;
    }
}