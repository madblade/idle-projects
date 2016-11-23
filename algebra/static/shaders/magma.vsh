uniform float uTime;

void main() {

   vec3 newPosition = vec3(position.x + uTime/100.0, position.y, position.z);

   gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

}