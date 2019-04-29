import React, { Component, cloneElement } from 'react';
import { Vector3, Euler, Scene } from 'three-full';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import SurfaceData from './SurfaceData';
import './Surface.css';

// NOTE: This is a class component instead of a functional component because we can save an update
// by creating surfaceData in the constructor. Otherwise it would be an additional update. Also cleaner code.
class Surface extends Component {
  constructor(props) {
    super(props);
    this.surfaceData = new SurfaceData(props);
  }

  render() {
    return createPortal((
      <div className="surface" style={{ fontSize: `${10 / this.surfaceData.scaleFactor}px` }}>
        {cloneElement(this.props.children, { surface: this.surfaceData })}
      </div>
    ), this.surfaceData.element);
  }
}

Surface.propTypes = {
  width: PropTypes.number.isRequired, 
  height: PropTypes.number.isRequired,
  position: PropTypes.instanceOf(Vector3).isRequired,
  rotation: PropTypes.instanceOf(Euler).isRequired,
  up: PropTypes.instanceOf(Vector3).isRequired, 
  glScene: PropTypes.instanceOf(Scene).isRequired, 
  cssScene: PropTypes.instanceOf(Scene).isRequired, 
  toCamera: PropTypes.func.isRequired, 
  isClickable: PropTypes.bool, 
  scaleFactor: PropTypes.number, 
  parent: PropTypes.instanceOf(SurfaceData),
  children: PropTypes.element.isRequired
};

export default Surface;