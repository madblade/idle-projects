window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function initParticles() {

    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "particlesJS-canvas");

    document.getElementById("canvas-particles").appendChild(canvas);
    canvas = document.getElementById("particlesJS-canvas");
    context = canvas.getContext("2d");

    var header = document.getElementById("banner").getBoundingClientRect();
    var x = Math.abs(header.right - header.left);
    var y = Math.abs(header.top - header.bottom);

    canvas.width = x;
    canvas.height = y;

    makeHighRes(canvas);

    document.addEventListener("mousemove", mouseMove, !1);
    document.addEventListener("click", click, !1);

    if (firstPass) {
        particles = [];
        newParticle(PARAMS.global.particlesAtStart, "");
        firstPass = false;
    }

    if (request)
        requestAnimationFrame(animate);
}

function removeListeners() {
    document.removeEventListener("mousemove", mouseMove, !1);
    document.removeEventListener("click", click, !1);
}

function click (e) {
    canvas = document.getElementById("particlesJS-canvas");
    var rect = canvas.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;

    user.mouseX = e.clientX - x;
    user.mouseY = e.clientY - y;

    if (user.mouseX > Math.abs(rect.right-rect.left) || user.mouseY > Math.abs(rect.top-rect.bottom)) return;

    newParticle(PARAMS.events.onclick.nb, "click");
}

function mouseMove(e) {
    canvas = document.getElementById("particlesJS-canvas");
    var rect = canvas.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;

    user.mouseX = e.clientX - x;
    user.mouseY = e.clientY - y;

    particles[0].posX = user.mouseX;
    particles[0].posY = user.mouseY;
}

function newParticle(number, type) {
    if (particles.length + number > PARAMS.global.particlesMax) number = PARAMS.global.particlesMax - particles.length;

    var a, s, n, c, l;

    // Get element H/W
    var header = document.getElementById("banner").getBoundingClientRect();
    var x = Math.abs(header.right - header.left);
    var y = Math.abs(header.top - header.bottom);

    for (var i = 0; i < number; i++) {

        a = 0;
        s = 0;
        n = 0;
        c = 0;
        l = .5;

        if (particles.length != 0 && type == "") {
            a = getRandom(x, 0);
            s = getRandom(y, 0);
            n = getRandom(PARAMS.particles.speed.max, PARAMS.particles.speed.min);
            c = getRandom(PARAMS.particles.speed.max, PARAMS.particles.speed.min);
            l = getRandom(PARAMS.particles.size.max, PARAMS.particles.size.min);
        }
        else if (particles.length != 0 && type == "click") {
            a = user.mouseX;
            s = user.mouseY;
            n = getRandom(PARAMS.particles.speed.max, PARAMS.particles.speed.min);
            c = getRandom(PARAMS.particles.speed.max, PARAMS.particles.speed.min);
            l = getRandom(PARAMS.particles.size.max, PARAMS.particles.size.min);
        }
        else if (particles.length != 0 && type == "outter") {
            var o = Math.round(getRandom(3, 0));

            if (0 == o) {
                a = getRandom(-PARAMS.global.limits, 0);
                s = getRandom(0, y);
                n = getRandom(PARAMS.particles.speed.max, 0);
                c = getRandom(PARAMS.particles.speed.max, PARAMS.particles.speed.min);
            }

            else if (1 == o) {
                a = getRandom(-PARAMS.global.limits, x + PARAMS.global.limits);
                s = getRandom(-PARAMS.global.limits, 0);
                n = getRandom(PARAMS.particles.speed.max, PARAMS.particles.speed.min);
                c = getRandom(PARAMS.particles.speed.max, 0);
            }

            else if (2 == o) {
                a = getRandom(x, x + PARAMS.global.limits);
                s = getRandom(0, user.screenY);
                n = getRandom(0, PARAMS.particles.speed.min);
                c = getRandom(PARAMS.particles.speed.max, PARAMS.particles.speed.min);
            }

            else if (3 == o) {
                a = getRandom(-PARAMS.global.limits, x + PARAMS.global.limits);
                s = getRandom(y, y + PARAMS.global.limits);
                n = getRandom(PARAMS.particles.speed.max, PARAMS.particles.speed.min);
                c = getRandom(0, PARAMS.particles.speed.min);
            }

            l = getRandom(PARAMS.particles.size.max, PARAMS.particles.size.min);
        }

        particles.push(new particle(a, s, n, c, l))
    }
}

