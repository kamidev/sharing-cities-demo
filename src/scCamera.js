import { PerspectiveCamera, Vector3, _Math } from 'three-full';
import { Tween } from 'es6-tween';

export default class SCCamera {
  constructor() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    this.goToOverview();
  }

  reset() {
    this.camera.position.set(0, 0, 0);
    this.camera.rotation.set(0, 0, 0);
  }

  goToOverview() {
    this.reset();
    this.camera.position.z = -1800;
    this.camera.rotation.y = Math.PI;
  }

  goToSurface(surface) {
    if (surface === null) {
      this.goToOverview();
      return;
    }

    const fov = _Math.degToRad(this.camera.fov);
    const dist = (surface.height + 200) / (2 * Math.tan(fov / 2));

    const worldPosition = new Vector3();
    surface.mesh.getWorldPosition(worldPosition);

    const endPosition = new Vector3();
    surface.mesh.getWorldDirection(endPosition);
    endPosition.multiplyScalar(dist);
    endPosition.add(worldPosition);

    const startPosition = this.camera.position.clone();
    const startRotation = this.camera.rotation.clone();

    this.camera.position.copy(endPosition);
    this.camera.lookAt(worldPosition);
    const endRotation = this.camera.rotation.clone();

    this.camera.position.copy(startPosition);
    this.camera.rotation.copy(startRotation);

    // TWEEN
    /*const t1 = new Tween(this.camera.position).to({
      x: endPosition.x,
      y: endPosition.y,
      z: endPosition.z
    }, 1000).start();

    const t2 = new Tween(this.camera.rotation).to({
      x: endRotation.x,
      y: endRotation.y,
      z: endRotation.z
    }, 1000).start();*/

    this.camera.position.copy(endPosition);
    this.camera.rotation.copy(endRotation);
  }
}