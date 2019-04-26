import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import withMainSurface from './Surface/withMainSurface';
import './Test.css';

function Test(props) {
  const [test, setTest] = useState(0);
  const buttonRef = useRef(null);

  const isCameraHere = props.cameraView === props.surface;

  return (
    <div className="test">
      <h1>Hello World</h1>
      <p>{test}</p>
      {isCameraHere &&
        <h3>Camera is here</h3>
      }
      <button onClick={() => setTest(test + 1)} ref={buttonRef}>Click me</button>
    </div>
  );
}

Test.propTypes = {
  cameraView: PropTypes.object,
  setCameraView: PropTypes.func.isRequired,
  surface: PropTypes.object.isRequired
};

export default withMainSurface(Test);
