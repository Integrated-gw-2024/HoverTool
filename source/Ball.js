export class Ball {
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
    initSpeed;
    //可変なプロパティ
    PARAMS = {
        waitSpeed: null,
        waitGravity: null,
        initSpeedRatio: null,
        limitSpeed: null,
    }

    constructor(P, PosX, PosY, Radius, Fill, StrokeColor, StrokeWeight) {
        this.p = P;
        this.initPosition = this.p.createVector(PosX, PosY);
        this.radius = Radius * 2;
        this.fill = Fill;
        this.strokeColor = StrokeColor;
        this.strokeWeight = StrokeWeight;
        console.log(this.fill);
        this.init();
        this.reset();
    }

    //変動するプロパティを初期化
    reset() {
        this.position = this.p.createVector(this.initPosition.x, this.initPosition.y);
        this.velocity = this.p.createVector(0, 0);
        this.initSpeed = this.p.map(this.PARAMS.initSpeedRatio, 0, 1, 0, this.PARAMS .limitSpeed);
        this.acceleration = this.p.createVector(
            this.p.random(-this.initSpeed, this.initSpeed),
            this.p.random(-this.initSpeed, this.initSpeed)
        );
    }

    //可変なプロパティを初期化
    init() {
        this.PARAMS = {
            waitGravity: 350,
            waitSpeed:0.017,
            initSpeedRatio: 0.5,//これは0~1までを表していて、limitSpeedをmapしている
            limitSpeed: 0.7,
        }
    }

    //可変なプロパティを設定
    setPARAMS(NewPARAMS) {
        //値を更新
        Object.assign(this.PARAMS, NewPARAMS);
    }

    update() {
        this.randomWait();
    }

    display() {
        this.p.fill(this.fill);
        this.p.strokeWeight(this.strokeWeight);
        this.p.stroke(this.strokeColor);
        this.p.circle(this.position.x, this.position.y, this.radius);
    }

    randomWait() {
        //初期値と現在地との距離を算出し、それをgravityで細分化した値をratioとしている
        let ratio = this.p.dist(this.position.x, this.position.y, this.initPosition.x, this.initPosition.y) / this.PARAMS.waitGravity;
        if (this.position.x > this.initPosition.x) {
            this.acceleration.x += this.p.random(-this.PARAMS.waitSpeed - ratio, this.PARAMS.waitSpeed);
        }
        if (this.position.x <= this.initPosition.x) {
            this.acceleration.x += this.p.random(-this.PARAMS.waitSpeed, this.PARAMS.waitSpeed + ratio);
        }
        if (this.position.y > this.initPosition.y) {
            this.acceleration.y += this.p.random(-this.PARAMS.waitSpeed - ratio, this.PARAMS.waitSpeed);
        }
        if (this.position.y <= this.initPosition.y) {
            this.acceleration.y += this.p.random(-this.PARAMS.waitSpeed, this.PARAMS.waitSpeed + ratio);
        }
        this.acceleration.limit(this.PARAMS.limitSpeed);
        this.position.x += this.acceleration.x;
        this.position.y += this.acceleration.y;
    }
}