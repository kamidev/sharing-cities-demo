import React, { useState, useEffect, Fragment } from 'react';
import { Vector3, Euler } from 'three-full';
import { Helmet } from 'react-helmet';
import Surface from './Surface';
import Test from './Test.jsx';
import Board from './Board';
import { scCamera, surfaceDeps } from './render';
import withMainSurface from './Surface/withMainSurface';
import './App.css';

const leftWallProps = {
  width: 1000,
  height: 1000, 
  position: new Vector3(500, 0, -500), 
  rotation: new Euler(0, -Math.PI / 2, 0), 
  up: new Vector3(0, 1, 0), 
  ...surfaceDeps
};
const backWallProps = {
  width: 1000, 
  height: 1000, 
  position: new Vector3(0, 0, 0), 
  rotation: new Euler(0, Math.PI, 0), 
  up: new Vector3(0, 1, 0), 
  ...surfaceDeps
};
const rightWallProps = {
  width: 1000, 
  height: 1000, 
  position: new Vector3(-500, 0, -500), 
  rotation: new Euler(0, Math.PI / 2, 0), 
  up: new Vector3(0, 1, 0), 
  ...surfaceDeps
};
const floorProps = {
  width: 1000, 
  height: 1000, 
  position: new Vector3(0, -500, -500), 
  rotation: new Euler(Math.PI / 2, Math.PI, 0), 
  up: new Vector3(0, 0, 1), 
  ...surfaceDeps
};

const Embedded = withMainSurface(() => {
  return (
    <div className="embedded">
      <div id="customize-script-container">
      </div>
      <Helmet>
        <script type='text/javascript' src='https://darksky.net/widget/graph/59.8194,17.7822/si12/en.js?width=100%&height=500&title=Hammarby&textColor=333333&bgColor=FFFFFF&transparency=true&fontFamily=Default&customFont=&units=si&graph=temperature_graph&timeColor=333333&tempColor=333333&lineColor=333333&markerColor=333333'></script>
      </Helmet>
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
      <Surface {...leftWallProps}>
        <Embedded cameraView={cameraView} setCameraView={setCameraView} />
      </Surface>
      <Surface {...backWallProps}>
        <Board cameraView={cameraView} setCameraView={setCameraView} />
      </Surface>
      <Surface {...rightWallProps}>
        <Test cameraView={cameraView} setCameraView={setCameraView} />
      </Surface>
      <Surface {...floorProps}>
        <Test cameraView={cameraView} setCameraView={setCameraView} />
      </Surface>

      <div className="app">
        <div className="app__content" />
        <div className="app__overlay">
          {cameraView !== null &&
            <div className="app__back-to-overlay" onClick={() => setCameraView(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="6 6 36 36">
                  <path d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z"/>
              </svg>
              <div>
                <span>Back to overview</span>
              </div>
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;
