 /** @type{HTMLInputElement} */ let slider = (/** @type{HTMLInputElement} */ document.getElementById("slider"));
let lastTimestamp = 0;
//start by incrementing, not decrementing b/c we start at 0, so the bounce flag is false.
let bounce = false;
advanceSlider();

function advanceSlider(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    //divided by 10 because: first divided by 1000 (convert from millisec to sec) and multiplied by 100 since we are working with units 0 to 100 (slider vals)
    let delta = (timestamp - lastTimestamp) / 10;
    lastTimestamp = timestamp;

    //this affects the direction (whether it is working back towards 0 or towards 100)
    let sign = bounce ? -1 : 1; 
    let newValue = Number(slider.value) + sign * delta;

    //ensure that the value doesn't increase past 100, and once it reaches 100, we set bounce to true
    //so it "bounces back" and goes in the opposite direction.
    if (newValue >= 100) {
        newValue = 100;
        bounce = true;
    //ensure that the value doesn't decrease past 0, and once it reaches 0, we set bounce to false
    //so it "bounces back" and goes in the opposite direction.
    } else if (newValue <= 0) {
        newValue = 0;
        bounce = false;
    }

    slider.value = newValue;
    window.requestAnimationFrame(advanceSlider);
}
