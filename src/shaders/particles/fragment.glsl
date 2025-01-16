uniform vec3 uColor;

void main() {
    float length = length(gl_PointCoord - vec2(0.5, 0.5));
    if (length > 0.5) discard;
    gl_FragColor = vec4(uColor, 0.6);
}
