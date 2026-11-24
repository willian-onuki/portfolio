import {
  BackSide,
  BoxGeometry,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  type Texture,
  type WebGLRenderer,
} from 'three';

/**
 * Estúdio procedural para os reflexos do vidro: uma sala escura com
 * "softboxes" emissivos (luz branca de cima, filete em brasa à direita e um
 * frio à esquerda). Vira um mapa PMREM uma única vez — nenhum HDRI para
 * baixar, e o reflexo já carrega a cor da identidade.
 */
export function createStudioEnvironment(renderer: WebGLRenderer): Texture {
  const scene = new Scene();
  const geometries: Array<BoxGeometry | PlaneGeometry> = [];
  const materials: MeshBasicMaterial[] = [];

  const room = new BoxGeometry(30, 30, 30);
  geometries.push(room);
  const roomMaterial = new MeshBasicMaterial({ color: new Color('#030304'), side: BackSide });
  materials.push(roomMaterial);
  scene.add(new Mesh(room, roomMaterial));

  const plane = new PlaneGeometry(1, 1);
  geometries.push(plane);
  const softbox = (color: string, intensity: number, w: number, h: number, position: [number, number, number]) => {
    const material = new MeshBasicMaterial({ color: new Color(color).multiplyScalar(intensity), side: DoubleSide });
    materials.push(material);
    const mesh = new Mesh(plane, material);
    mesh.scale.set(w, h, 1);
    mesh.position.set(...position);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  };

  softbox('#ffffff', 5, 12, 3, [0, 8, 3]); // teto: brilho largo nas faces de cima
  softbox('#ff6a2b', 1.1, 0.8, 9, [8, 1, 1]); // filete em brasa (direita), só nas bordas
  softbox('#dfe6ff', 1.8, 1.2, 9, [-7, 2, 1]); // filete frio (esquerda)
  softbox('#ffffff', 0.8, 12, 2, [0, -6, 6]); // rebatedor de chão
  softbox('#ffffff', 1.4, 3, 3, [3, 3, 9]); // luz de frente (realce nas bordas)

  const pmrem = new PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene, 0.035);
  pmrem.dispose();
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
  return target.texture;
}
