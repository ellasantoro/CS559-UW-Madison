/*jshint esversion: 6 */
// @ts-check

// these two things are the main UI code for the train
// students learned about them in last week's workbook

import { draggablePoints } from "../libs/CS559/dragPoints.js";
import { RunCanvas } from "../libs/CS559/runCanvas.js";

// this is a utility that adds a checkbox to the page 
// useful for turning features on and off
import { makeCheckbox } from "../libs/CS559/inputHelpers.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let points = [
    [150, 150],
    [150, 450],
    [450, 450],
    [450, 150]
];
let smoke = []; //used to hold smoke particles (see below)
let totDist = 0; //total distance travelled along curve


/**
 * Initialization code - sets up the UI and start the train
 */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext("2d");

// we need the slider for the draw function, but we need the draw function
// to create the slider - so create a variable and we'll change it later
let slider; // = undefined;

// note: we wrap the draw call so we can pass the right arguments
//what even is wrapDraw
function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning
    draw(canvas, Number(slider.value) % points.length);

}
// create a UI
let runcanvas = new RunCanvas(canvas, wrapDraw);
runcanvas.setupSlider(0, points.length, 0.05); //here or no
// now we can connect the draw function correctly
slider = runcanvas.range;

// note: if you add these features, uncomment the lines for the checkboxes
// in your code, you can test if the checkbox is checked by something like:
// document.getElementById("check-simple-track").checked
// in your drawing code
// WARNING: makeCheckbox adds a "check-" to the id of the checkboxes
//
// lines to uncomment to make checkboxes
makeCheckbox("simple-track");
makeCheckbox("arc-length").checked = true;
//makeCheckbox("bspline");

// helper function - set the slider to have max = # of control points
function setNumPoints() {
    runcanvas.setupSlider(0, points.length, 0.05);
}

setNumPoints();
runcanvas.setValue(0);

// add the point dragging UI
draggablePoints(canvas, points, wrapDraw, 10, setNumPoints);

/**
 * Draw function - this is the meat of the operation
 * It's the main thing that needs to be changed
 * 
 * @param {HTMLCanvasElement} canvas - The canvas element on which to draw.
 * @param {number} param - The parameter indicating the position along the curve.
 */
