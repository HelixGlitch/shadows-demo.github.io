endlessCanvas = true;
let Ray = {
    x: 50,
    y: 500,
    radius: 30,
    ray: {
        angle: 0
    },
    spheres: []
}
let Player = {
    x: 100,
    y: 200,
    radius: 20,
    fov: 360
}
var Figures = {
    circles: [],
    boxes: [],
    shadows: [],
    rays: [],
    darkpoints: []
}
Figures.circles.push(new Circle(500, 100, 30));
Figures.circles.push(new Circle(400, 300, 30));
Figures.circles.push(new Circle(200, 100, 30));
Figures.circles.push(new Circle(200, 500, 30));
Figures.circles.push(new Circle(600, 300, 30));
Figures.circles.push(new Circle(450, 200, 30));
//let closest = scanScene(Player, Figures);
function update() {
    Ray.x = Player.x;
    Ray.y = Player.y;
    if(isKeyPressed[87]) {
        Player.y --;
        //closest = scanScene(Player, Figures);
        constructShadow();
    }
    if(isKeyPressed[83]) {
        Player.y ++;
        //closest = scanScene(Player, Figures);
        constructShadow();
    }
    if(isKeyPressed[65]) {
        Player.x --;
        //closest = scanScene(Player, Figures);
        constructShadow();
    }
    if(isKeyPressed[68]) {
        Player.x ++;
        //closest = scanScene(Player, Figures);
        constructShadow();
    }
}

function draw() {

    //context.save();
    //context.translate(500, 500);
    context.fillStyle = "lime";
    context.fillRect(0, 0, 800, 600);
    drawShadow();
    context.fillStyle = "gray";

    for(let i = 0; i < Figures.circles.length; i++) {
        Figures.circles[i].draw();
    }
    context.beginPath();
    context.fillStyle = "lightgray";
    //if(closest == undefined) return;
    for(let i = 0; i < Ray.spheres.length; i++) {
        context.globalAlpha = 0.5;
        context.arc(Ray.spheres[i].x, Ray.spheres[i].y, Ray.spheres[i].radius, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.globalAlpha = 1;
        context.arc(Ray.spheres[i].x, Ray.spheres[i].y, Ray.spheres[i].radius, 0, Math.PI * 2);
        context.stroke();
    }
    //context.arc(Player.x, Player.y, //closest, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.fillStyle = "gray";
    context.arc(Player.x, Player.y, Player.radius, 0, Math.PI * 2);
    context.fill();
    //context.restore();
    context.fillStyle = "orange";
    context.font = "10px Times New Roman";
    context.fillText("Taka izglezhda s endless canvas :D", 100, 100);
}

function keyup(key) {
    if(key == 32) {
        setInterval(constructShadow, 10);  
    }
    if(key == 66) {
        if(endlessCanvas) endlessCanvas = false;
        else endlessCanvas = true;
    }
}


function constructShadow() {
    //Ray.ray.angle = Math.atan((Ray.x-mouseX)/(Ray.y-mouseY));
    Ray.spheres = [];
    Figures.darkpoints = [{x:1000,y:-200}, {x:1000,y:800}, {x:-200,y:800}, {x:-200,y:-200}];
    let angle = -90 / 180 * Math.PI;
    for(let i = 0; i < Player.fov * 10; i++) {
        angle += 0.1 / 180 * Math.PI;
        Ray.spheres = [];
        while(Ray.spheres.length <= 40) {
            let x, y, r;
            if(Ray.spheres.length === 0) {
                Ray.spheres.push(new Circle(Ray.x + Ray.radius * Math.cos(angle), Ray.y + Ray.radius * Math.sin(angle), scanScene(Player)))
                x = Ray.x + Ray.radius * Math.cos(angle);
                y = Ray.y + Ray.radius * Math.sin(angle);
            }else{
                x = Ray.spheres[Ray.spheres.length-1].x + Ray.spheres[Ray.spheres.length-1].radius * Math.cos(angle);
                y = Ray.spheres[Ray.spheres.length-1].y + Ray.spheres[Ray.spheres.length-1].radius * Math.sin(angle);
            }
            r = scanScene({x: x, y: y, radius: r});
            if(r <= 0) r = 0.0001;
            if(r <= 0.1 || !areColliding(x, y, 1, 1, 0, 0, 800, 600)) {
                Ray.spheres.push(new Circle(x, y, r));
                Figures.darkpoints.push(new DarkPoint(x, y));
                break;
            }

            Ray.spheres.push(new Circle(x, y, r));
            if(r <= 0 || r > 1000) break;
        }
    }
}

function drawShadow() {
    if(Figures.darkpoints.length === 0) return;
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(Figures.darkpoints[0].x, Figures.darkpoints[0].y);
    for(let i = 0; i < Figures.darkpoints.length; i++) {
        if(i === Figures.darkpoints.length - 1) {
            break;
        }
        context.lineTo(Figures.darkpoints[i].x, Figures.darkpoints[i].y);
    }
    context.closePath();   
    context.fill("evenodd");
}