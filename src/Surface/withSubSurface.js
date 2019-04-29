import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

const isCameraParent = (cameraView, parent) => {
  if (parent === null) return false;
  if (cameraView === parent) return true;
  return isCameraParent(cameraView, parent.parent);
};

export default function withSubSurface(Component) {
  function SubSurface(props) {
    // if surface has a parent and the camera is not on that parent, disable pointer events
    useEffect(() => {
      if (isCameraParent(props.cameraView, props.surface.parent)) {
        props.surface.object.element.className = "";
      } else {
        props.surface.object.element.className = "pointer-events-none";
      }
    }, [props.cameraView, props.surface]);

    // when going back to overview, ensure that the surface goes back to its original position.
    useEffect(() => {
      if (props.cameraView !== null) return;
      props.surface.moveToOriginal();
    }, [props.cameraView, props.surface]);

    return (
      <Fragment>
        <div className="surface__content">
          <Component {...props} />
        </div>
        <div
          className={`surface__overlay ${!isCameraParent(props.cameraView, props.surface.parent) ? 'surface__overlay--hidden' : ''}`}
          onClick={() => props.surface.moveToggle()}
        />
      </Fragment>
    );
  };

  SubSurface.propTypes = {
    cameraView: PropTypes.object,
    setCameraView: PropTypes.func,
    surface: PropTypes.object
  };

  return SubSurface;
}
