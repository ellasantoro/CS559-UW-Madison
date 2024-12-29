/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* uniform of the image*/
uniform sampler2D colormap;

/* light normal */
varying vec3 l_normal;

/* the camera position*/
uniform vec3 viewPos;

/* unforms for the sliders: dots and light directions */
uniform float dots;
uniform float dirX;
uniform float dirY;
uniform float dirZ;

/* constant for the base color */
const vec3 baseColor = vec3(1.0, 0.9, 0.9);

void main() {
    //make the direction equal to whatever the sliders say (using uniforms)
    vec3 lightDirWorld = vec3(dirX, dirY, dirZ);
    vec3 nhat = normalize(l_normal);

    //normalize the light direction
    vec3 lightDir = normalize(lightDirWorld);

    //calculate the light intensity by taking the non-negative dot product of the light direction and normal
    float lightIntensity = max(dot(nhat, lightDir), 0.0);

    //calculate diffuse (as we've done in previous boxes)
    vec3 diffuse = lightIntensity * baseColor;

    //calculate the direction from the fragment to the camera (and normalize)
    vec3 viewDirection = normalize(viewPos - gl_FragCoord.xyz);

    //specular , mostly copied from previous boxes w/ different numbers
    vec3 lightPosition = normalize(lightDir + viewDirection);
    float specularIntensity = pow(max(dot(nhat, lightPosition), 0.0), 16.0);
    vec3 specular = 0.5 * specularIntensity * baseColor;
    
    //final color incorporates the diffuse and the specular
    vec3 color = diffuse + specular;

    //creating the spots on the planet, we will use the uniform dots for the # of dots, then use
    //smooth step like we did in previous boxes so that we have the dotted pattern - it creates imperfections
    //on the planet which look cool.
    float dotSize = 0.04; 
    float spacing = 1.0 / dots;
    vec2 dotCoord = mod(v_uv * (spacing * 100.0), 1.0); 
    float dot = smoothstep(dotSize, dotSize - 0.02, distance(dotCoord, vec2(0.5, 0.5)));

    //final color and light calculations
    color = mix(color, vec3(0.4, 0.4, 0.4), dot);
    vec4 lightVec = vec4(color, 1.0);

    //use the colors and light for the frag color (multiply as we've done previously).
    gl_FragColor = texture2D(colormap, v_uv) * lightVec;
}
