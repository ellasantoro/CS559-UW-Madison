// @ts-check
export { };

let dots = [];
/*
NOTE: SOME CODE FROM BOX 6.5 WAS USED TO CREATE THIS.
*/

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box1canvas"));
let context = canvas.getContext('2d');

let mouseX = -10;
let mouseY = -10;

canvas.onmousemove = function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    mouseX -= box.left;
    mouseY -= box.top;

};

canvas.onmouseleave = function () {
    mouseX = -10;
    mouseY = -10;
};

canvas.onclick = function () {
    let mouseOver = false;
    dots.forEach(function (dot) {
        if (distance(dot.x, dot.y, mouseX, mouseY) < 10) {
            mouseOver = true;
            dot.clicked = true;
        }
    });

    if ((mouseX > 0) && (mouseY > 0) && !mouseOver) {
        dots.push({ "x": mouseX, "y": mouseY, "clicked": false });
    }
}
function box2animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    
    dots.forEach(function (dot) {
        context.fillStyle = "blue";
        if (distance(dot.x, dot.y, mouseX, mouseY) < 10 && dot.clicked == true) {
            context.fillStyle = "#8ed17d";
        } else if (distance(dot.x, dot.y, mouseX, mouseY) < 10 && dot.clicked != true) {
            context.fillStyle = "#7dd1c9";
        } else if (distance(dot.x, dot.y, mouseX, mouseY) >= 10 && dot.clicked == true) {
            context.fillStyle = "#7d9ad1";
        } else {
            context.fillStyle = "#e2a6e3";
        }
        context?.beginPath();
        context?.ellipse(dot.x, dot.y, 10, 10, 0, 0, Math.PI * 2);
        context?.fill();
        context?.closePath();
    });
    window.requestAnimationFrame(box2animate);
}
box2animate();

function distance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

