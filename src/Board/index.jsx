/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import AnchoredSurface from "../Surface/AnchoredSurface.jsx";
import Pamphlet from "./Pamphlet";
import withMainSurface from "../Surface/withMainSurface";
import { surfaceDeps } from "../render";
import "./Board.css";
import pic_banner from "./laneladan_banner.png";
import pic_message from "./message.png";
import pic1 from "./SAM_4401.jpg";
import pic2 from "./SAM_4402.jpg";
import pic3 from "./SAM_4403.jpg";
import pic4 from "./SAM_4404.jpg";
import pic5 from "./SAM_4405.jpg";
import pic6 from "./SAM_4406.jpg";
import pic7 from "./SAM_4407.jpg";
import pic8 from "./SAM_4408.jpg";
import pic9 from "./SAM_4409.jpg";
import pic10 from "./SAM_4410.jpg";
import pic11 from "./SAM_4411.jpg";
import pic12 from "./SAM_4412.jpg";
import pic13 from "./SAM_4413.jpg";
import pic14 from "./SAM_4414.jpg";
import pic15 from "./SAM_4415.jpg";
import pic16 from "./SAM_4416.jpg";

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
      <table border={0} cellSpacing={2} cellPadding={2}>
        <tr>
          <td bgcolor={"#D01A1F"} align={"center"} colspan={4}>
            <img width={300} height={40} SRC={pic_banner} />
          </td>
        </tr>
        <tr>
          <td align={"center"}>
            <img width={150} height={150} SRC={pic1} />
          </td>
          <td align={"center"}>
            <img width={150} height={150} SRC={pic2} />
          </td>
          <td align={"center"}>
            <img width={150} height={150} SRC={pic3} />
          </td>
          <td align={"center"}>
            <img width={150} height={150} SRC={pic4} />
          </td>
        </tr>
        <tr>
          <td align="center" colspan={2}>
            <img width={300} height={300} src={pic5} />
          </td>
          <td align="center" colspan={2}>
            <img width={300} height={300} src={pic6} />
          </td>
        </tr>

        <tr>
          <td align="center" colspan={2}>
            <img width={300} height={300} src={pic7} />
          </td>
          <td align="center" colspan={2}>
            <img width={300} height={300} src={pic_message} />
          </td>
        </tr>
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
