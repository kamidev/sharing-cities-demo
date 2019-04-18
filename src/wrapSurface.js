import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './WrappedSurface.css';

export default function wrapSurface(SurfaceComponent) {
  function WrappedSurface(props) {
    const isCameraHere = props.cameraView === props.surface;
    const isCameraOverview = props.cameraView === null;

    return createPortal((
      <div className="wrapped-surface">
        <div className={`wrapped-surface__content ${!isCameraHere ? 'wrapped-surface__content--no-pointer' : ''}`}>
          <SurfaceComponent {...props} />
        </div>
        <div
          className={`wrapped-surface__overlay ${!isCameraOverview ? 'wrapped-surface__overlay--hidden' : ''}`}
          onClick={() => props.setCameraView(props.surface)}
        />
      </div>
    ), props.surface.element);
  };

  WrappedSurface.propTypes = {
    cameraView: PropTypes.object,
    setCameraView: PropTypes.func.isRequired,
    surface: PropTypes.object.isRequired
  };

  return WrappedSurface;
}

