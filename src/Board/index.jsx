/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import AnchoredSurface from "../Surface/AnchoredSurface.jsx";
import Pamphlet from "./Pamphlet";
import withMainSurface from "../Surface/withMainSurface";
import { surfaceDeps } from "../render";
import "./Board.css";

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
              <img src="/images/SAM_4401.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4402.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4403.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4404.jpg" width={150} height={150} />
            </td>
          </tr>
          <tr>
            <td align="center">
              <img img src="/images/SAM_4405.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4406.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4407.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4408.jpg" width={150} height={150} />
            </td>
          </tr>
          <tr>
            <td align="center">
              <img img src="/images/SAM_4409.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4410.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4411.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4412.jpg" width={150} height={150} />
            </td>
          </tr>
          <tr>
            <td align="center">
              <img img src="/images/SAM_4413.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4414.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4415.jpg" width={150} height={150} />
            </td>
            <td align="center">
              <img img src="/images/SAM_4416.jpg" width={150} height={150} />
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
