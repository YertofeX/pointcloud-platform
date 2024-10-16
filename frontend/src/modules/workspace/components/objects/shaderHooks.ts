import { useMemo } from "react";
import { IUniform, Shader } from "three";

type ShaderPart = {
  head?: string;
  main?: string;
}

//https://codesandbox.io/s/depth-buffer-soft-intersection-b94ogs
export const glsl = (strings: TemplateStringsArray, ...variables: (string | undefined)[]) => {
  const str: string[] = [];

  strings.forEach((x, i) => {
    str.push(x);
    str.push(variables[i] || "");
  });

  return str.join("");
}

type UseShaderParams = {
  uniforms?: Record<string, IUniform<any>>;
  vertex?: ShaderPart;
  fragment?: ShaderPart;
}

export const useShader = ({
  uniforms: incomingUniforms = {},
  vertex = {
    head: "",
    main: "",
  },
  fragment = {
    head: "",
    main: "",
  },
}: UseShaderParams) => {
  const uniforms = useMemo(() => {
    return Object.entries(incomingUniforms)
      .map(([key, value]) => ({ [key]: { needsUpdate: true, ...value } }))
      .reduce((previous, current) => ({ ...previous, ...current }), {});
  }, []);

  return {
    uniforms,
    onBeforeCompile(shader: Shader) {
      shader.uniforms = {
        ...shader.uniforms,
        ...uniforms,
      };

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        glsl`
                #include <common>
         
                ${vertex.head}  
            `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        glsl`
                #include <begin_vertex>
        
                ${vertex?.main}  
            `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        glsl`
                #include <common>

                ${fragment?.head}  
            `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 diffuseColor = vec4( diffuse, alpha );",
        glsl`
            vec4 diffuseColor = vec4( diffuse, alpha );

                ${fragment?.main}  
            `
      );
      console.log(shader);
    },
  };
}
