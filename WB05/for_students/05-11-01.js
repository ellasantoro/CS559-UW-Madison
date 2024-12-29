// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// draw the spiral - account for the checkbox and slider

/** @type {HTMLCanvasElement} */ const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

/** @type {HTMLInputElement} */ const slider = /** @type {HTMLInputElement} */ (document.getElementById("slider"));
/** @type {HTMLInputElement} */ const checkbox = /** @type {HTMLInputElement} */ (document.getElementById("check"));

/**
 * function to draw the spiral (using dots or lines depending on user input through checkbox)
 */
function drawSpiral() {
    context.clearRect(0, 0, canvas.width, canvas.height);


    context.beginPath();
    for (let i = 0; i <= parseInt(slider.value); i++) {
        let u = i / parseInt(slider.value);
        //draw lines if the checkbox is checked
        if (checkbox.checked) {
            if (i == 0) {
                context.moveTo((200 + u * 180 * Math.cos(2 * Math.PI * 4 * u)), (200 + u * 180 * Math.sin(2 * Math.PI * 4 * u)));
            } else {
                context.lineTo((200 + u * 180 * Math.cos(2 * Math.PI * 4 * u)), (200 + u * 180 * Math.sin(2 * Math.PI * 4 * u)));
            }
            context.stroke();
        //otherwise, draw dots (rects)
        } else {
            context.fillRect((200 + u * 180 * Math.cos(2 * Math.PI * 4 * u)) - 2, (200 + u * 180 * Math.sin(2 * Math.PI * 4 * u)) - 2, 4, 4);
        }
    }
}

//handle changes using oninput and onchange
slider.oninput = drawSpiral;
checkbox.onchange = drawSpiral;
drawSpiral();