function length(p1, p2) {
    return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
}


function distanceToCircle(player, center) {
    return length(center, player) - center.radius;
}

function areCirclesColliding(p, c) {
    return length(p, c) <= p.radius + c.radius;
}

function scanScene(p) {
    let distToScene = 10000;
    for(let i = 0; i < Figures.circles.length; i++) {
        let distToCircle = distanceToCircle(p, Figures.circles[i]);
        distToScene = Math.min(distToScene, distToCircle);
    }
    return distToScene;
}
