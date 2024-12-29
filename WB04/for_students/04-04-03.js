/**
 * 04-04-03.js - a simple JavaScript file that gets loaded with
 * page 4 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as utilities from "./04-04-utilities.js";

/**
 * TwoDots - a function for the student to write
 * Notice that it gets the two points and the context as arguments
 * This function should apply a transformation
 *
 * This should perform some transformation - you can decide how it works
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots(context, x1, y1, x2, y2) {
    let angle = Math.atan2(y2 - y1, x2 - x1);
    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    //took the original code I made from box 1 and 2, and then noticed it needed to be
    //rotated 45 degrees in order for it to match up with the colors. after doing so, I 
    //knew that it needed to be scaled, so I added a higher denominator for the scalar. 
    //the actual number (14) was decided from visual input. the rest of the code was left
    //unchanged so it works as anticipated.
    let a = Math.cos(angle - Math.PI / 4) * distance / 14;
    let b = Math.sin(angle - Math.PI / 4) * distance / 14;
    let c = -Math.sin(angle - Math.PI / 4) * distance / 14;
    let d = Math.cos(angle - Math.PI / 4) * distance / 14;
    let e = x1;
    let f = y1;
    // please leave this line - you should CHANGE the 6 lines above. Add additonal math/logic code as needed.
    context.transform(a, b, c, d, e, f);
}

// start the program running
utilities.setup("canvas1", twoDots);

