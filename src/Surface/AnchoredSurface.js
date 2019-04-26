import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Surface from './Surface.js';
import useAnchorData from './useAnchorData';

const SurfaceComponent = ({ children, element }) => {
  return createPortal((
    <div className="surface">
      {children}
    </div>
  ), element);
};

class AnchoredSurface extends Surface {
  constructor(args) {
    super(args);
    this.args = args;
    this.surface = null;

    if (!this.args.parent)
      throw new Error('AnchoredSurface must have a parent surface! Please define it in the parameter object.');
  }

  initialize() {
    // do nothing, initilization happens after we extract the anchorRef data/offset in the Component
  }

  // TODO proptypes surface
  Component = ({ children }) => {
    const [initialized, setInitialized] = useState(false);
    const anchorRef = useRef(null);

    const anchorData = useAnchorData(this.args.parent, anchorRef);
    
    useEffect(() => {
      if (anchorData === null) return;
      Surface.prototype.initialize.call(this, {
        position: anchorData.position,
        rotation: anchorData.rotation, 
        up: anchorData.up, 
        ...this.args
      });
      setInitialized(true);
    }, [anchorData]);

    return (
      <div className="anchor" ref={anchorRef}>
      {initialized &&
        <SurfaceComponent children={children} element={this.element} />
      }
      </div>
    );
  }
}

export default AnchoredSurface;