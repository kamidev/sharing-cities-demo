import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import withMainSurface from "./Surface/withMainSurface";
import CameraContext from "./contexts/CameraContext";
import "./Test.css";

/**
 * Garbage test Surface, just to verify some basic functionality.
 */
function Test(props) {
  const [test, setTest] = useState(0);
  const { cameraView } = useContext(CameraContext);

  const isCameraHere = cameraView === props.surface;

  return (
    <div className="test">
      <h1>Hello World</h1>
      <p>{test}</p>
      {isCameraHere && <h3>Camera is here</h3>}
      <button onClick={() => setTest(test + 1)}>Click me</button>
    </div>
  );
}

Test.propTypes = {
  surface: PropTypes.object.isRequired
};

export default withMainSurface(Test);
