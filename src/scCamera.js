import { PerspectiveCamera, Vector3, Euler, _Math, Quaternion } from 'three-full';
import { Tween, Easing } from 'es6-tween';

export default class SCCamera {
  constructor() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);

    this.defaultPosition = new Vector3(0, 0, -1800);
    this.defaultRotation = new Euler(0, Math.PI, 0);

    this.camera.position.copy(this.defaultPosition);
    this.camera.rotation.copy(this.defaultRotation);
  }

  goToOverview() {
    this.transition(this.defaultPosition, this.defaultRotation);
  }

  goToSurface(surface) {
    if (surface === null) {
      this.goToOverview();
      return;
    }

    this.camera.up.copy(surface.mesh.up);

    const fov = _Math.degToRad(this.camera.fov);
    const dist = (surface.height + 100) / (2 * Math.tan(fov / 2));

    const worldPosition = new Vector3();
    surface.mesh.getWorldPosition(worldPosition);

    const targetPosition = new Vector3();
    surface.mesh.getWorldDirection(targetPosition);
    targetPosition.multiplyScalar(dist);
    targetPosition.add(worldPosition);

    const startPosition = this.camera.position.clone();
    const startRotation = this.camera.rotation.clone();

    this.camera.position.copy(targetPosition);
    this.camera.lookAt(worldPosition);
    const targetRotation = this.camera.rotation.clone();

    this.camera.position.copy(startPosition);
    this.camera.rotation.copy(startRotation);

    this.transition(targetPosition, targetRotation)
  }

  transition(targetPosition, targetRotation) {
    // TWEEN
    const duration = 800;

    new Tween(this.camera.position).easing(Easing.Cubic.Out).to({
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z
    }, duration).start();

    // NOTE: there's also nlerp (for performance maybe?)
    // http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It/
    const startQuaternion = new Quaternion();
    startQuaternion.setFromEuler(this.camera.rotation);
    const endQuaternion = new Quaternion();
    endQuaternion.setFromEuler(targetRotation);
    let q = new Quaternion();
    new Tween({t: 0}).to({t: 1}, duration).easing(Easing.Cubic.Out).on('update', ({t}) =>{
      Quaternion.slerp(startQuaternion, endQuaternion, q, t);
      this.camera.quaternion.copy(q);
    }).start();
  }
}