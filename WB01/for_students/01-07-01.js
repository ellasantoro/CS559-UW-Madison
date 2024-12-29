let toTransition = document.getElementById("ex3-span");
let greenVal = 255;
let redVal = 0;
let redSign = -1;
let greenSign = 1;
let lastTime;

function makeBackgroundTransition(duration) {
    if (lastTime) {
        let delta = (duration - lastTime) / 1000.0 * 255;
        redVal = redVal + delta * redSign;
        greenVal = greenVal + delta * greenSign;

        if (redVal <= 0 && greenVal >= 255) {
            //ensure that redVal and greenVal do not go under 0 or go over 255, respectively
            redVal = 0;
            greenVal = 255;
            //now that we have rgb(0,255,0) aka green, we want to go to yellow (255,255,0), so green should
            //be maintained (stay positive sign) while red begins to increase (positive sign) 
            greenSign = 1;
            redSign = 1;
        }

        if (redVal >= 255 && greenVal >= 255) {
            //ensure that redVal and greenVal do not go over 255
            redVal = 255;
            greenVal = 255;
            //now that we have rgb(255,255,0) aka yellow, we want to go to red (255,0,0), so start increasing  
            //red value (positive sign) and start decreasing green value (negative sign)
            redSign = 1;
            greenSign = -1;
        }
        if (redVal >= 255 && greenVal <= 0) {
            //ensure that redVal and greenVal do not go over 255 or under 0, respectively
            redVal = 255;
            greenVal = 0;
            //now that we have rgb(255,0,0) aka red, we want to circle back to green(0,255,0), so start decreasing 
            //red value (negative sign) and start increasing green value (positive sign)
            redSign = -1;
            greenSign = 1;
        }
        
        toTransition.style.backgroundColor = `rgb(${redVal}, ${greenVal}, 0)`;
    }
    lastTime = duration;
    window.requestAnimationFrame(makeBackgroundTransition);
}

window.requestAnimationFrame(makeBackgroundTransition);


/*
it should go from green - yellow - red - green
so 0,255,0 to 255,255,0 to 255,0,0 to 0,255,0
*/

