class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}
class LightRay {
    constructor(x, y, tX, tY) {
        this.x = x;
        this.y = y;
        this.targetX = tX;
        this.targetY = tY;
    }
    draw() {
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "white";
        context.moveTo(this.x, this.y);
        context.lineTo(this.targetX, this.targetY);
        context.stroke();
    }
}

class DarkRay extends LightRay {
    constructor(x, y, tX, tY) {
        super(x, y, tX, tY);
    }
    draw() {
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "green";
        context.moveTo(this.x, this.y);
        context.lineTo(this.targetX, this.targetY);
        context.stroke();
    }
}

class DarkPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}