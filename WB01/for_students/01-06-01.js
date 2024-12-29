/** @type{HTMLInputElement} */ let slider1 = (/** @type{HTMLInputElement} */ document.getElementById("slider1"));
/** @type{HTMLInputElement} */ let slider2 = (/** @type{HTMLInputElement} */ document.getElementById("slider2"));
/** @type{HTMLInputElement} */ let slider3 = (/** @type{HTMLInputElement} */ document.getElementById("slider3"));
//if either slider1 or slider2 are modified, slider3 will be updated to appropriately equal slider2 - slider1
let currDiff;
let newVal;
slider1.oninput = function() {
    slider3.value = slider2.value-slider1.value;
    currDiff = slider3.value();
};
slider2.oninput = function() {
    slider3.value = slider2.value-slider1.value;
    currDiff = slider3.value();
};
slider3.oninput = function() {
    //need parseInt whenevre doing mathematic operations
    slider1.value = parseInt(slider2.value) - parseInt(slider3.value);

    //ensure that slider1 doesn't go under 0 or over 100, this will help us in the
    //calculation of slider2.
    if (slider1.value < 0) {
        slider1.value = 0;
    } else if (slider1.value > 100) {
        slider1.value = 100;
    }
    //need parseInt whenevre doing mathematic operations
    slider2.value = parseInt(slider1.value) + parseInt(slider3.value);
};