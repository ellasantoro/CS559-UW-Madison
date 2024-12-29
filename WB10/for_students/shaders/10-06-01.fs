/* a simple procedural texture for a checkerboard pattern */

/* pass interpolated variables from the vertex shader */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{
    //NOTE: I did look at the example code before completing, but I can't remember what exactly I took or remembered from it, I believe a lot of it 
    //is different since I didn't have it open side by side while coding. I thought it was worth mentioning in case anything does seem similar.
    //I have explained all of my steps to ensure that I understand this box.
    float dc = 0.5; //constant for middle point
    float u = v_uv.x * checks; //scale x coordinate by # of checks
    float v = v_uv.y * checks; //scale y coordinate by # of checks
    float colPosU = mod(u, 1.0); //position within the current check horizontally - it just takes the decimal part of the value,
    //like for example 2.1 % 1 = 0.1 , or 2.33 % 1 = 0.33
    float distFromCentU = abs(dc - colPosU); //distance from the center of the check (take abs val since its distance not position)
    float colPosV = mod(v, 1.0); //position within the current check vertically (see reasoning above)
    float distFromCentV = abs(dc - colPosV); //distance from the center of the check (see reasoning above)


    //if (max(distFromCentU, distFromCentV) >= 0.5){
    // return 1.0;    
    //}else{
    // return 0.0   
    //}
    //default value of the transition is set first, it will be either 0.0 or 1.0.
    float color = step(0.5, max(distFromCentU, distFromCentV));
    if (mod(floor(u) + floor(v), 2.0) == 1.0) {
        color = 1.0; //if its odd, then we make the color have a value of 1.0  so that it the blue value
                     //in RGB is "on" and thus this specific checker square will be blue. 
    }
    //otherwise, it will be saved as white and we will have a white checker. We could've also set color to 0.0
    //and have it be set to 0.0 if even and 1.0 if odd, but the instructions mentioned it might be beneficial to use 
    //the step function for a later use, so that is why it is like that.

    gl_FragColor = vec4(mix(light, dark, color), 1.0); // output final color based on transition
}
