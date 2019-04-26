import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AnchoredSurface from '../Surface/AnchoredSurface';
import Pamphlet from './Pamphlet';
import withMainSurface from '../Surface/withMainSurface';
import { surfaceDeps } from '../App';
import './Board.css';

function Board(props) {
  const [anchoredSurface, setAnchoredSurface] = useState(null);

  useEffect(() => {
    setAnchoredSurface(new AnchoredSurface({
      width: 100,
      height: 150,
      parent: props.surface,
      ...surfaceDeps
    }));
  }, [props.surface]);

  return (
    <div className="board">
      <div className="board__content">
      {anchoredSurface &&
        <anchoredSurface.Component>
          <Pamphlet cameraView={props.cameraView} setCameraView={props.setCameraView} surface={anchoredSurface} />
        </anchoredSurface.Component>
      }
      </div>
    </div>
  );
}

Board.propTypes = {
  cameraView: PropTypes.object,
  setCameraView: PropTypes.func,
  surface: PropTypes.object.isRequired
};

export default withMainSurface(Board);
