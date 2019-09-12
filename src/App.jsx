import React, { useState, useEffect, Fragment } from "react";
import { Vector3, Euler } from "three";
import { Helmet } from "react-helmet";
import Embed from "react-embed";
import Surface from "./Surface";
import Test from "./Test.jsx";
import Board from "./Board";
import MapTest from "./Map";
import { scCamera, surfaceDeps } from "./render";
import withMainSurface from "./Surface/withMainSurface";
import CameraContext from "./CameraContext";
import "./App.css";

const leftWallProps = {
  width: 1000,
  height: 1000,
  position: new Vector3(500, 0, -520),
  rotation: new Euler(0, -Math.PI / 2, 0),
  up: new Vector3(0, 1, 0),
  ...surfaceDeps
};
const backWallProps = {
  width: 1000,
  height: 1000,
  position: new Vector3(0, 0, -20),
  rotation: new Euler(0, Math.PI, 0),
  up: new Vector3(0, 1, 0),
  ...surfaceDeps
};
const rightWallProps = {
  width: 1000,
  height: 1000,
  position: new Vector3(-500, 0, -520),
  rotation: new Euler(0, Math.PI / 2, 0),
  up: new Vector3(0, 1, 0),
  ...surfaceDeps
};
const floorProps = {
  width: 1000,
  height: 1000,
  position: new Vector3(0, -500, -520),
  rotation: new Euler(Math.PI / 2, Math.PI, 0),
  up: new Vector3(0, 0, 1),
  ...surfaceDeps
};

const Embedded = withMainSurface(() => {
  return (
    <div className="embedded">
      <div id="customize-script-container"></div>
      <Embed url="https://www.youtube.com/watch?v=soICQ3B2kEk" />
    </div>
  );
});

function App(props) {
  const [cameraView, setCameraView] = useState(null);

  useEffect(() => {
    scCamera.goToSurface(cameraView);
  }, [cameraView]);

  return (
    <Fragment>
      <CameraContext.Provider
        value={{
          cameraView,
          setCameraView
        }}
      >
        <Surface {...leftWallProps}>
          <Embedded />
        </Surface>
        <Surface {...backWallProps}>
          <Board />
        </Surface>
        <Surface {...rightWallProps}>
          <MapTest />
        </Surface>
        <Surface {...floorProps}>
          <Test />
        </Surface>
      </CameraContext.Provider>

      <div className="app">
        <div className="app__content" />
        <div className="app__overlay">
          {cameraView !== null && (
            <div
              className="app__back-to-overlay"
              onClick={() => setCameraView(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="6 6 36 36"
              >
                <path d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z" />
              </svg>
              <div>
                <span>Back to overview</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
