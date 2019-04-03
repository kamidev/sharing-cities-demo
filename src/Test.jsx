import React from 'react';
import PropTypes from 'prop-types';
import './Test.css';

function Test(props) {
  const cameraViewIsHere = props.cameraView === props.surface;
  const cameraViewIsOverview = props.cameraView === null;

  return (
    <div className="test">
      <div className={`test__content ${!cameraViewIsHere ? 'test__content--no-pointer' : ''}`}>
        <h1>Hello World</h1>
        {cameraViewIsHere &&
          <h3>Camera is here</h3>
        }
        <button onClick={() => alert("Hello World")}>Click me</button>
      </div>
      <div
        className={`test__overlay ${!cameraViewIsOverview ? 'test__overlay--hidden' : ''}`}
        onClick={() => props.setCameraView(props.surface)}
      />
    </div>
  );
}

Test.propTypes = {
  cameraView: PropTypes.object,
  setCameraView: PropTypes.func.isRequired,
  surface: PropTypes.object.isRequired
};

export default Test;
