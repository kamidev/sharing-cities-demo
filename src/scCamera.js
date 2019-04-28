import { PerspectiveCamera, Vector3, Euler, _Math, Quaternion } from 'three-full';
import { Tween, Easing } from 'es6-tween';

export default class SCCamera {
  constructor() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);

    this.defaultPosition = new Vector3(0, 0, -1800);
    this.defaultRotation = new Euler(0, Math.PI, 0);

    this.camera.position.copy(this.defaultPosition);
    this.camera.rotation.copy(this.defaultRotation);

    this.transitionInfo = {
      running: false,
      targetPosition: null,
      targetRotation: null,
    };

    this.positionTween = null;
    this.rotationTween = null;
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

    // padding is empty space in pixels (on screen) above and below the surface
    const padding = 100;
    const fov = _Math.degToRad(this.camera.fov);
    const q = 2 * padding / window.innerHeight;
    const dist = (surface.height / (1 - q)) / (2 * Math.tan(fov / 2));

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
    this.transitionInfo = {
      targetPosition,
      targetRotation
    };

    // TWEEN
    const duration = 800;

    this.positionTween = new Tween(this.camera.position).easing(Easing.Cubic.Out).to({
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
    this.rotationTween = new Tween({t: 0}).to({t: 1}, duration).easing(Easing.Cubic.Out).on('update', ({t}) =>{
      Quaternion.slerp(startQuaternion, endQuaternion, q, t);
      this.camera.quaternion.copy(q);
    }).start();
  }

  isTransitionRunning() {
    if (this.positionTween === null || this.rotationTween === null) return false;
    return this.positionTween.isPlaying() || this.rotationTween.isPlaying();
  }

  // returns [position, rotation]
  toCamera(surface) {
    const cameraOriginalPosition = this.camera.position.clone();
    const cameraOriginalRotation = this.camera.rotation.clone();
    let transition = this.isTransitionRunning(); // In the TINY chance that running changes while this function is running, store its value here and use that instead.
    if (transition) {
      this.camera.position.copy(this.transitionInfo.targetPosition);
      this.camera.rotation.copy(this.transitionInfo.targetRotation);
    }

    // padding is empty space in pixels (on screen) above and below the surface
    const padding = 100;
    const fov = _Math.degToRad(this.camera.fov);
    const q = 2 * padding / window.innerHeight;
    const dist = (surface.height / (1 - q)) / (2 * Math.tan(fov / 2));

    const worldPosition = new Vector3();
    this.camera.getWorldPosition(worldPosition);

    const targetPosition = new Vector3();
    this.camera.getWorldDirection(targetPosition);
    targetPosition.multiplyScalar(dist);
    targetPosition.add(worldPosition);

    const startPosition = surface.mesh.position.clone();
    const startRotation = surface.mesh.rotation.clone();

    surface.mesh.position.copy(targetPosition);
    surface.mesh.lookAt(worldPosition);
    const targetRotation = surface.mesh.rotation.clone();

    surface.mesh.position.copy(startPosition);
    surface.mesh.rotation.copy(startRotation);

    if (transition) {
      this.camera.position.copy(cameraOriginalPosition);
      this.camera.rotation.copy(cameraOriginalRotation);
    }
    return [targetPosition, targetRotation];
  }
}