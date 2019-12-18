/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import AnchoredSurface from "../Surface/AnchoredSurface.jsx";
import Pamphlet from "./Pamphlet";
import withMainSurface from "../Surface/withMainSurface";
import { surfaceDeps } from "../render";
import "./Board.css";
import pic1 from "./SAM_4401.JPG";
import pic2 from "./SAM_4402.JPG";
import pic3 from "./SAM_4403.JPG";
import pic4 from "./SAM_4404.JPG";
import pic5 from "./SAM_4405.JPG";
import pic6 from "./SAM_4406.JPG";
import pic7 from "./SAM_4407.JPG";
import pic8 from "./SAM_4408.JPG";
import pic9 from "./SAM_4409.JPG";
import pic10 from "./SAM_4410.JPG";
import pic11 from "./SAM_4411.JPG";
import pic12 from "./SAM_4412.JPG";
import pic13 from "./SAM_4413.JPG";
import pic14 from "./SAM_4414.JPG";
import pic15 from "./SAM_4415.JPG";
import pic16 from "./SAM_4416.JPG";

/**
 * This component is an example of a surface containing anchored surfaces,
 * and how they can be added both statically and dynamically
 */
function Board(props) {
  const [extraSurfaces, setExtraSurfaces] = useState([]);

  const extras = (
    <Fragment>
      {extraSurfaces.map((surfaceProps, i) => (
        <AnchoredSurface
          key={i}
          {...surfaceProps}
          causeUpdate={extraSurfaces.length}
        >
          <Pamphlet />
        </AnchoredSurface>
      ))}
    </Fragment>
  );

  return (
    <div className="board">
      <table border={10}>
        <tbody>
          <tr>
            <td align="center">
              <img src={pic1} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic2} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic3} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic4} width={150} height={150} alt={"Bild"} />
            </td>
          </tr>
          <tr>
            <td align="center">
              <img src={pic5} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic6} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic7} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic8} width={150} height={150} alt={"Bild"} />
            </td>
          </tr>
          <tr>
            <td align="center">
              <img src={pic9} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic10} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic11} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic12} width={150} height={150} alt={"Bild"} />
            </td>
          </tr>
          <tr>
            <td align="center">
              <img src={pic13} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic14} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic15} width={150} height={150} alt={"Bild"} />
            </td>
            <td align="center">
              <img src={pic16} width={150} height={150} alt={"Bild"} />
            </td>
          </tr>
        </tbody>
      </table>
      );
      {/* <div className="board__content">
        <div className="board__buttons">
          <button
            onClick={() =>
              setExtraSurfaces([
                ...extraSurfaces,
                {
                  width: 100,
                  height: 150,
                  parent: props.surface,
                  resolutionScale: 2,
                  ...surfaceDeps
                }
              ])
            }
          >
            +
          </button>
          <button
            disabled={extraSurfaces.length === 0}
            onClick={() => setExtraSurfaces(extraSurfaces.slice(0, -1))}
          >
            -
          </button>
        </div>
        <div className="board__pamphlets">
          <AnchoredSurface
            width={100}
            height={150}
            parent={props.surface}
            resolutionScale={5}
            causeUpdate={extraSurfaces.length}
            {...surfaceDeps}
          >
            <Pamphlet />
          </AnchoredSurface>
          <AnchoredSurface
            width={100}
            height={150}
            parent={props.surface}
            resolutionScale={2}
            causeUpdate={extraSurfaces.length}
            {...surfaceDeps}
          >
            <Pamphlet />
          </AnchoredSurface>
          <AnchoredSurface
            width={100}
            height={150}
            parent={props.surface}
            resolutionScale={1}
            causeUpdate={extraSurfaces.length}
            {...surfaceDeps}
          >
            <Pamphlet />
          </AnchoredSurface>

          {extras}
        </div> 
      </div> */}
    </div>
  );
}

Board.propTypes = {
  surface: PropTypes.object.isRequired
};

export default withMainSurface(Board);
