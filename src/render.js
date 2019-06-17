import { Scene, DoubleSide, BoxGeometry, MeshPhongMaterial, Mesh, PointLight, WebGLRenderer } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import debounce from 'lodash.debounce';
import { update } from 'es6-tween';
import SCCamera from './SCCamera.js';
import roomGLB from './assets/glb/room.glb';

export const scCamera = new SCCamera();
const glScene = new Scene();
const bgScene = new Scene();
const cssScene = new Scene();
export const surfaceDeps = { glScene, cssScene, camera: scCamera };

// cube
const geometry = new BoxGeometry(200, 200, 200);
const material = new MeshPhongMaterial({
  color: 0xff0000,
  emissive: 0x000000,
  specular: 0x111111,
  side: DoubleSide,
  flatShading: false,
  shininess: 30
});
const cube = new Mesh(geometry, material);
cube.position.z = -250;
cube.position.x = 250;
cube.position.y = 250;
glScene.add(cube);

const cubeShadow = new Mesh(geometry, material.clone());
cubeShadow.castShadow = true;
cubeShadow.material.transparent = true;
cubeShadow.material.opacity = 0;
cubeShadow.position.copy(cube.position);
bgScene.add(cubeShadow);

const loader = new GLTFLoader();
loader.load(roomGLB, function (gltf) {
  gltf.scene.scale.multiplyScalar(100);
  gltf.scene.rotation.y = Math.PI;
  gltf.scene.position.y = -500;
  gltf.scene.position.z = -500;
  gltf.scene.children[0].receiveShadow = true;
  bgScene.add(gltf.scene);
});

// light
const pointLight = new PointLight(0xffffff, 0.8, 0, 2);
pointLight.castShadow = true;
pointLight.position.z = -1000;
pointLight.shadow.mapSize.width = 2048;  // default
pointLight.shadow.mapSize.height = 2048; // default
pointLight.shadow.camera.near = 0.5;       // default
pointLight.shadow.camera.far = 5000      // default
glScene.add(pointLight);
bgScene.add(new PointLight().copy(pointLight));
//const sphereSize = 100;
//const pointLightHelper = new PointLightHelper( pointLight, sphereSize );
//glScene.add( pointLightHelper );



const bgRenderer = new WebGLRenderer({ alpha: true });
bgRenderer.setClearColor(0x000000, 0);
bgRenderer.setPixelRatio(window.devicePixelRatio);
bgRenderer.setSize(window.innerWidth, window.innerHeight);
bgRenderer.domElement.style.position = 'absolute';
bgRenderer.domElement.style.top = 0;
bgRenderer.domElement.style.left = 0;
bgRenderer.shadowMap.enabled = true;
document.getElementById('canvas').appendChild(bgRenderer.domElement);

const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
cssRenderer.domElement.style.left = 0;
document.getElementById('canvas').appendChild(cssRenderer.domElement);

const glRenderer = new WebGLRenderer({ alpha: true });
glRenderer.setClearColor(0x000000, 0);
glRenderer.setPixelRatio(window.devicePixelRatio);
glRenderer.setSize(window.innerWidth, window.innerHeight);
glRenderer.domElement.style.position = 'absolute';
glRenderer.domElement.style.top = 0;
glRenderer.domElement.style.left = 0;
glRenderer.domElement.style.pointerEvents = 'none';
document.getElementById('canvas').appendChild(glRenderer.domElement);

const onResize = debounce(() => {
  scCamera.camera.aspect = window.innerWidth / window.innerHeight;
  scCamera.camera.updateProjectionMatrix();
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  glRenderer.setSize(window.innerWidth, window.innerHeight);
}, 100);
window.addEventListener('resize', onResize);

export const refresh = () => {
  bgRenderer.render(bgScene, scCamera.camera);
  cssRenderer.render(cssScene, scCamera.camera);
  glRenderer.render(glScene, scCamera.camera);
};

const animate = (time) => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cubeShadow.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cubeShadow.rotation.y += 0.01;
  bgRenderer.render(bgScene, scCamera.camera);
  cssRenderer.render(cssScene, scCamera.camera);
  glRenderer.render(glScene, scCamera.camera);
  update(time);
};

animate();
