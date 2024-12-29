/**
 * CS559 Spring 2023 Example Solution
 * Written by CS559 course staff
 */

// @ts-check
/* jshint -W069, esversion:6 */

import { runCanvas } from "../libs/CS559/runCanvas.js";

/* no need for onload - we use defer */

/* note how the draw function takes two arguments: the canvas and the time */
/* note that this is DIFFERENT than what we need for requestAnimationFrame */

/**
 * These parameter specifications are used by the type checker to find bugs!
 * @param {HTMLCanvasElement} canvas 
 * @param {Number} time 
 */
function myDraw(canvas, time) {
    // student should fill this in
    let context = canvas.getContext('2d');
    context?.clearRect(0,0,canvas.width, canvas.height);

    context?.save();
    context.beginPath();
    context?.translate(100,100);
    context?.rotate(time * Math.PI * 2);
    context.fillStyle = "#436942";
    context?.ellipse(0,0,25,45,0,0,Math.PI * 2);
    context?.closePath();
    context?.fill();
    context?.restore();

}

// note - we can pass "runCanvas" either the name of the canvas, or the canvas element
runCanvas("canvas1",myDraw, 0, 0, 0, 2);
//enter anything for the params between myDraw and min, max (just entered 2 zeros as placeholders), then add 0 for min and 2 for max