function animate() {
    if (!request) return;

    requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);
    nbLinked = 0;

    for (var e in particles) {
        var currentParticle = particles[e];

        currentParticle.posX += currentParticle.speedX;
        currentParticle.posY += currentParticle.speedY;

        // Line
        var dx, dy, d, o;
        if (PARAMS.lines.enable)
            for (var t in particles) {
                dx = Math.abs(currentParticle.posX - particles[t].posX);
                dy = Math.abs(currentParticle.posY - particles[t].posY);
                d = Math.sqrt(dx*dx+dy*dy);
                if (d > PARAMS.lines.distance) continue;

                // First
                context.beginPath();
                context.fillStyle = PARAMS.particles.style.color;
                context.globalAlpha = PARAMS.particles.style.opacity;
                context.fill();
                context.arc(currentParticle.posX, currentParticle.posY, currentParticle.size, 0, 2 * Math.PI);

                // Other
                o = d/114.0;
                context.moveTo(currentParticle.posX, currentParticle.posY);
                context.globalAlpha = (1.0-o);
                context.lineWidth = (1.0-o);
                context.strokeStyle = PARAMS.lines.color;

                context.lineTo(particles[t].posX, particles[t].posY);
                context.stroke();
                context.closePath();
                nbLinked++;
            }
    }
    //*/

    deleteParticles();
}

function deleteParticles() {

    // Get element H/W
    var header = document.getElementById("banner").getBoundingClientRect();
    var x = Math.abs(header.right - header.left);
    var y = Math.abs(header.top - header.bottom);

    var toDelete = [];
    for (var e in particles) {
        var p = particles[e];

        if (p.posX < -PARAMS.global.limits && p.speedX < 0) toDelete.push(e);
        else if (p.posX > x + PARAMS.global.limits && p.speedX > 0 ) toDelete.push(e);
        else if (p.posY < -PARAMS.global.limits && p.speedY < 0) toDelete.push(e);
        else if (p.posY > y + PARAMS.global.limits && p.speedY > 0) toDelete.push(e);
    }

    var numberDeleted = toDelete.length;
    for (var eid in toDelete) {
        particles.splice(toDelete[eid], 1);
    }

    newParticle(numberDeleted, "");
}

function getRandom(e, t) {
    return Math.random() * (e - t) + t
}

var canvas,
    context,
    particles = [],
    firstPass = true,
    request = false;

var particle = function (e, t, i, a, s) {
    this.posX = e;
    this.posY = t;
    this.speedX = i;
    this.speedY = a;
    this.size = s;
    this.time = 0;
};

var nbLinked = 0;
var user = {
    screenX: window.innerWidth,
    screenY: window.innerHeight,
    mouseX: 0,
    mouseY: 0
};

var PARAMS = {
    particles: {speed: {max: .1, min: -.1}, size: {max: .8, min: .1}, style: {color: "darkgoldenrod", opacity: 1}},
    lines: {enable: !0, color: "darkgoldenrod", opacity:.5, distance: 90},
    global: {particlesAtStart: 20, limits: 80, particlesMax: 50, mode: "normal", mobile: !1},
    events: {onclick: {nb: 3}},
    mobile: {speed: 2, size: 2, nb: 2, line_o: 2, line_d: 2}
};

function makeHighRes(c) {
    var ctx = c.getContext('2d');
    // various pixel ratios
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

    var ratio = Math.round(devicePixelRatio / backingStoreRatio);

    // rescale canvas
    var oldWidth = c.width;
    var oldHeight = c.height;
    c.width = Math.round(oldWidth * ratio);
    c.height = Math.round(oldHeight * ratio);
    c.style.width = oldWidth + 'px';
    c.style.height = oldHeight + 'px';
    ctx.scale(ratio, ratio);
}