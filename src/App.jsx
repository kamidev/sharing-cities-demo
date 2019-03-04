import React, { createRef, useEffect } from 'react';
import * as THREE from 'three-full';
import Surface from './Surface';
import Test from './Test.jsx';
import './App.css';

function App() {
  const app = createRef();

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth, window.innerHeight, 1, 5000);
    camera.position.set(0, 0 , -1500);

    new THREE.OrbitControls(camera);

    const glScene = new THREE.Scene();
    glScene.background = new THREE.Color(0xf0f0f0);
    const cssScene = new THREE.Scene();

    const surfaces = [
      new Surface(1000, 1000, 'CHOCOLATE', new THREE.Vector3(500, 0, -500), new THREE.Euler(0, -Math.PI / 2, 0), Test),
      new Surface(1000, 1000, 'MEDIUMVIOLETRED', new THREE.Vector3(0, 0, 0), new THREE.Euler(0, Math.PI, 0), Test),
      new Surface(1000, 1000, 'LAVENDER', new THREE.Vector3(-500, 0, -500), new THREE.Euler(0, Math.PI / 2, 0), Test),
      new Surface(1000, 1000, 'MEDIUMAQUAMARINE', new THREE.Vector3(0, 500, -500), new THREE.Euler(Math.PI / 2, 0, Math.PI), Test),
      new Surface(1000, 1000, 'LAVENDERBLUSH', new THREE.Vector3(0, -500, -500), new THREE.Euler(Math.PI / 2, Math.PI, 0), Test)
    ];

    for (const surface of surfaces) {
      surface.load(glScene, cssScene);
      surface.render();
    }

    const glRenderer = new THREE.WebGLRenderer();
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    app.current.appendChild(glRenderer.domElement);

    const cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    app.current.appendChild(cssRenderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      glRenderer.render(glScene, camera);
      cssRenderer.render(cssScene, camera);
    };

    animate();

  }, []);

  

  return (
    <div className="App" ref={app}>
    </div>
  );
}

export default App;
