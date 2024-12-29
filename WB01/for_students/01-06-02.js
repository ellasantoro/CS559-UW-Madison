/** @type{HTMLInputElement} */ let slider = (/** @type{HTMLInputElement} */ document.getElementById("slider"));
/** @type{HTMLInputElement} */ let button1 = (/** @type{HTMLInputElement} */ document.getElementById("start"));
/** @type{HTMLInputElement} */ let button2 = (/** @type{HTMLInputElement} */ document.getElementById("stop"));

let start = false;
button1.onclick = function(){
    //if the animation is not currently running, and the stop button is pressed, we want to set this
    //start flag to true and call the advanceSlider method which will continue running until stop is pressed.
    if (!start) {
        start = true;
        advanceSlider();
    }
}

button2.onclick = function(){
    //simply set the start flag to false in order to quit out of the informal "loop" that advanceSlider utilizes
    start = false;
}

function advanceSlider() {
    //this will handle stopping the event since without it, it would continue to call itself
    //indefinitely as soon as you click start for the first time.
    if (!start) {
        return;
    }

    let speed = 3;
    let newValue = (Number(slider.value) + speed) % 100;
    if (newValue < 0) newValue = 100;
    slider.value = newValue.toString();
    //while in motion, stay in motion ; but, if at any point the stop button gets called, the if 
    //statement at the beginning will prevent the compiler to reach this far, and it wont continue
    //running.
    window.requestAnimationFrame(advanceSlider);
}
