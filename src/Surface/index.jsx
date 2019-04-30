import React, { useRef, cloneElement } from 'react';
import { Vector3, Euler, Scene } from 'three-full';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import SurfaceData from './SurfaceData';
import SCCamera from '../SCCamera';
import './Surface.css';

function Surface(props) {
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const surfaceData = useRef(null);
  function getSurfaceData() {
    if (surfaceData.current !== null) return surfaceData.current;
    surfaceData.current = new SurfaceData(props);
    return surfaceData.current;
  }

  return createPortal((
    <div className="surface" style={{ fontSize: `${10 / getSurfaceData().scaleFactor}px` }}>
      {cloneElement(props.children, { surface: getSurfaceData() })}
    </div>
  ), getSurfaceData().element);
}

// make sure this matches the args in SurfaceData.js
Surface.propTypes = {
  width: PropTypes.number.isRequired, 
  height: PropTypes.number.isRequired,
  position: PropTypes.instanceOf(Vector3).isRequired,
  rotation: PropTypes.instanceOf(Euler).isRequired,
  up: PropTypes.instanceOf(Vector3).isRequired, 
  glScene: PropTypes.instanceOf(Scene).isRequired, 
  cssScene: PropTypes.instanceOf(Scene).isRequired, 
  camera: PropTypes.instanceOf(SCCamera).isRequired, 
  isClickable: PropTypes.bool, 
  scaleFactor: PropTypes.number, 
  parent: PropTypes.instanceOf(SurfaceData),
  children: PropTypes.element.isRequired
};

export default Surface;