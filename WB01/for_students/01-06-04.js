let toTransition = document.getElementById("ex3-span");
let colorVal = 0;
let sign = 1;
let lastTime;

function makeBackgroundTransition(duration) {
    if (lastTime) {
        let delta = (duration - lastTime) / 750 * 255;
        colorVal = (colorVal + delta * sign);

        //update colorVal accordingly; this essentially says if colorVal < 0, set to 0 and change the sign
        //to positive 1, and if >255, set to 255 and change the sign to -1. the sign will essentially change the direction
        //towards either red or white, and setting to 0 or 255 will ensure that it goes white -> red -> red -> white
        //making it look like a cycle instead of white to red and then immediately back to pure white.
        colorVal = (colorVal < 0) ? (sign = 1, 0) : (colorVal > 255) ? (sign = -1, 255) : colorVal;
        //update the background color accordingly by subtracting this updated colorValue from 255 (distance from pure white)
        toTransition.style.backgroundColor = `rgb(255, ${255 - colorVal}, ${255 - colorVal})`;
    }
    //update the lasttime so we can use it in the next iteration
    lastTime = duration;
    window.requestAnimationFrame(makeBackgroundTransition);
}

window.requestAnimationFrame(makeBackgroundTransition);
