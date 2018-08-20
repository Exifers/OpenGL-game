#version 330 core
struct Material {
  sampler2D texture;
  sampler2D specMap;
  vec3 ambient;
  vec3 diffuse;
  vec3 specular;
  float shininess;
};

struct Light {
  vec3 position;

  vec3 ambient;
  vec3 diffuse;
  vec3 specular;
};

in vec2 texCoord;
in vec3 Normal;
in vec3 FragPos;

out vec4 FragColor;

uniform vec3 cameraPos;
uniform Material material;
uniform Light light;

void main()
{
  vec4 objectColor = vec4(1.0, 1.0, 1.0, 1.0);
  float ambientStrength = 0.15;
  float diffuseStrength = 0.15;
  float specularStrength = 0.7;

  // ambient
  vec3 ambient = light.ambient * material.ambient * ambientStrength;

  // diffuse (point without attenuation)
  vec3 norm = normalize(Normal);
  vec3 lightDir = normalize(light.position - FragPos);
  float diff = max(dot(norm, lightDir), 0.0);
  vec3 diffuse = diff * light.diffuse * material.diffuse * diffuseStrength;

  // specular
  vec3 cameraDir = normalize(cameraPos - FragPos);
  vec3 reflecDir = reflect(-lightDir, norm);
  float spec = pow(max(dot(cameraDir, reflecDir), 0.0), material.shininess);
  vec3 specMapValue = vec3(texture(material.specMap, texCoord));
  vec3 specular = spec * light.specular * material.specular * specMapValue * specularStrength;

  vec3 lightFragColor = ambient + diffuse + specular;
  vec4 texFrag = texture(material.texture, texCoord);
  FragColor = objectColor * vec4(lightFragColor, 1.0) * texFrag;

  // gamma correction
  float gamma = 2.2;
  FragColor.rgb = pow(FragColor.rgb, vec3(1.0/gamma));
}
