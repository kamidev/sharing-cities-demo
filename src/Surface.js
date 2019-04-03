import React from 'react';
import { render } from 'react-dom';
import { MeshBasicMaterial, DoubleSide, CSS3DObject, PlaneBufferGeometry, Mesh, NoBlending } from 'three-full';

const material = new MeshBasicMaterial({
  opacity: 0,
  color: 0x000000,
  side: DoubleSide,
  blending: NoBlending
});

export default class Surface {
  constructor(width, height, position, rotation, Component, cameraView, setCameraView) {
    this.width = width;
    this.height = height;

    this.element = document.createElement('div');
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.opacity = 1;

    this.object = new CSS3DObject(this.element);
    this.object.position.copy(position);
    this.object.rotation.copy(rotation);

    this.Component = Component;
    this.cameraView = cameraView;
    this.setCameraView = setCameraView;

    this.geometry = new PlaneBufferGeometry(width, height);
    this.mesh = new Mesh(this.geometry, material);
    this.mesh.position.copy(position);
    this.mesh.rotation.copy(rotation);
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
  }

  update(cameraView) {
    this.cameraView = cameraView;
    this.render();
  }

  load(glScene, cssScene) {
    glScene.add(this.mesh);
    cssScene.add(this.object);
  }

  render() {
    if (this.Component !== null)
      render(<this.Component cameraView={this.cameraView} setCameraView={this.setCameraView} surface={this} />, this.element);
  }
}