precision highp float;

uniform sampler2D r;
uniform sampler2D g;
uniform sampler2D b;
uniform sampler2D a;
uniform float useAlpha;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(
        texture2D(r, vUv).r,
        texture2D(g, vUv).g,
        texture2D(b, vUv).b,
        useAlpha == 1.0 ? texture2D(a, vUv).r : 1.0
    );
}
