/*
* simple diffuse lighting shader
* constant direction
* constant base material color
* light color is just white
* two-sided lighting
*/
varying vec3 l_normal;

// note that this is in WORLD COORDINATES
//make it so that the sides of the square arent completely dark, and change the direction
//of the light so that the back part is the darkest spot
const vec3 lightDirWorld = vec3(0.2,0.2, 1);
const vec3 baseColor = vec3(1,.8,.4);

void main()
{
    // we need to renormalize the normal since it was interpolated
    vec3 nhat = normalize(l_normal);

    // get the lighting vector in the view coordinates
    // warning: this is REALLY wasteful!
    vec3 lightDir = normalize(vec4(lightDirWorld, 0.5)).xyz;

    // deal with two sided lighting
    
    //removed the absolute value because that is what helps us make it two sided, if the dot product was
    // > 0, then it would hit front side, while if it was < 0 it would be hitting the back side, so
    //by using the absolute value we aren't dealing with front or back side differently, we're treating
    //them the exact same which is whats making it double sided. removing the abs val will make it treat the front and
    //back differently. 
    float light = dot(nhat, lightDir);

    // brighten the base color
    gl_FragColor = vec4(light * baseColor,1);
}

