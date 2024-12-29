// @ts-check
/* jshint -W069, esversion:6 */

import { draggablePoints } from "../libs/CS559/dragPoints.js";

/**
 * drawing function for box 2
 *
 * Use this UI code!
 **/

/* no need for onload - we use defer */


let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

let thePoints = [
    [140, 100],
    [200, 100],
    [225, 150],
    [200, 200],
    [140, 200],
    [115, 150]
];

/**
 * the draw function - which the student will fill in - takes a 
 * timestamp parameter, because it will be passed to requestAnimationFrame
 * 
 * However, in most cases, you can ignore the timestamp
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */
function draw(timestamp) {
    // in 2023 we accidentally gave students part of the example code
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(thePoints[0][0], thePoints[0][1]);
    for (let i = 1; i < thePoints.length; i++) {
        context.lineTo(thePoints[i][0], thePoints[i][1]);
    }
    context.closePath();
    context.lineWidth = 2;
    context.stroke();

    for (let i = 0; i < thePoints.length; i++) {
        context.beginPath();
        context.arc(thePoints[i][0], thePoints[i][1], 5, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
}

draggablePoints(canvas, thePoints, draw);

// draw things when everything is ready
window.requestAnimationFrame(draw);

