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
              <h1 className="c6" id="h.vrhvb96nxxe9">
                <span>Rubriker</span>
              </h1>
              <ul className="c0 lst-kix_i5yx34vs96em-0 start" start={1}>
                <li className="c2">
                  <span>Avsiktsförklaring</span>
                </li>
                <li className="c2">
                  <span>Bakgrund</span>
                </li>
                <li className="c2">
                  <span>Användning, handhavande</span>
                </li>
                <li className="c2">
                  <span>Vanliga frågor (FAQ)</span>
                </li>
                <li className="c2">
                  <span>Hantering av personuppgifter</span>
                </li>
              </ul>
              <h1 className="c6" id="h.fnjk6vnqzbqk">
                <span>Avsiktförklaring</span>
              </h1>
              <h2 className="c8" id="h.iwerjkqkfkua">
                <span>Låna av varandra</span>
              </h2>
              <p className="c9">
                <span className="c17">
                  Cirkulär ekonomi innebär att man försöker tära mindre på
                  naturens resurser, och där ingår en tanke; en strävan efter
                  att kunna återanvända istället för att ständigt slänga och
                  köpa nytt. Allt man har används ju inte heller hela tiden,
                  kanske har du något du skulle kunna tänka dig att låna ut?
                </span>
              </p>
              <p className="c9">
                <span className="c23">
                  Vi hoppas att många kan fatta bra beslut, och att det ska vara
                  enkelt att låna ut saker, och att Lånelådan ska kunna hjälpa
                  till så att man ibland slipper vänta på varandra, bestämma
                  tider utan kan hämta eller lämna när det passar dig själv.
                </span>
              </p>
              <p className="c9 c18">
                <span className="c1" />
              </p>
              <h1 className="c6" id="h.chto247rp9sq">
                <span>Bakgrund</span>
              </h1>
              <p className="c9">
                <span className="c14">
                  Vad är det för ett mystiskt skåp som står i vårt kvarter?{" "}
                </span>
                <span>
                  Lånelådan har totalt sju skåp, tre stora och fyra lite mindre
                  som man kan lägga saker i. Man bokar ett skåp där man kan
                  lämna eller hämta upp ifrån med hjälp av din mobiltelefon.{" "}
                </span>
              </p>
              <h1 className="c6" id="h.cwpgxthk12l6">
                <span>Handhavande</span>
              </h1>
              <p className="c7 c21">
                <span className="c16" />
              </p>
              <p className="c7 c21">
                <span className="c1" />
              </p>
              <p className="c7">
                <span className="c1">
                  Allt du behöver är mobilappen “Lånelådan” som du använder för
                  att boka och öppna skåpen. &nbsp;Efter n
                </span>
              </p>
              <p className="c7 c21">
                <span className="c1" />
              </p>
              <p className="c7">
                <span>
                  I appen kan du allt som finns att låna, och vad som är{" "}
                </span>
                <span>tillgängligt</span>
                <span className="c1">
                  &nbsp;just nu för utlån.. När du har hittat det du behöver,
                  kontrollerar du om det är tillgängligt och var du kan hämta
                  det. Vid Lånelådan använder du appen för att öppna skåpet för
                  att stoppa i saker och för att låsa det när du returnerar det
                  du lånat.
                </span>
              </p>
              <p className="c7">
                <span>
                  Varmt välkomna att prova Lånelådan, det kostar ingenting att
                  använda den! &nbsp;
                </span>
              </p>
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
