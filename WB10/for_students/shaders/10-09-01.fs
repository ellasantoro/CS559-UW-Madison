/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
varying vec3 l_normal;

const vec3 lightDirWorld = vec3(0.,-1., 0.);
const vec3 baseColor = vec3(1.,1.,1.);
//NOTE: this is taken from one of the other boxes I did with my puzzle pattern (It said we were allowed to do that in the writeup)
void main() {
    vec3 darkPink = vec3(0.92, 0.22, 0.56);
    vec3 lightPink = vec3(0.91, 0.61, 0.749);

    //scale by 7 (this is comparable to saying number of checks is 6 from the last assignment)
    float scaledU = v_uv.x * 7.0;
    float scaledV = v_uv.y * 7.0;
    //this just removes any decimals after u and v and we're using it to tell which "square" we are inside of,
    //it will be used for calculations later
    float floorV = floor(scaledV);
    float floorU = floor(scaledU);
    //takes the decimal part of the u and v by modding by 1
    float decimalU = mod(scaledU, 1.0);
    float decimalV = mod(scaledV, 1.0);
    //copied from last box - see explanation there, basically calculates the 
    //distance from the center of the "square", helps to create transitions by the edges
    float distanceFromEdge = abs(0.5 - decimalV);

    //again taken from last box, checks whether we are in the "square" or not, will only be
    //1.0 or 0.0 - the values here are changed to create a cool pattern
    float isWithinCheck = step(0.16, min(0.5 - decimalU, distanceFromEdge));

    //copied from last box, see last box for full explanation
    if (mod(floorU + floorV, 2.0) > 0.1) {
        isWithinCheck = 1.0 - isWithinCheck;
    }
    
    vec3 nhat = normalize(l_normal);

    // get the lighting vector in the view coordinates
    // warning: this is REALLY wasteful!
    vec3 lightDir = normalize(vec4(lightDirWorld, 0.5)).xyz;
    float lightIntensity = max(dot(nhat, lightDir), 0.0);
    // deal with two sided lighting
    
    //removed the absolute value because that is what helps us make it two sided, if the dot product was
    // >  0, then it would hit front side, while if it was < 0 it would be hitting the back side, so
    //by using the absolute value we aren't dealing with front or back side differently, we're treating
    //them the exact same which is whats making it double sided. removing the abs val will make it treat the front and
    //back differently. 
    vec3 ambient = vec3(0.1, 0.1, 0.1); 
    vec3 diffuse = lightIntensity * baseColor;

    vec3 finalColor = mix(darkPink, lightPink, isWithinCheck);
    vec4 lightVec = vec4(ambient + diffuse, 1.0);
    
    gl_FragColor = vec4(finalColor, 1.0) * lightVec;
}
