#version 330 core
layout (location = 0) in vec3 aPos;

out vec3 TexCoords;

uniform mat4 projection;
uniform mat4 world_to_view; // model to world is identity for a skybox

void main()
{
  TexCoords = aPos; // skybox trick here
  gl_Position = projection * world_to_view * vec4(aPos, 1.0);
}
