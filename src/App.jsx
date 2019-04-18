import React, { useRef, useState, useEffect, Fragment } from 'react';
import * as THREE from 'three-full';
import { update } from 'es6-tween';
import SCCamera from './scCamera.js';
import Surface from './Surface';
import Test from './Test.jsx';
import roomGLB from './assets/glb/room.glb';
import './App.css';

function App(props) {
  const [cameraView, setCameraView] = useState(null);
  const [surfaces, setSurfaces] = useState([]);

  const appContent = useRef(null);
  const scCamera = useRef(null);

  useEffect(() => {
    const glScene = new THREE.Scene();
    const bgScene = new THREE.Scene();
    const cssScene = new THREE.Scene();

    scCamera.current = new SCCamera();
    
    // cube
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0x000000,
      specular: 0x111111,
      side: THREE.DoubleSide,
      flatShading: false,
      shininess: 30,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = -250;
    cube.position.x = 250;
    cube.position.y = 250;
    cube.castShadow = true;
    cube.receiveShadow = false;
    glScene.add(cube);

    var loader = new THREE.GLTFLoader();
    loader.load(roomGLB, function (gltf) {
      gltf.scene.scale.multiplyScalar(100);
      gltf.scene.rotation.y = Math.PI;
      gltf.scene.position.y = -500;
      gltf.scene.position.z = -500;
      gltf.scene.receiveShadow = true;
      bgScene.add(gltf.scene);
    });

    // light
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 0, 2);
    pointLight.castShadow = true;
    pointLight.position.z = -1000;
    glScene.add(pointLight);
    bgScene.add(new THREE.PointLight().copy(pointLight));
    //const sphereSize = 100;
    //const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    //glScene.add( pointLightHelper );

    const surfaceDeps = { cameraView, setCameraView, glScene, cssScene };
    setSurfaces([
      new Surface({
        width: 1000,
        height: 1000, 
        position: new THREE.Vector3(500, 0, -500), 
        rotation: new THREE.Euler(0, -Math.PI / 2, 0), 
        up: new THREE.Vector3(0, 1, 0), 
        Component: Test,
        ...surfaceDeps
      }),
      new Surface({
        width: 1000, 
        height: 1000, 
        position: new THREE.Vector3(0, 0, 0), 
        rotation: new THREE.Euler(0, Math.PI, 0), 
        up: new THREE.Vector3(0, 1, 0), 
        Component: Test, 
        ...surfaceDeps
      }),
      new Surface({
        width: 1000, 
        height: 1000, 
        position: new THREE.Vector3(-500, 0, -500), 
        rotation: new THREE.Euler(0, Math.PI / 2, 0), 
        up: new THREE.Vector3(0, 1, 0), 
        Component: Test, 
        ...surfaceDeps
      }),
      new Surface({
        width: 1000, 
        height: 1000, 
        position: new THREE.Vector3(0, -500, -500), 
        rotation: new THREE.Euler(Math.PI / 2, Math.PI, 0), 
        up: new THREE.Vector3(0, 0, 1), 
        Component: Test, 
        ...surfaceDeps
      })
    ]);

    const bgRenderer = new THREE.WebGLRenderer({ alpha: true });
    bgRenderer.setClearColor(0x000000, 0);
    bgRenderer.setPixelRatio(window.devicePixelRatio);
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.domElement.style.position = 'absolute';
    bgRenderer.domElement.style.top = 0;
    bgRenderer.domElement.style.left = 0;
    appContent.current.appendChild(bgRenderer.domElement);

    const cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.left = 0;
    appContent.current.appendChild(cssRenderer.domElement);

    const glRenderer = new THREE.WebGLRenderer({ alpha: true });
    glRenderer.setClearColor(0x000000, 0);
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.top = 0;
    glRenderer.domElement.style.left = 0;
    glRenderer.domElement.style.pointerEvents = 'none';
    appContent.current.appendChild(glRenderer.domElement);

    const animate = (time) => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      bgRenderer.render(bgScene, scCamera.current.camera);
      cssRenderer.render(cssScene, scCamera.current.camera);
      glRenderer.render(glScene, scCamera.current.camera);
      update(time);
    };

    animate();
  }, []);

  useEffect(() => {
    scCamera.current.goToSurface(cameraView);
  }, [cameraView]);

  const surfaceComponents = surfaces.map((surface, i) =>
    <surface.Component key={i} cameraView={cameraView} setCameraView={setCameraView} surface={surface} />
  );

  return (
    <Fragment>
      {surfaceComponents}
      <div className="app">
        <div className="app__content" ref={appContent} />
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
