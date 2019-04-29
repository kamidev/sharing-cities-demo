import { MeshBasicMaterial, DoubleSide, CSS3DObject, PlaneBufferGeometry, Mesh, NoBlending, Quaternion } from 'three-full';
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

  initialize({ width, height, position, rotation, up, glScene, cssScene, toCamera, isClickable = true, scaleFactor = 1, parent = null }) {
    this.width = width;
    this.height = height;
    this.scaleFactor = scaleFactor;
    this.originalPosition = position.clone();
    this.originalRotation = rotation.clone();
    this.originalUp = up;
    this.atOriginalPosition = true;

    this.parent = parent;
    this.toCamera = () => toCamera(this);

    this.element = document.createElement('div');
    this.element.style.width = `${width / scaleFactor}px`;
    this.element.style.height = `${height / scaleFactor}px`;
    this.element.style.opacity = 1;

    this.object = new CSS3DObject(this.element);
    this.object.position.copy(position);
    this.object.rotation.copy(rotation);
    this.object.scale.set(scaleFactor, scaleFactor, scaleFactor);

    this.geometry = new PlaneBufferGeometry(width, height);
    this.mesh = new Mesh(this.geometry, material);
    this.mesh.position.copy(position);
    this.mesh.rotation.copy(rotation);
    this.mesh.up = up;
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;

    glScene.add(this.mesh);
    cssScene.add(this.object);
    refresh();
    // if we don't refresh here, there's no guarantee the surface exists in the DOM once we start doing stuff with it!
  }

  moveToCamera() {
    const [position, rotation] = this.toCamera();
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