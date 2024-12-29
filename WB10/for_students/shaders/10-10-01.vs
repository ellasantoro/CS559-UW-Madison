// Credit: http://glslsandbox.com/e#23316.0
precision highp float;
precision highp int;

attribute vec2 uv2;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}