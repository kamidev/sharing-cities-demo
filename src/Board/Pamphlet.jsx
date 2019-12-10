import React from 'react';
import withSubSurface from '../Surface/withSubSurface';
import './Pamphlet.css';

/**
 * An example anchored surface.
 */
function Pamphlet(props) {
  return (
    <div className="pamphlet">
      Hej
    </div>
  );
}

export default withSubSurface(Pamphlet);
