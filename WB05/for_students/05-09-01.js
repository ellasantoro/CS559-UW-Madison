// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// recreate the picture from SVG - but don't use quadratics

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");
context.fillStyle = "lightgrey";
context.strokeStyle = "black";
context.lineWidth = 5;

context?.moveTo(150,100);
context?.bezierCurveTo(450/3, 350/3, 400/3, 450/3, 100, 150);
context?.bezierCurveTo(250/3,450/3,150/3,400/3,50,100);
context?.bezierCurveTo(150/3, 250/3, 200/3, 150/3, 100,50);
context?.bezierCurveTo(300/3,200/3,350/3, 300/3, 150, 100);
context.closePath();
context?.fill();
context?.stroke();