function draw(canvas, param) {
    canvas.style.backgroundColor = "#8ba17f";
    let context = canvas.getContext("2d");
    //make sure to clear canvas after every frame:
    context?.clearRect(0, 0, canvas.width, canvas.height);
    let position = getPos(param); //position to help with position along the curve (see function)
    let tangentVector = getTangent(param); //tangent vector to help with orienting the train (see function)
    //draw trees using separate function (everything should be drawn on top of these)
    drawTree(context, 100, 100);
    drawTree(context, 500, 500);
    drawTree(context, 400, 400);
    drawTree(context, 500, 100);
    drawTree(context, 200, 300);
    drawTree(context, 50, 500);
    drawTree(context, 200, 300);
    drawTree(context, 350, 200);
    drawTree(context, 200, 300);
    drawTree(context, 300, 550);

    //draw the flowers for the scenery!
    drawFlower(context, 50, 50);
    drawFlower(context, 400, 80);
    drawFlower(context, 25, 400);
    drawFlower(context, 280, 300);
    drawFlower(context, 220, 560);
    drawFlower(context, 550, 450);
    drawFlower(context, 520, 250);

    //create the track using curves
    context.lineWidth = 3;
    context.strokeStyle = "#000000";
    context?.beginPath();
    //move to the first x,y pair to begin with
    context?.moveTo(points[0][0], points[0][1]);
    //iterate over each control point of the path so that we can create the
    //curve path (I used inspiration from my own WB5 code)
    for (let i = 0; i < points.length; i++) {
        //we must calculate indices of next control points, we also must use modular 
        //arithmetic since these curves are a cycle and they must wrap around to connect.
        let p0 = points[((i - 1) + points.length) % points.length];
        let p1 = points[i];
        let p2 = points[(i + 1) % points.length];
        let p3 = points[(i + 2) % points.length];
        //calculate our control points using our method and using the previously computed p0-p3.
        let cp1 = calcControlPoints(p0, p1, p2, p3)[0];
        let cp2 = calcControlPoints(p0, p1, p2, p3)[1];
        context?.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p2[0], p2[1]);
    }
    context?.closePath();
    context?.stroke();

    //ptDistList helps us to map the parameterized position on the curve to the actual distance travelled,
    //this is explained in my WB5, but we must use a separate function here because it was being overwritten 
    //when draw was being called so many times, it works essentially the same as WB5, just that it has to have a 
    //separate function to calculate it instead of calculating it in place.
    let ptDistList = getDistOfCurve();
    let seg = 0; //var to keep track of the current segment of the curve
    //draw the rail ties , makes sure to do so in 30 intervals and spaces them evenly.
    for (let i = 0; i < 30; i++) {
        let currCurveDist = (i * totDist / 30);
        //PLEASE NOTE: Lines 95 - 99 contain code from ChatGPT. The for loop was my own idea, but I 
        //needed help knowing how to deal with the segments. I have thoroughly explained what each part does
        //in the next few lines of code to demonstrate that I know what is happening.
        for (let j = 0; j < ptDistList.length; j++) {
            //if the current distance is greater than the cumulative distance, it falls after the start of curr segment,
            //and if the current distance is less than the cumulative distance, then it falls before the start of the next segment.
            //what this means is that if the current distance travelled is between these points, then we know this is the
            //segment we want to work with for drawing our rail tie. 
            if (currCurveDist > ptDistList[j] && currCurveDist < ptDistList[j + 1]) {
                seg = j;
            }
        }
        let ptDist = ptDistList[seg + 1] - ptDistList[seg]
        //the ratio of the distance travelled to the total distance of the segment
        let distRatio = (currCurveDist - ptDistList[seg]) / ptDist;
        //control point before p1
        let p0 = points[((seg - 1) + points.length) % points.length];
        //start and end points of the current segment:
        let p1 = points[seg];
        let p2 = points[(seg + 1) % points.length];
        //control point after p2
        let p3 = points[(seg + 2) % points.length];
        //calculate the control points using the previously defined points.
        let cp1 = calcControlPoints(p0, p1, p2, p3)[0];
        let cp2 = calcControlPoints(p0, p1, p2, p3)[1];
        //current position is determined by the cntrl points and the distance ratio
        let currPos = cubicBezierForm(p1, cp1, cp2, p2, distRatio);
        //calculate the tangent vector using the tangent function (see the function for a more
        //in depth explanation.)
        let tangentVector = tangent(distRatio, p1, cp1, cp2, p2);
        drawRailTies(currPos[0], currPos[1], tangentVector);
    }
    context?.closePath();
    context?.stroke();

    //draw the points we will use for dragging 
    context.fillStyle = "white";
    context.lineWidth = 6;
    points.forEach(function (pt) {
        context?.beginPath();
        context?.arc(pt[0], pt[1], 7, 0, Math.PI * 2);
        context?.closePath();
        context?.stroke();
        context?.fill();
    });
    drawTrain(context, position[0], position[1], tangentVector);
}

/**
 * a function to draw a flower at a given point on the canvas (scenery)
 * 
 * @param {*} context 
 * @param {*} x 
 * @param {*} y 
 */
