#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoord;

out vec2 texCoord;
out vec3 Normal;
out vec3 FragPos;

uniform mat4 model_to_world;
uniform mat4 world_to_view;
uniform mat4 projection;

void main()
{
    gl_Position = projection * world_to_view * model_to_world * vec4(aPos, 1.0);
    Normal = mat3(transpose(inverse(model_to_world))) * aNormal;
    FragPos = vec3(model_to_world * vec4(aPos, 1.0));
    texCoord = aTexCoord;
}
