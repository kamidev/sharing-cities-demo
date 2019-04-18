import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Test.css';

function Test(props) {
  const [test, setTest] = useState(0);

  const cameraViewIsHere = props.cameraView === props.surface;

  return (
    <div className="test">
      <h1>Hello World</h1>
      <p>{test}</p>
      {cameraViewIsHere &&
        <h3>Camera is here</h3>
      }
      <button onClick={() => setTest(test + 1)}>Click me</button>
    </div>
  );
}

Test.propTypes = {
  cameraView: PropTypes.object,
  setCameraView: PropTypes.func.isRequired,
  surface: PropTypes.object.isRequired
};

export default Test;
