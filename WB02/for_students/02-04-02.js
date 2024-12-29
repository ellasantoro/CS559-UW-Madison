let canvas = document.getElementById('canvas1');
let context = canvas.getContext('2d');

context.beginPath();
context.fillStyle = "green";
context.moveTo((canvas.width / 2 ) - 80, (canvas.height / 2) - 20);
context.lineTo((canvas.width / 2 ) - 50, (canvas.height / 2) - 150);
context.lineTo((canvas.width / 2 ) - 30, (canvas.height / 2) - 20);
context.lineTo((canvas.width / 2 ) - 0, (canvas.height / 2) - 150);
context.lineTo((canvas.width / 2 ) + 30, (canvas.height / 2) - 20);
context.lineTo((canvas.width / 2 ) + 60, (canvas.height / 2) - 150);
context.lineTo((canvas.width / 2 ) + 90, (canvas.height / 2) - 20);
context.lineTo((canvas.width / 2 ) - 80, (canvas.height / 2) - 20);
context.fill();

context.beginPath();
context.fillStyle = "red";
context.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
context.fill();

context.strokeStyle = "red";
context.fillStyle = "red";
context.moveTo((canvas.width / 2 ) - 100, (canvas.height / 2) - 15);
context.lineTo(canvas.width / 2 - 25, (canvas.height / 2) + 150);
context.lineTo(canvas.width / 2 + 25, (canvas.height / 2) + 150);
context.lineTo((canvas.width / 2 ) + 100, (canvas.height / 2) - 15);
context.lineTo((canvas.width / 2 ) - 100, (canvas.height / 2) - 15);
context.stroke();
context.fill();

context.fillStyle = "red";
context.beginPath();
context.arc(canvas.width / 2, (canvas.height / 2) + 150 , 26, 0, 2 * Math.PI);
context.fill();

context.beginPath();
context.fillStyle = `rgba(0,0,0,0.5)`;
context.arc(canvas.width / 2 - 50, canvas.height / 2, 5, 0, 2 * Math.PI);
context.fill();

context.beginPath();
context.fillStyle = `rgba(0,0,0,0.5)`;
context.arc(canvas.width / 2 + 20, canvas.height / 2 - 20, 5, 0, 2 * Math.PI);
context.fill();
context.beginPath();

context.fillStyle = `rgba(0,0,0,0.5)`;
context.arc(canvas.width / 2 + 90, canvas.height / 2 + 6, 5, 0, 2 * Math.PI);
context.fill();

context.beginPath();
context.fillStyle = `rgba(0,0,0,0.5)`;
context.arc(canvas.width / 2 - 30, canvas.height / 2 + 80, 5, 0, 2 * Math.PI);
context.fill();

context.beginPath();
context.fillStyle = `rgba(0,0,0,0.5)`;
context.arc(canvas.width / 2 + 40, canvas.height / 2 + 50, 5, 0, 2 * Math.PI);
context.fill();

context.beginPath();
context.fillStyle = `rgba(0,0,0,0.5)`;
context.arc(canvas.width / 2 + 25, canvas.height / 2 + 100, 5, 0, 2 * Math.PI);
context.fill();

context.beginPath();
context.fillStyle = `rgba(0,0,0,0.5)`;
context.arc(canvas.width / 2 -38, (canvas.height / 2) - 50, 5, 0, 2 * Math.PI);
context.fill();
//sorry this was supposed to be a strawberry but I ran out of time.