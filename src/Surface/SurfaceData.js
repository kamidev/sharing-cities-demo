import { MeshBasicMaterial, DoubleSide, PlaneBufferGeometry, Mesh, NoBlending, Quaternion } from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { Tween, Easing } from 'es6-tween';
import { refresh } from '../render';
import './Surface.css';

const material = new MeshBasicMaterial({
  opacity: 0,
  color: 0x000000,
  side: DoubleSide,
  blending: NoBlending
});

export default class SurfaceData {
  constructor(...args) {
    this.initialize(...args);
  }

  initialize({ width, height, position, rotation, up, glScene, cssScene, camera, isClickable = true, resolutionScale = 1, parent = null }) {
    this.width = width;
    this.height = height;
    this.resolutionScale = resolutionScale;
    this.originalPosition = position.clone();
    this.originalRotation = rotation.clone();
    this.originalUp = up.clone();
    this.atOriginalPosition = true;

    this.parent = parent;
    this.camera = camera;

    this.element = document.createElement('div');
    this.element.style.width = `${width * this.resolutionScale}px`;
    this.element.style.height = `${height * this.resolutionScale}px`;
    this.element.style.opacity = 1;

    this.object = new CSS3DObject(this.element);
    this.object.position.copy(position);
    this.object.rotation.copy(rotation);
    this.object.scale.set(1 / this.resolutionScale, 1 / this.resolutionScale, 1 / this.resolutionScale);

    this.geometry = new PlaneBufferGeometry(width, height);
    this.mesh = new Mesh(this.geometry, material);
    this.mesh.position.copy(position);
    this.mesh.rotation.copy(rotation);
    this.mesh.up = up;
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;

    // if we don't refresh here, there's no guarantee the surface exists in the DOM once we start doing stuff with it!
    glScene.add(this.mesh);
    cssScene.add(this.object);
    refresh();
  
    // put this here (as opposed to its own class member) so we can borrow the scenes.
    this.destroy = () => {
      glScene.remove(this.mesh);
      cssScene.remove(this.object);
      refresh();
    };
  }

  updateLayout(position, rotation, up) {
    this.originalPosition = position.clone();
    this.originalRotation = rotation.clone();
    this.originalUp = up.clone();

    this.object.position.copy(position);
    this.object.rotation.copy(rotation);
    this.mesh.position.copy(position);
    this.mesh.rotation.copy(rotation);
    this.mesh.up = up;
  }

  moveToCamera() {
    const [position, rotation] = this.camera.toCamera(this);
    if (this.mesh.position.manhattanDistanceTo(position) < Number.EPSILON) return;
    
    this.moveTransition(position, rotation);
    this.atOriginalPosition = false;
  }

  moveToOriginal() {
    if (this.mesh.position.manhattanDistanceTo(this.originalPosition) < Number.EPSILON) return;

    this.moveTransition(this.originalPosition, this.originalRotation);
    this.atOriginalPosition = true;
  }

  moveToggle() {
    if (this.atOriginalPosition) this.moveToCamera();
    else this.moveToOriginal();
  }

  moveTransition(targetPosition, targetRotation) {
    // TWEEN
    const duration = 200;

    new Tween(this.object.position).easing(Easing.Cubic.Out).to({
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z
    }, duration).start();
    new Tween(this.mesh.position).easing(Easing.Cubic.Out).to({
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z
    }, duration).start();

    // NOTE: there's also nlerp (for performance maybe?)
    // http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It/
    const startQuaternion = new Quaternion();
    startQuaternion.setFromEuler(this.mesh.rotation);
    const endQuaternion = new Quaternion();
    endQuaternion.setFromEuler(targetRotation);
    let q = new Quaternion();
    new Tween({t: 0}).to({t: 1}, duration).easing(Easing.Cubic.Out).on('update', ({t}) =>{
      Quaternion.slerp(startQuaternion, endQuaternion, q, t);
      this.mesh.quaternion.copy(q);
      this.object.quaternion.copy(q);
    }).start();
  }
}