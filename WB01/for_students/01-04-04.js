/**
 * Have the sliders change each other
 */
/** @type{HTMLInputElement} */ let slider41 = (/** @type{HTMLInputElement} */ document.getElementById("box4-slider1"));
/** @type{HTMLInputElement} */ let slider42 = (/** @type{HTMLInputElement} */ document.getElementById("box4-slider2"));
slider41.onchange = function() {
    slider42.value = slider41.value;
};
slider42.oninput = function() {
    slider41.value = slider42.value;
};
//it seems like ".onchange" will update the second slider after the mouse has been released from the first slide
//in a slightly different fashion, it seems like ".oninput" will update the first slider while the mouse is dragging
//on the second slider.