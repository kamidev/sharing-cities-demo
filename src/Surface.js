import { MeshBasicMaterial, DoubleSide, CSS3DObject, PlaneBufferGeometry, Mesh, NoBlending } from 'three-full';
import wrapSurface from './wrapSurface';

const material = new MeshBasicMaterial({
  opacity: 0,
  color: 0x000000,
  side: DoubleSide,
  blending: NoBlending
});

export default class Surface {
  constructor({ width, height, position, rotation, up, Component, cameraView, setCameraView, glScene, cssScene }) {
    this.width = width;
    this.height = height;

    this.element = document.createElement('div');
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.opacity = 1;

    this.object = new CSS3DObject(this.element);
    this.object.position.copy(position);
    this.object.rotation.copy(rotation);

    this.Component = wrapSurface(Component);
    this.cameraView = cameraView;
    this.setCameraView = setCameraView;

    this.geometry = new PlaneBufferGeometry(width, height);
    this.mesh = new Mesh(this.geometry, material);
    this.mesh.position.copy(position);
    this.mesh.rotation.copy(rotation);
    this.mesh.up = up;
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;

    glScene.add(this.mesh);
    cssScene.add(this.object);
  }
}