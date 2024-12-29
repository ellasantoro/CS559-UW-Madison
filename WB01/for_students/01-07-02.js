let toTransition = document.getElementById("ex3-span");
let redButton = document.getElementById("redButton");
let yellowButton = document.getElementById("yellowButton");
let greenButton = document.getElementById("greenButton");
let redSign = 0;
let greenSign = 0;
let blueSign = 0;
let redVal = 255;
let greenVal = 255;
let blueVal = 255;
let lastTime = null;

yellowButton.onclick = function() {
    redSign = 1;
    greenSign = 1;
    blueSign = -1;
    window.requestAnimationFrame(makeBackgroundTransition);
};

greenButton.onclick = function() {
    redSign = -1;
    greenSign = 1;
    blueSign = -1;
    toTransition.textContent = "some text that will become green";
    window.requestAnimationFrame(makeBackgroundTransition);
};

redButton.onclick = function() {
    redSign = 1;
    greenSign = -1;
    blueSign = -1;
    toTransition.textContent = "some text that will become red";
    window.requestAnimationFrame(makeBackgroundTransition);
};

function makeBackgroundTransition(duration) {
    if (lastTime) {
        let delta = (duration - lastTime) / 2000.0 * 255;
        redVal = redVal + delta * redSign;
        greenVal = greenVal + delta * greenSign;
        blueVal = blueVal + delta * blueSign;
        
        if (redVal <= 0 && greenVal >= 255 && blueVal <= 0) {
            redVal = 0;
            greenVal = 255;
            blueVal = 0;
        }

        if (redVal >= 255 && greenVal >= 255 && blueVal <= 0) {
            redVal = 255;
            greenVal = 255;
            blueVal = 0;
        }
        if (redVal >= 255 && greenVal <= 0 && blueVal <= 0) {
            redVal = 255;
            greenVal = 0;
            blueVal = 0;
        }
        
        toTransition.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    }
    lastTime = duration;
    window.requestAnimationFrame(makeBackgroundTransition);
}
