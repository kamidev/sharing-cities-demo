import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import CameraContext from "../contexts/CameraContext";

/**
 * The HOC component will apply a behaviour to a surface so that when it is clicked,
 * the camera will move towards the surface.
 *
 * Use when defining Surfaces, i.e. export default withMainSurface(TestSurface);
 */
export default function withMainSurface(Component) {
  function MainSurface(props) {
    const { cameraView, setCameraView } = useContext(CameraContext);

    const isCameraHere = cameraView === props.surface;
    const isCameraOverview = cameraView === null;

    return (
      <Fragment>
        <div
          className={`surface__content ${
            !isCameraHere ? "surface__content--no-pointer" : ""
          }`}
        >
          <Component {...props} />
        </div>
        <div
          className={`surface__overlay ${
            !isCameraOverview ? "surface__overlay--hidden" : ""
          }`}
          onClick={() => setCameraView(props.surface)}
        />
      </Fragment>
    );
  }

  MainSurface.propTypes = {
    surface: PropTypes.object
  };

  return MainSurface;
}
