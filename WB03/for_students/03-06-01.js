// @ts-check
export { };

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext("2d");
canvas.style.backgroundColor = "#2c2f42";
//dimensions of the propellers:
const propLength = 50;
const propThickness = 6;
const smallPropThickness = 4;
const smallPropLength = 25;

//defining the center x and y of the canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

//angle at which the copter flies, it will be updated
let angle = 0;

//on first iteration, the current X and Y are just 0 (will be updated)
let currX = 0;
let currY = 0;

let headlightOpacity = 0;
let userSpeed = 0.05; //the speed at which the copter will go when the user is interacting

/**
 * This function works as the main animation method, it is a continuous loop that calls itself.
 * It is responsible for continuously drawing the helicopter in updated positions
 * using the timestamp argument given by the browser.
 * 
 * @param {*} timestamp
 */
function loop(timestamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    update();
    //new x & y positions ; uses cos & sin to create circular motion
    //100 creates the radius of the circlular path the copter travels
    const x = centerX + Math.cos(angle) * 150;
    const y = centerY + Math.sin(angle) * 150;
    //create speed by calculation the difference of the new x position in relation to the current x position
    const dx = x - currX;
    const dy = y - currY;
    //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2 :
    const copterAngle = Math.atan2(dy, dx) + Math.PI / 2;
    //draw the helicopter, then update current positions & angle (circular motion)
    drawHelicopter(x, y, copterAngle, timestamp);
    currX = x;
    currY = y;
    angle += 0.01;

    //continuously call the loop (animation)
    window.requestAnimationFrame(loop);
}

/**
 * 
 * This function draws the propellers/arms (and calls the drawSmallPropeller method),
 * and the propellers move with the helicopter since they are attached. these propellers
 * do not spin.
 * 
 * @param {*} currentTime 
 * @param {*} i 
 */
function drawPropeller(currentTime, i) {
    //const propAngle = currentTime * (Math.PI / 3) + ((Math.PI / 2) * i);
    context.save();
    //context.rotate(propAngle); 
    context.fillStyle = "#6c876c";
    //taken from the windmill box of this workbook
    context?.rotate(Math.PI / 4);
    context.fillRect(0 - 4, 0 - 4, propLength, propThickness);
    //context.fillRect(-propThickness / 2, -propLength / 2, propThickness, propLength); 

    //each propeller should have smaller propellers on it
    drawSmallPropeller(-currentTime + (Math.PI / 2) * i);
    context.restore();

}

/**
 * This function draws the small propellers that continuously spin. We are passed in an angle from
 * the drawPropeller method, whic is used to update how these propellers spin
 * 
 * @param {*} angle 
 */
function drawSmallPropeller(angle) {
    //draws the circles holding the propellers
    context.save();
    context.translate(propLength - 6, propThickness - 6);
    context.strokeStyle = "#6c876c";
    context.beginPath();
    context.arc(0, 0, smallPropLength / 2 + 2, 0, Math.PI * 2);
    context.stroke();
    context.closePath();

    //draws the actual proepellers:
    context.rotate(angle);
    context.fillStyle = "#6c876c";
    context.fillRect(-smallPropLength / 2, -smallPropThickness / 2, smallPropLength, smallPropThickness);
    context.fillRect(-smallPropThickness / 2, -smallPropLength / 2, smallPropThickness, smallPropLength);
    context.restore();
}

/**
 * This function draws the helicopter (body, designs, and other elements). we use 
 * save, restore, translate, and rotate to achieve this angular rotation. 
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} copterAngle 
 * @param {*} timestamp 
 */
function drawHelicopter(x, y, copterAngle, timestamp) {
    context?.save();
    context?.translate(x, y);
    context?.rotate(copterAngle);

    //draw the tail
    context.fillStyle = `rgba(255,255,255,0.3)`;
    context?.beginPath();
    context?.moveTo(30, 60);
    context?.lineTo(0, -20);
    context?.lineTo(-30, 60);
    context?.lineTo(-10, 40);
    context?.lineTo(0, 30);
    context?.lineTo(10, 40);
    context?.fill();
    context?.closePath();

    //draw the headlight (use oscillating headlight opacity - the idea of using Math.sin was taken from
    //chat gpt) - this line of code makes it so that it oscillates between 0 and 0.5
    headlightOpacity = 0.25 * Math.sin(timestamp / 500) + 0.25;
    context.fillStyle = `rgba(237, 202, 85, ${headlightOpacity})`;
    context?.beginPath();
    context?.moveTo(-16, -35);
    context?.lineTo(-5, -75);
    context?.lineTo(5, -75);
    context?.lineTo(16, -35);
    context?.closePath();
    context?.fill();

    //draw the quadcopter body
    context.fillStyle = "#4b6e4b";
    context?.beginPath();
    context?.ellipse(0, 0, 25, 50, 0, 0, 2 * Math.PI);
    context?.fill();

    //draw squares on the sides of the copter (for aesthetic purposes)
    context.fillStyle = "#2d3b2c";
    context?.fillRect(-25, -5 / 2, 5, 10);
    context?.fillRect(20, -5 / 2, 5, 10);

    //draw the front window
    context.fillStyle = `rgba(255,255,255,0.3)`;
    context?.fillRect(-10, -50, 20, 20);
    context?.closePath();

    //draw 4 propellers (smaller propellers are also drawn when this is done)
    for (let i = 0; i < 4; i++) {
        context?.rotate(Math.PI / 2);
        drawPropeller(timestamp, i);
    }
    context?.restore();
}
//call the loop for the first time:
window.requestAnimationFrame(loop);

//USER KEY PRESS HANDLING (right and left arrow keys only)
//keydown and keyup refers to the key being pressed and released (not up and down arrow keys)
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

//from here until line 197 (NOT INCLUDING COMMENTS) had chatGPT influence.
let keysPressed = {
    ArrowLeft: false,
    ArrowRight: false

};

/**
 * This function helpts to handle the keyDown (pressed key) event by
 * setting the appropriate field to true
 * 
 * @param {*} event 
 */
function handleKeyDown(event) {
    keysPressed[event.key] = true;
}

/**
 * This function helpts to handle the keyDown (pressed key) event by
 * setting the appropriate field to false
 * 
 * @param {*} event 
 */
function handleKeyUp(event) {
    keysPressed[event.key] = false;
}

/**
 * this function updates the angle upon key press, which will be used in the recurring loop.
 * this function is continuously called by loop so we are constantly updating if the key is
 * pressed
 */
function update() {
    if (keysPressed.ArrowLeft) {
        angle -= userSpeed;
    }
    if (keysPressed.ArrowRight) {
        angle += userSpeed;
    }
}
