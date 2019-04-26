import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Scene, DoubleSide, BoxGeometry, MeshPhongMaterial, Mesh, GLTFLoader, PointLight, Vector3, Euler, WebGLRenderer, CSS3DRenderer } from 'three-full';
import { update } from 'es6-tween';
import debounce from 'lodash.debounce';
import Surface from './Surface/Surface.js';
import Test from './Test.jsx';
import Board from './Board';
import roomGLB from './assets/glb/room.glb';
import SCCamera from './scCamera.js';
import './App.css';

const scCamera = new SCCamera();
const glScene = new Scene();
const bgScene = new Scene();
const cssScene = new Scene();
export const surfaceDeps = { glScene, cssScene, toCamera: (surface) => scCamera.toCamera(surface) };

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

const surfaces = {
  leftWall: new Surface({
    width: 1000,
    height: 1000, 
    position: new Vector3(500, 0, -500), 
    rotation: new Euler(0, -Math.PI / 2, 0), 
    up: new Vector3(0, 1, 0), 
    ...surfaceDeps
  }),
  backWall: new Surface({
    width: 1000, 
    height: 1000, 
    position: new Vector3(0, 0, 0), 
    rotation: new Euler(0, Math.PI, 0), 
    up: new Vector3(0, 1, 0), 
    ...surfaceDeps
  }),
  rightWall: new Surface({
    width: 1000, 
    height: 1000, 
    position: new Vector3(-500, 0, -500), 
    rotation: new Euler(0, Math.PI / 2, 0), 
    up: new Vector3(0, 1, 0), 
    ...surfaceDeps
  }),
  floor: new Surface({
    width: 1000, 
    height: 1000, 
    position: new Vector3(0, -500, -500), 
    rotation: new Euler(Math.PI / 2, Math.PI, 0), 
    up: new Vector3(0, 0, 1), 
    ...surfaceDeps
  })
};

function App(props) {
  const [cameraView, setCameraView] = useState(null);
  const appContentRef = useRef(null);
 
  useEffect(() => {
    const bgRenderer = new WebGLRenderer({ alpha: true });
    bgRenderer.setClearColor(0x000000, 0);
    bgRenderer.setPixelRatio(window.devicePixelRatio);
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.domElement.style.position = 'absolute';
    bgRenderer.domElement.style.top = 0;
    bgRenderer.domElement.style.left = 0;
    bgRenderer.shadowMap.enabled = true;
    appContentRef.current.appendChild(bgRenderer.domElement);

    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.left = 0;
    appContentRef.current.appendChild(cssRenderer.domElement);

    const glRenderer = new WebGLRenderer({ alpha: true });
    glRenderer.setClearColor(0x000000, 0);
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.top = 0;
    glRenderer.domElement.style.left = 0;
    glRenderer.domElement.style.pointerEvents = 'none';
    appContentRef.current.appendChild(glRenderer.domElement);

    const onResize = debounce(() => {
      scCamera.camera.aspect = window.innerWidth / window.innerHeight;
      scCamera.camera.updateProjectionMatrix();
      bgRenderer.setSize(window.innerWidth, window.innerHeight);
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
      glRenderer.setSize(window.innerWidth, window.innerHeight);
    }, 100);
    window.addEventListener('resize', onResize);

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
  }, []);

  useEffect(() => {
    scCamera.goToSurface(cameraView);
  }, [cameraView]);

  const { leftWall, backWall, rightWall, floor } = surfaces || {};

  return (
    <Fragment>
      <leftWall.Component>
        <Test cameraView={cameraView} setCameraView={setCameraView} surface={leftWall} />
      </leftWall.Component>
      <backWall.Component>
        <Board cameraView={cameraView} setCameraView={setCameraView} surface={backWall} />
      </backWall.Component>
      <rightWall.Component>
        <Test cameraView={cameraView} setCameraView={setCameraView} surface={rightWall} />
      </rightWall.Component>
      <floor.Component>
        <Test cameraView={cameraView} setCameraView={setCameraView} surface={floor} />
      </floor.Component>

      <div className="app">
        <div className="app__content" ref={appContentRef} />
        <div className="app__overlay">
          {cameraView !== null &&
            <div className="app__back-to-overlay" onClick={() => setCameraView(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="6 6 36 36">
                  <path d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z"/>
              </svg>
              <div>
                <span>Back to overview</span>
              </div>
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;
