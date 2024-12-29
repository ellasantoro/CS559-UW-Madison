/* a simple procedural texture: dots */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the dots */
uniform vec3 light;
uniform vec3 dark;

/* number of dots over the UV range */
uniform float dots;

/* how big are the circles */
uniform float radius;

void main()
{
    float x = v_uv.x * dots;
    float y = v_uv.y * dots;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    float dc = step(d,radius);

    //if xc % 2 is 0, that means we are working with an even column, so change all of the dots in
    //this column to green, otherwise set them to blue. This way we have alternating columns of blue and green.
    if(mod(xc, 2.0) == 0.0){
        gl_FragColor = vec4(mix(light,vec3(0.0,0.8,0.0),dc), 1.0);
    }else{
        gl_FragColor = vec4(mix(light,vec3(0.0,0,0.8),dc), 1.0);
    }
}

