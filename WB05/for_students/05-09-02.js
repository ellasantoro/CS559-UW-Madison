// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// draw a picture using curves!

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");


let context = canvas.getContext("2d");
context.strokeStyle = "black";
context.lineWidth = 6;

context.fillStyle = "#705948";
context.strokeStyle = "#3b2d23";
context?.beginPath();
context?.ellipse(200,110,49, 45, 0, 2*Math.PI, 0);
context?.closePath();
context?.stroke();
context?.fill();

context.fillStyle = "#edbed2";
context.strokeStyle = "#b37891";
context?.beginPath();
context?.ellipse(200,160,49, 45, 0, 2*Math.PI, 0);
context?.closePath();
context?.stroke();
context?.fill();

context.lineWidth = 1;
context.fillStyle = "#9c3028";
context?.beginPath();
context?.ellipse(200, 60, 10, 10, 0, 2*Math.PI, 0);
context?.closePath();
context?.fill();
context?.stroke();

context.strokeStyle = "green";
context.lineWidth = 3;
context?.beginPath();
context?.moveTo(200,50);
context?.bezierCurveTo(203,42,203,33,210,40);
context?.stroke();

context.lineWidth = 6;
context.fillStyle = "#d4be7d";
context.strokeStyle = "#82754d";
context?.beginPath();
context?.moveTo(160, 200);
context?.bezierCurveTo(171,273,206,300,230,230);
context?.bezierCurveTo(254, 160, 245, 193, 220, 180);
context?.bezierCurveTo(195, 167, 133, 193, 160, 200);
context?.closePath();
context.stroke();
context?.fill();




/*
context?.moveTo(160, 200);
context?.bezierCurveTo(515/3,820/3,620/3,900/3,230,200);
context?.bezierCurveTo(730/3, 580/3, 735/3, 580/3, 195, 180);
context?.bezierCurveTo(510/3, 580/3, 400/3, 580/3, 160, 200);
context.stroke();
*/
