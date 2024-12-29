/*
* NOTE: I forgot to source my work on this page, the following sources were used:
* - https://stackoverflow.com/questions/54350941/distance-between-2-locations-method
* - https://stackoverflow.com/questions/60367198/how-to-detect-when-mouse-is-outside-of-a-certain-circle
* - https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
* - along with code from other pages in this workbook.
* PLEASE NOTE THAT THIS COMMENT WAS MADE 12 MINUTES PAST THE DEADLINE - all code was completed and submitted before due
* due date, and I am adding this comment post-project due date to site my sources.
* 
*/
// @ts-check
export { };

let fireworks = [];
let flames = [];

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas"));
let context = canvas.getContext('2d');
let mouseX = -10;
let mouseY = -10;
canvas.style.backgroundColor = "#111529";

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

//everytime a user clicks, a new firework will be pushed onto the list
canvas.onclick = function () {
    if ((mouseX > 0) && (mouseY > 0)) {
        let red = Math.random() * 255;
        let blue = Math.random() * 255;
        let green = Math.random() * 255;
        fireworks.push({ "x": mouseX, "y": canvas.height, "toY": mouseY, "color":`${red},${blue}, ${green}`});
    }
}
function box2animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    //create new fireworks, this will not be based on user input but rather are randomized fireworks with random x and y.
    if(Math.floor(Math.random() * 110) == 0){
        let randX = Math.random() * canvas.width;
        let randY = Math.random() * canvas.height;
        let red = Math.random() * 255;
        let blue = Math.random() * 255;
        let green = Math.random() * 255;
        fireworks.push({ "x": randX, "y": canvas.height, "toY": randY, "color":`${red},${blue}, ${green}`});
    }

    //create a different color for each firework
    fireworks.forEach(function (firework, index) {
        firework.y-=4;
        context.fillStyle = `rgb(${firework.color})`;
        context?.beginPath();
        context?.ellipse(firework.x, firework.y, 5, 5, 0, 0, Math.PI * 2);
        context?.fill();
        context?.closePath();

        //splice the firework from the list once we reach the y target (where the mouse was clicked)
        if (firework.y <= firework.toY) {
            fireworks.splice(index,1);

            //create 20 flames per firework
            for (let i = 0; i <= 20; i++) {
                //randomize colors using Math.Random up to 255 (since rgb)
                let red = Math.random() * 255;
                let blue = Math.random() * 255;
                let green = Math.random() * 255;
                flames.push({ "x": firework.x, "y": firework.y, "dx": (Math.random() - 0.45) * 5 , "dy": (Math.random() - 0.45) * 5, "transparency": 1, "color":`${red},${blue}, ${green}` });
            }
        }



    });
    //create velocities and transparencies as well as using the randomized colors as before for each flame
    flames.forEach(function (flame) {
        flame.x += flame.dx;
        flame.y += flame.dy;
        flame.transparency -= 0.01;
        flame.dy += 0.08;
        context?.beginPath();
        context.fillStyle = `rgba(${flame.color}, ${flame.transparency})`;
        context?.fillRect(flame.x, flame.y, 5, 5);
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

