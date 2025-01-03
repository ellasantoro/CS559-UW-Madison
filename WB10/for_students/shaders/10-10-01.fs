// Credit: http://glslsandbox.com/e#23316.0
precision highp float;

#define PI 3.1415926535897932384626433832795

uniform float time;
uniform float resolution;
uniform float intensity;
uniform float speed;
uniform vec3 lightColor;
uniform vec3 baseColor;

varying vec2 vUv;
varying vec3 vPosition;

vec2 circuit(vec2 p) {
	p = fract(p);
	float r = 0.3;
	float v = 0.0, g = 1.0;
	float d;
	
	const int iter = 7;
	for(int i = 0; i < iter; i ++)
	{
		d = p.x - r;
		g += pow(clamp(1.0 - abs(d), 0.0, 1.0), 200.0);
		
		if(d > 0.0) {
			p.x = (p.x - r) / (1.8 - r);
		}
		else {
			p.x = p.x;
		}
		p = p.yx;
	}
	v /= float(iter);
	return vec2(g, v);
}

void main()
{
	vec2 uv = ( vUv.xy + 0.5 ) * resolution;
	vec2 cid2 = floor(uv);
	float cid = (cid2.y + cid2.x);

	vec2 dg = circuit(uv);
	float d = dg.x;
	vec3 col1 = (0.2-vec3(max(min(d, 2.0) - 1.0, 0.0))) * baseColor;
	vec3 col2 = vec3(max(d - 1.0, 0.0)) * lightColor;

	float f = max(0.4 - mod(uv.y - uv.x + (time * speed) + (dg.y * 0.2), 2.5), 0.0) * intensity;
	col2 *= f;
	
	gl_FragColor = vec4(col1 + col2, 1.0);
}