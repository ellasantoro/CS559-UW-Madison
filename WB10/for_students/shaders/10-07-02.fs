/* a simple procedural texture for a checkerboard pattern */

/* pass interpolated variables from the vertex shader */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

//NOTE: I copy and pasted my code from the last checkerboard box in this workbook to serve as my starter code.
//You'll notice that in the last checkboard file, I mentioned that I used an example as reference even though I didn't copy
//any code, so if anything looks similar to the example, that is why. I have commented everything in this code to indicate 
//I understand what is happening! 
void main()
{
    float blur = 0.03; //this number i had originally as one but it was way too blurry, so I kind of just
    //played around with it until i thought it looked good

    //the following 6 variables are copied from the original checkerboard code I had in the checkerboard box
    float u = v_uv.x * checks;  //scales u to # of checks
    float v = v_uv.y * checks; //scales v to # of checks
    float colPosU = mod(u, 1.0); //mods u by 1, which essentially removes the decimal portion of u. this tells us which box we are in
    float colPosV = mod(v, 1.0);  //same note as above, but with v.
    float distFromCentU = abs(0.5 - colPosU); //calculates the distance that u is from the center
    float distFromCentV = abs(0.5 - colPosV); //calculates the distance that v is from the center
    //we have to take the max distance of these two because we want to know the point that is close to a boundary -
    //the maximum will tell us that.
    float maxDist = max(distFromCentU, distFromCentV);


    //the following line of code is partially taken from Young Wu's lecture notes, under
    //the demo titled "edge smoothing".
    //as given to us, the center of a check is at 0.5, so we want to subtract /add the blur to it based on the specific
    //edge we're talking about (it doesnt really matter whether we have the +/- in either edge parameter, just as long as
    //they arent the same, but I did find that if you use - blur for both it creates a really cool effect)
    //as the var name suggests, this helps us create the transition between light and dark using blur.
    float transition = smoothstep(0.5 - blur, 0.5 + blur, maxDist);
    //smoothstep(edge0,edge1,inputVal)


    //taken from my last checkerboard box, basically the flooring functions are what help us create the boundaries for a check since all of
    //the decimal values in between are not considered. we add the u and v floors and mod them because it will create a value of either 0 or 1 since
    //we're dealing with integers (since we floored them). this will create a "in the check box" or "not in the check box" value, we will base where we color 
    //off of that. Thus, in this if statement, we are saying "if the modded value is odd, then the check should be dark, so let's invert the transition to switch to light,
    //which is why we do transition = 1.0-transition. transition actually tells us a value of color, but it has blur incorporated.
    if (mod(floor(u) + floor(v), 2.0) == 1.0) {
        transition = 1.0 - transition;
    }

    //now we simply pass the colors in, and use the mix function so that we blend the colors in the appropriate way.
    //one good thing to remember is that the fragment shaders are executed for every single fragment, so these variables are being updated,
    //and that is why we get different results for different areas.
    gl_FragColor = vec4(mix(light, dark, transition), 1.0);
    //mix(val1, val2, mixFactor) , val1 and val2 are interpolated
    //gl_FragColor = vec4(R,G,B,A) , mix in this case will return a vec3 (3 vals), so we can pass it
    //into the gl_FragColor
}
