import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Surface from './';
import SurfaceData from './SurfaceData';
import useGetAnchorData from './useGetAnchorData';

function AnchoredSurface(props) {
  const anchorRef = useRef(null);
  const anchorData = useGetAnchorData(props.parent, anchorRef, props.causeUpdate);

  return (
    <div
      className="anchor"
      ref={anchorRef}
      style={{
        width: props.width / props.parent.scaleFactor,
        height: props.height / props.parent.scaleFactor
      }}
    >
      {anchorData &&
        <Surface
          position={anchorData.position}
          rotation={anchorData.rotation}
          up={anchorData.up}
          {...props}
        >
          {props.children}
        </Surface>
      }
    </div>
  );
}

AnchoredSurface.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  parent: PropTypes.instanceOf(SurfaceData).isRequired,
  children: PropTypes.element.isRequired,
  causeUpdate: PropTypes.number, // just a number, if it changes, update surface to anchor position
}

export default AnchoredSurface;
