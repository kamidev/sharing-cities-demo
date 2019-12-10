import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import CameraContext from '../CameraContext';

const isCameraParent = (cameraView, parent) => {
  if (parent === null) return false;
  if (cameraView === parent) return true;
  return isCameraParent(cameraView, parent.parent);
};

/**
 * The HOC component will apply a behaviour to a surface so that when it is clicked,
 * the surface will move towards the camera.
 *
 * Use when defining Surfaces, i.e. export default withSubSurface(TestSurface);
 */
export default function withSubSurface(Component) {
  function SubSurface(props) {
    const { cameraView } = useContext(CameraContext);

    // if surface has a parent and the camera is not on that parent, disable pointer events
    useEffect(() => {
      if (isCameraParent(cameraView, props.surface.parent)) {
        props.surface.object.element.className = "";
      } else {
        props.surface.object.element.className = "pointer-events-none";
      }
    }, [cameraView, props.surface]);

    // when going back to overview, ensure that the surface goes back to its original position.
    useEffect(() => {
      if (cameraView !== null) return;
      props.surface.moveToOriginal();
    }, [cameraView, props.surface]);

    return (
      <Fragment>
        <div className="surface__content">
          <Component {...props} />
        </div>
        <div
          className={`surface__overlay ${!isCameraParent(cameraView, props.surface.parent) ? 'surface__overlay--hidden' : ''}`}
          onClick={() => props.surface.moveToggle()}
        />
      </Fragment>
    );
  };

  SubSurface.propTypes = {
    surface: PropTypes.object
  };

  return SubSurface;
}
