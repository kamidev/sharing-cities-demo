import React from 'react';
import { render } from 'react-dom';
import { MeshBasicMaterial, CSS3DObject, PlaneBufferGeometry, Mesh } from 'three-full';

const material = new MeshBasicMaterial();

export default class Surface {
  constructor(width, height, color, position, rotation, Component = null) {
    this.element = document.createElement('div');
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.opacity = 1;
    this.element.style.background = color;

    this.object = new CSS3DObject(this.element);
    this.object.position.copy(position);
    this.object.rotation.copy(rotation);

    this.geometry = new PlaneBufferGeometry(width, height);
    this.mesh = new Mesh(this.geometry, material);
    this.mesh.position.copy(this.object.position);
    this.mesh.rotation.copy(this.object.rotation);

    this.Component = Component;
  }

  load(glScene, cssScene) {
    glScene.add(this.mesh);
    cssScene.add(this.object);
  }

  render() {
    if (this.Component !== null)
      render(<this.Component />, this.element);
  }
}