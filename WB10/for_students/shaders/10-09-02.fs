/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
uniform sampler2D colormap;
varying vec3 l_normal;

const vec3 lightDirNormal = vec3(0.,-1., 0.);
const vec3 baseColor = vec3(1.,1.,1.);

void main()
{
    vec3 nhat = normalize(l_normal);

    vec3 lightDir = normalize(vec4(lightDirNormal, 0.5)).xyz;
    float lightIntensity = dot(nhat, lightDir); //remove this line to see how the glow changes
    //add the ambient and diffuse lighting
    vec3 ambient = vec3(1.5, 1.5, 1.5); 
    vec3 diffuse = lightIntensity * baseColor;
    vec4 lightVec = vec4(ambient + diffuse, 1.0);

    //multiply the image by the light to get the final frag color
    gl_FragColor = texture2D(colormap,v_uv) * lightVec;
    
}
