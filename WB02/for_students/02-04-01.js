// @ts-check
export {};
// JavaScript file to be filled in by the student for Box 4-1
// we'll give you something to get started...
/** @type {HTMLCanvasElement} */
let canvas1 = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context1 = canvas1.getContext('2d');
//SHAPE #1:
context1.fillStyle = "#F8E";
context1.strokeStyle = "#846";
context1.lineWidth = 5;

context1.beginPath();
context1.arc(50, 50, 25, 0, 2 * Math.PI);
context1.fill();
context1.stroke();

//SHAPE 2
context1.fillStyle = "pink";
context1.strokeStyle = "darkred";
context1.beginPath();

context1.ellipse(130, 50, 30, 27, 0, Math.PI * 0.5, Math.PI * 1.5);
context1.ellipse(170, 50, 30, 27, 0, -Math.PI * 0.5, -Math.PI * 1.5);
context1.fill();

context1.strokeStyle = "none";
context1.stroke();

context1.strokeStyle = "darkred";
context1.beginPath();
context1.moveTo(130,77);
context1.lineTo(170,77);
context1.stroke();

//SHAPE 3
context1.strokeStyle = "darkgoldenrod";
context1.fillStyle = "sandybrown";
context1.lineWidth = 10;
context1.beginPath();
context1.moveTo(25,150);
context1.lineTo(75,150);
context1.lineTo(50, 110);
context1.closePath();
context1.stroke();
context1.fill();

//SHAPE 4
context1.strokeStyle = "black";
context1.fillStyle = "gray";
context1.lineWidth = 10;
context1.beginPath();
context1?.moveTo(100,150);
context1?.lineTo(200, 150);
context1?.lineTo(200, 125);
context1?.lineTo(175, 100);
context1?.lineTo(150,125);
context1?.lineTo(125,100);
context1?.lineTo(100,125);
context1?.lineTo(100,155);
context1?.closePath();
context1?.stroke();
context1?.fill();

