uniform float uTime;

attribute float size;
attribute float speed;

void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    modelViewPosition.y += sin(uTime * speed) - 0.5;
    modelViewPosition.x += cos(uTime * speed) - 0.5;
    modelViewPosition.z += cos(uTime * speed) - 0.5;

    gl_PointSize = size * (50.0 / -modelViewPosition.z);
    gl_Position = projectionMatrix * modelViewPosition;
}