function drawFlower(context, x, y) {
    //draw the petals:
    context.beginPath();
    context.fillStyle = "white";
    context.ellipse(x - 6, y, 4.5, 4.5, 0, 0, 2 * Math.PI);
    context.ellipse(x - 4, y - 5, 4.5, 4.5, 0, 0, 2 * Math.PI);
    context.ellipse(x, y - 6, 4.5, 4.5, 0, 0, 2 * Math.PI);
    context.ellipse(x + 5, y - 3, 4.5, 4.5, 0, 0, 2 * Math.PI);
    context.ellipse(x + 6, y, 4.5, 4.5, 0, 0, 2 * Math.PI);
    context.ellipse(x + 4, y + 3, 4.5, 4.5, 0, 0, 2 * Math.PI);
    context.ellipse(x + 2, y + 5, 4.5, 4.5, 0, 0, 2 * Math.PI);
    context.ellipse(x - 4, y + 4, 4.5, 4.5, 0, 0, 2 * Math.PI);
    context.closePath();
    context.fill();

    //draw the center of flower:
    context.fillStyle = "#f2cf6f";
    context.beginPath();
    context.ellipse(x, y, 4, 4, 0, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

/**
 * a function to draw a tree at a given point on the canvas (scenery)
 * 
 * @param {*} context 
 * @param {*} x 
 * @param {*} y 
 */
function drawTree(context, x, y) {
    //draw the trunk:
    context.fillStyle = "#3d2e27";
    context.fillRect(x - 5, y, 10, 36);

    //draw the top half of the tree:
    context.fillStyle = "#0a2108";
    context.beginPath();
    context.moveTo(x, y - 40);
    context.lineTo(x + 20, y);
    context.lineTo(x - 20, y);
    context.closePath();
    context.fill();

    //draw the bottom half of the tree:
    context.fillStyle = "#0a2108";
    context.beginPath();
    context.moveTo(x, y - 20);
    context.lineTo(x + 20, y + 20);
    context.lineTo(x - 20, y + 20);
    context.closePath();
    context.fill();
}
/**
 * the function to draw the train on the canvas using a tangent vector to make the train turn
 * as it travels along the curve.
 * 
 * @param {*} context 
 * @param {*} x 
 * @param {*} y 
 * @param {*} tangentVector 
 */
function drawTrain(context, x, y, tangentVector) {
    let angle = Math.atan2(tangentVector[1], tangentVector[0]);
    //use save translate and rotate to ensure we can move the train and orient it properly around the track
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    
    //draw the top half of the train
    context.fillStyle = "#5d5e5e";
    context.beginPath();
    context.arc(39, -3, 15, -Math.PI / 2, Math.PI / 2);
    context.closePath();
    context.fill();

    //draw the wheels:
    context.fillStyle = "#494a4a";
    context.beginPath();
    context.ellipse(30, -16, 7, 7, 0, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.fillStyle = "#494a4a";
    context.beginPath();
    context.ellipse(30, 10, 7, 7, 0, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.fillStyle = "#494a4a";
    context.beginPath();
    context.ellipse(-5, -16, 7, 7, 0, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.fillStyle = "#494a4a";
    context.beginPath();
    context.ellipse(-5, 10, 7, 7, 0, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    //draw the body of the train:
    context.fillStyle = "grey";
    context.fillRect(-20, -18, 60, 30);

    //draw the train's exhaust (where the smoke comes from)
    context.fillStyle = "#494a4a";
    context.beginPath();
    context.ellipse(20, -3, 6, 6, 0, 0, Math.PI * 2);
    context.closePath();
    context.lineWidth = 2;
    context.stroke();
    context.fill();
    context.restore();
    context.save();
    //PLEASE NOTE: I used reference to the smoke particles used in the third train example.
    //I have changed it, as well as added comments to ensure I know how it works.
    //add the smoke particles to the list, then draw the smoke
    smoke.push([x, y, 15]);
    context.fillStyle = "lightgray";
    //use a global alpha value to control transparency of the smoke (a global alpha are numbers 
    //that fall between 0.0 and 1.0, 0 being most transparent. It makes it easier to calculate opacities
    //for stuff like this!)
    context.globalAlpha = 0.25;
    //this is a list that is used to store the smoke particles that have not faded away yet, it
    //helps us to keep track of which smoke particles are active, and which arent, and will help us to
    //manage how long we want a smoke particle to "live" for. 
    let remainingSmoke = [];
    //we want to draw every smoke particle, so we use a for each loop
    smoke.forEach(function (smokeParticle) {
        //index 2 represents the radius of the smoke particle, and if the radius is 0 that means
        //that the smoke particle is not active any longer. so if it is greater than 0, we know that
        //the particle SHOULD be drawn (since it is active).
        if (smokeParticle[2] > 0) {
            //now we actually draw the particle. the first two elements of the list are x and y and the
            //third elemnt is the radius, so we can simply pass them into arc in that order!!
            context.beginPath();
            context.arc(smokeParticle[0], smokeParticle[1], smokeParticle[2], 0, Math.PI * 2);
            context.fill();
            //we want to now decrease the radius. we want to do this so that the particles will
            //fade out and die over time. eventually this will reach 0 and as we saw above, when it reaches 0 it
            //will be considered inactive and wont be drawn.
            smokeParticle[2]--;
            //lastly, we want to ensure that the new smoke particle (aka the one we just decremented by 1 is
            //added, otherwise we wouldnt ever actually upate it).
            remainingSmoke.push(smokeParticle);
        }
    });
    //update the smoke array with the new contents (this helps us animate it).
    smoke = remainingSmoke;
    context.restore();
}

/**
 * function to actually draw the ellipses (20 dots) along the curve. x and y will
 * be passed into this function based on how far along we are on the curve.
 * (this is (partially) from my WB5 (see "drawPointsOnCurve"))
 * 
 * @param {*} x 
 * @param {*} y 
 */
function drawRailTies(x, y, tangentVector) {
    //use the tangent vector to orient the train properly on the track using atan2
    let angle = Math.atan2(tangentVector[1], tangentVector[0]);
    context.fillStyle = "black";
    context?.save();
    context?.translate(x, y);
    //use the tangent vectors angle to rotate
    context?.rotate(angle);
    context?.fillRect(-15, -15, 10, 30);

    context?.restore();
}

/**
 * function to calculate the two control points that will be used in drawing the
 * bezier curve ; calculated using CP1 = p1 + (p2-p0) / 6 and CP2 = p2 - (p3-p1) / 6
 * (this is from my WB5)
 * 
 * @param {*} p0 
 * @param {*} p1 
 * @param {*} p2 
 * @param {*} p3 
 * @returns control point 1 and 2
 */
function calcControlPoints(p0, p1, p2, p3) {
    //console.log(p1);
    let cp1 = [
        p1[0] + (p2[0] - p0[0]) / 6,
        p1[1] + (p2[1] - p0[1]) / 6
    ];
    let cp2 = [
        p2[0] - (p3[0] - p1[0]) / 6,
        p2[1] - (p3[1] - p1[1]) / 6
    ];
    return [cp1, cp2];
}

/**
 * helper function to get the relative position of a point along the curve (used for drawing). this helps with position, while
 * the getTangent function helps moreso with orientation.
 * 
 * @param {*} param parameter representing the position along the curve
 */
function getPos(param) {
    let positionIndex = Math.floor(param);
    //get the relative position within the segment
    let interpolation = param - positionIndex;
    ///calculate p0-p3: use calcControlPoints to do so.
    let p0 = points[positionIndex];
    let p1 = calcControlPoints(points[(positionIndex - 1 + points.length) % points.length], points[positionIndex], points[(positionIndex + 1) % points.length], points[(positionIndex + 2) % points.length])[0];
    let p2 = calcControlPoints(points[(positionIndex - 1 + points.length) % points.length], points[positionIndex], points[(positionIndex + 1) % points.length], points[(positionIndex + 2) % points.length])[1];
    let p3 = points[(positionIndex + 1) % points.length];
    return cubicBezierForm(p0, p1, p2, p3, interpolation);
}

/**
 * helper function to return the tangent vector at a specific point on the curve. this helps with orientation, while
 * the getPos function helps moreso with position
 * 
 * @param {*} param
 * @returns {*}
 */
function getTangent(param) {
    let index = Math.floor(param);
    let t = param - index;
    let p0 = points[index];
    let p1 = calcControlPoints(points[(index - 1 + points.length) % points.length], points[index], points[(index + 1) % points.length], points[(index + 2) % points.length])[0];
    let p2 = calcControlPoints(points[(index - 1 + points.length) % points.length], points[index], points[(index + 1) % points.length], points[(index + 2) % points.length])[1];
    let p3 = points[(index + 1) % points.length];
    return tangent(t, p0, p1, p2, p3);
}

/**
 * this function is used to calculate the position of a point along the cubic Bezier curve
 * although the code is not generated by chatGPT, when prompted which form / equation I should
 * use for calculating how far along on the curve we are, chatGPT provided that I should use
 * the cubic Bezier form which is what this function uses. (https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion/)
 * (this is from my WB5)
 * 
 * @param {*} p1 
 * @param {*} cp1 
 * @param {*} cp2 
 * @param {*} p2 
 * @param {*} t 
 * @returns the position of the point along the cubic bezier curve at given t
 */
function cubicBezierForm(p1, cp1, cp2, p2, t) {
    let x = Math.pow(1 - t, 3) * p1[0] + 3 * Math.pow(1 - t, 2) * t * cp1[0] + 3 * (1 - t) * t * t * cp2[0] + Math.pow(t, 3) * p2[0];
    let y = Math.pow(1 - t, 3) * p1[1] + 3 * Math.pow(1 - t, 2) * t * cp1[1] + 3 * (1 - t) * t * t * cp2[1] + Math.pow(t, 3) * p2[1];
    return [x, y];
}

/**
 * a function to determine how far alone we are on the curve.
 * 
 * @returns {number[]} list of all the distances
 */
function getDistOfCurve() {
    let step = 0.001;
    //list to store the distances along the curve
    let ptDistList = [0];
    totDist = 0;
    //loop through control points so we can computer the bezier curve specifically at those points
    for (let i = 0; i < points.length; i++) {
        let p0 = points[((i - 1) + points.length) % points.length];
        let p1 = points[i];
        let p2 = points[(i + 1) % points.length];
        let p3 = points[(i + 2) % points.length];
        let prevPoint;
        let ptDist = 0;
        //determine how far along on the curve we are
        for (let j = 0; j <= 1; j += step) {
            let point = cubicBezierForm(p1, calcControlPoints(p0, p1, p2, p3)[0], calcControlPoints(p0, p1, p2, p3)[1], p2, j);
            if (prevPoint != null) {
                //actually calculate thed distance, and we will eventually use this data to add to our list of cumulative distances
                ptDist += Math.sqrt(Math.pow(point[0] - prevPoint[0], 2) + Math.pow(point[1] - prevPoint[1], 2));
            }
            prevPoint = point;
        }
        //add to the total, which makes the current distance we have a cumulative distance, then add this to the list.
        ptDistList.push(ptDist + totDist);
        totDist += ptDist;
    }
    return ptDistList;
}

/**
 * a function to calculate the tangent vector given how far along we are on the curve (parameter t)
 * 
 * @param {*} t 
 * @param {*} p1 
 * @param {*} cp1 
 * @param {*} cp2 
 * @param {*} p2 
 * @returns 
 */
function tangent(t, p1, cp1, cp2, p2) {
    //essentially just the derivative of cubicBezierForm
    let dx = -3 * Math.pow(1 - t, 2) * p1[0] + 3 * (1 - 4 * t + 3 * t * t) * cp1[0] + 3 * (2 * t - 3 * t * t) * cp2[0] + 3 * t * t * p2[0];
    let dy = -3 * Math.pow(1 - t, 2) * p1[1] + 3 * (1 - 4 * t + 3 * t * t) * cp1[1] + 3 * (2 * t - 3 * t * t) * cp2[1] + 3 * t * t * p2[1];
    return [dx, dy];
}
