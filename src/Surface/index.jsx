import React, { useRef, cloneElement, useEffect, useCallback } from 'react';
import { Vector3, Euler, Scene } from 'three-full';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import SurfaceData from './SurfaceData';
import SCCamera from '../SCCamera';
import './Surface.css';

function Surface(props) {
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const surfaceData = useRef(null);

  // this is only a useCallback hook because the linter said to make it so, apparently it can cause unnecessary re-renders in the useEffect hook below otherwise
  const getSurfaceData = useCallback(
    () => {
      if (surfaceData.current !== null) return surfaceData.current;
      surfaceData.current = new SurfaceData(props);
      return surfaceData.current;
    },
    [props]
  );

  // if we get new layout props, update the 3d surface
  useEffect(() => {
    getSurfaceData().updateLayout(props.position, props.rotation, props.up);
  }, [getSurfaceData, props.position, props.rotation, props.up])

  // remove surface when destroying the component
  useEffect(() => {
    return () => {
      surfaceData.current.destroy();
    };
  }, []);

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