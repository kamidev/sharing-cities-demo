import React, { useContext, useState, useEffect, Fragment } from "react";
import { Vector3, Euler } from "three";
import Embed from "react-embed";
import Surface from "./Surface";
import Test from "./Test.jsx";
import Board from "./Board";
import MapTest from "./Map";
import { scCamera, surfaceDeps } from "./render";
import withMainSurface from "./Surface/withMainSurface";
import CameraContext from "./contexts/CameraContext";
import Header from "./components/Header";
import { Auth0Context, useAuth0 } from "./contexts/auth0-context";
import "bulma/css/bulma.css";
import "./App.css";
import poster_small from "./poster_small.png";

// define props for all the main surfaces here, easier that way!
const farLeftWallProps = {
  width: 1000,
  height: 1000,
  position: new Vector3(1620, 0, -940),
  rotation: new Euler(0, (-2 * Math.PI) / 3, 0),
  up: new Vector3(0, 1, 0),
  ...surfaceDeps
};
const middleLeftWallProps = {
  width: 1000,
  height: 1000,
  position: new Vector3(935, 0, -265),
  rotation: new Euler(0, (-5 * Math.PI) / 6, 0),
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
const middleRightWallProps = {
  width: 1000,
  height: 1000,
  position: new Vector3(-930, 0, -270),
  rotation: new Euler(0, (5 * Math.PI) / 6, 0),
  up: new Vector3(0, 1, 0),
  ...surfaceDeps
};
const farRightWallProps = {
  width: 1000,
  height: 1000,
  position: new Vector3(-1620, 0, -940),
  rotation: new Euler(0, (2 * Math.PI) / 3, 0),
  up: new Vector3(0, 1, 0),
  ...surfaceDeps
};

const EmbeddedYouTube = withMainSurface(() => {
  return (
    <div className="embedded_youtube">
      <div id="customize-script-container"></div>
      <Embed url="https://www.youtube.com/watch?v=DcvyXDctjNA" />
      {/* <Embed url="https://www.youtube.com/watch?v=soICQ3B2kEk" /> */}
    </div>
  );
});
const EmbeddedTwitter = withMainSurface(() => {
  return (
    <div className="embedded_twitter">
      <div id="customize-script-container"></div>
      <Embed url="https://twitter.com/CitiesSharing/status/1196350216049496064" />
    </div>
  );
});

function App(props) {
  const [cameraView, setCameraView] = useState(null);
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  const auth0 = useContext(Auth0Context);

  useEffect(() => {
    scCamera.goToSurface(cameraView);
  }, [cameraView]);

  return (
    <>
      <Fragment>
        <Header />
        {!isLoading && !user && (
          <>
            <div className="info_before_login">
              <p className="c9">
                <span className="c17">
                  Sidan är under uppbyggnad – välkomna tillbaka senare i
                  februari!
                </span>
              </p>
              <p className="c9">
                <span>
                  Tills vidare kan ni i BRF Knallen och Holmen fylla i enkäten
                  ovan.
                </span>
              </p>
              <br />
              <img src={poster_small} alt="Image missing" />
            </div>
          </>
        )}
        {!isLoading && user && (
          <div className="hero is-info is-fullheight">
            <div className="hero-body">
              <CameraContext.Provider
                value={{
                  cameraView,
                  setCameraView
                }}
              >
                <Surface {...farLeftWallProps}>
                  <EmbeddedTwitter />
                </Surface>
                <Surface {...middleLeftWallProps}>
                  <EmbeddedYouTube />
                </Surface>
                <Surface {...backWallProps}>
                  <Board />
                </Surface>
                <Surface {...middleRightWallProps}>
                  <MapTest />
                </Surface>
                <Surface {...farRightWallProps}>
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
            </div>
          </div>
        )}
      </Fragment>
    </>
  );
}

export default App;
