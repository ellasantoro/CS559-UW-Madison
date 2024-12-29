/* simplest possible fragment shader - just a constant color */
/* but a wrinkle: we pass the color from the javascript program in a uniform */
uniform vec3 color;

// We also passed in the time as a uniform (for bonus exercise)
uniform float time;

void main()
{
    //oscillates through different colors as opposed to the red to teal before
    //uses the provded time uniform above.
    float red = 0.0; //just set this to 0 because i wanted a bluish green oscillation and no red involved.
    //pretty much copied from the code that was provided to us to calculate the 
    //new color. I just saved it into the green variable because I wanted to vary the levels of green for my 
    //fade. I switched out some of the numbers to make it the colors I wanted.
    float green = cos(time * 0.5) * 0.3 + 0.6;
    float blue = color.z; // just set this to the original color - didn't want the blue part to vary.
    //save the previous variables into a vector, then pass it to the fragcolor with opacity 1.
    vec3 newColor = vec3(red,green, blue);
    gl_FragColor = vec4(newColor, 1);
}
