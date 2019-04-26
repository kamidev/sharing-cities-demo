import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function withMainSurface(Component) {
  function MainSurface(props) {
    const isCameraHere = props.cameraView === props.surface;
    const isCameraOverview = props.cameraView === null;

    return (
      <Fragment>
        <div className={`surface__content ${!isCameraHere ? 'surface__content--no-pointer' : ''}`}>
          <Component {...props} />
        </div>
        <div
          className={`surface__overlay ${!isCameraOverview ? 'surface__overlay--hidden' : ''}`}
          onClick={() => props.setCameraView(props.surface)}
        />
      </Fragment>
    );
  };

  MainSurface.propTypes = {
    cameraView: PropTypes.object,
    setCameraView: PropTypes.func,
    surface: PropTypes.object.isRequired
  };

  return MainSurface;
}
