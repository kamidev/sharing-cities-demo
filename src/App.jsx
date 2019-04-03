import React, { Component, createRef } from 'react';
import * as THREE from 'three-full';
import TWEEN, { update } from 'es6-tween';
import SCCamera from './scCamera.js';
import Surface from './Surface';
import Test from './Test.jsx';
import roomGLB from './assets/glb/room.glb';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraView: null
    };

    this.appContent = createRef();
    this.surfaces = [];
    this.scCamera = new SCCamera();
    this.setCameraView = this.setCameraView.bind(this);
  }

  setCameraView(cameraView) {
    this.setState({cameraView});
  }

  componentDidMount() {
    //new THREE.OrbitControls(scCamera.camera);

    const glScene = new THREE.Scene();
    const bgScene = new THREE.Scene();
    const cssScene = new THREE.Scene();
    
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

    this.surfaces = [
      new Surface(1000, 1000, new THREE.Vector3(500, 0, -500), new THREE.Euler(0, -Math.PI / 2, 0), Test, this.state.cameraView, this.setCameraView),
      new Surface(1000, 1000, new THREE.Vector3(0, 0, 0), new THREE.Euler(0, Math.PI, 0), Test, this.state.cameraView, this.setCameraView),
      new Surface(1000, 1000, new THREE.Vector3(-500, 0, -500), new THREE.Euler(0, Math.PI / 2, 0), Test, this.state.cameraView, this.setCameraView),
      new Surface(1000, 1000, new THREE.Vector3(0, -500, -500), new THREE.Euler(Math.PI / 2, Math.PI, 0), Test, this.state.cameraView, this.setCameraView)
    ];
    for (const surface of this.surfaces) {
      surface.load(glScene, cssScene);
      surface.render();
    }

    const bgRenderer = new THREE.WebGLRenderer({ alpha: true });
    bgRenderer.setClearColor(0x000000, 0);
    bgRenderer.setPixelRatio(window.devicePixelRatio);
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.domElement.style.position = 'absolute';
    bgRenderer.domElement.style.top = 0;
    bgRenderer.domElement.style.left = 0;
    this.appContent.current.appendChild(bgRenderer.domElement);

    const cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.left = 0;
    this.appContent.current.appendChild(cssRenderer.domElement);

    const glRenderer = new THREE.WebGLRenderer({ alpha: true });
    glRenderer.setClearColor(0x000000, 0);
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.top = 0;
    glRenderer.domElement.style.left = 0;
    glRenderer.domElement.style.pointerEvents = 'none';
    this.appContent.current.appendChild(glRenderer.domElement);

    const animate = (time) => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      bgRenderer.render(bgScene, this.scCamera.camera);
      cssRenderer.render(cssScene, this.scCamera.camera);
      glRenderer.render(glScene, this.scCamera.camera);
      update(time);
    };

    animate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cameraView === this.state.cameraView) return;

    for (const surface of this.surfaces) {
      surface.update(this.state.cameraView);
    }
    this.scCamera.goToSurface(this.state.cameraView);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.cameraView !== this.state.cameraView) return true;
    return false;
  }

  render() {
    return (
      <div className="app">
        <div className="app__content" ref={this.appContent} />
        <div className="app__overlay">
          {this.state.cameraView !== null &&
            <button onClick={() => this.setState({cameraView: null})}>Overview</button>
          }
        </div>
      </div>
    );
  }
}

export default App;
