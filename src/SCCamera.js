import { PerspectiveCamera, Vector3, Euler, Math as _Math, Quaternion } from 'three';
import { Tween, Easing } from 'es6-tween';

/** 
 * This class contains all code pertaining to camera functionality,
 * specifically camera movement (right now).
 */
export default class SCCamera {
  constructor() {
    this.camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);

    this.defaultPosition = new Vector3(0, 0, -3000);
    this.defaultRotation = new Euler(0, Math.PI, 0);

    this.camera.position.copy(this.defaultPosition);
    this.camera.rotation.copy(this.defaultRotation);

    this.transitionInfo = {
      targetPosition: null,
      targetRotation: null,
    };

    this.positionTween = null;
    this.rotationTween = null;
  }

  /**
   * Move camera to overview (default) position
   */
  goToOverview() {
    this.transition(this.defaultPosition, this.defaultRotation);
  }

  /** 
   * Move camera to look at a given surface.
   */
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

  /** 
   * Used for animated the camera to a given target position and target rotation.
   *
   * NOTE: When using this, make sure that the cameras up vector is correct or it might look weird!
   */
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

  /** 
   * Returns true if camera is currently moving
   */
  isTransitionRunning() {
    if (this.positionTween === null || this.rotationTween === null) return false;
    return this.positionTween.isPlaying() || this.rotationTween.isPlaying();
  }

  /**
   * Helper function which tells a surface where it needs to move
   * to be positioned and oriented directly in front of the camera.
   *
   * See Surface/SurfaceData.js.
   *
   * Returns [position, rotation]
   */
  toCamera(surface) {
    const cameraOriginalPosition = this.camera.position.clone();
    const cameraOriginalRotation = this.camera.rotation.clone();
    let transition = this.isTransitionRunning(); // In the TINY chance that running changes while this function is running, store its value here and use that instead.
    if (transition) {
      this.camera.position.copy(this.transitionInfo.targetPosition);
      this.camera.rotation.copy(this.transitionInfo.targetRotation);
    }

    // padding is empty space in pixels (on screen) above and below the surface
    const padding = 80;
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