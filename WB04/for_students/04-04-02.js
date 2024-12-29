/**
 * 04-04-02.js - a simple JavaScript file that gets loaded with
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
 * You must write this function using transform.
 * There should not be any rotate, translate or scale function calls.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots(context, x1, y1, x2, y2) {
    /* Code from last box that I am using for reference:
    let angle = Math.atan2(y2 - y1, x2 - x1);
    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    context.translate(x1, y1);
    context.rotate(angle);
    context.scale(distance / 10, distance / 10);
    
   Multiply translation matrix by rotation matrix, plug in the angle variable for
   theta, then you also must account for the scaling, so multiply by distance/10, since 
   thats what worked in the original code ( see above ). after doing all of these multiplications,
   the matrix looks as follows:

   distance/10 * cos(theta)    distance/10 * -sin(theta)     x1
   disance/10 * sin(theta)     distance/10 * cos(theta)      y1

   where theta is equal to the angle, Math.atan2(y2-y1, x2-x1);

   */
    let angle = Math.atan2(y2 - y1, x2 - x1);
    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    let a = Math.cos(angle) * distance / 10;
    let b = Math.sin(angle) * distance / 10;
    let c = -Math.sin(angle) * distance / 10;
    let d = Math.cos(angle) * distance / 10;
    let e = x1;
    let f = y1;
    // please leave this line - you should CHANGE the 6 lines above. Add additional math/logic code as needed.
    context.transform(a, b, c, d, e, f);
}


// setup and start the program
utilities.setup("canvas1", twoDots, "black");

