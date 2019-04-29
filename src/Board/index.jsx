import React from 'react';
import PropTypes from 'prop-types';
import AnchoredSurface from '../Surface/AnchoredSurface.jsx';
import Pamphlet from './Pamphlet';
import withMainSurface from '../Surface/withMainSurface';
import { surfaceDeps } from '../render';
import './Board.css';

function Board(props) {
  return (
    <div className="board">
      <div className="board__content">
        <AnchoredSurface width={100} height={150} parent={props.surface} scaleFactor={0.2} {...surfaceDeps}>
          <Pamphlet cameraView={props.cameraView} setCameraView={props.setCameraView} />
        </AnchoredSurface>
        <AnchoredSurface width={100} height={150} parent={props.surface} scaleFactor={0.5} {...surfaceDeps}>
          <Pamphlet cameraView={props.cameraView} setCameraView={props.setCameraView} />
        </AnchoredSurface>
        <AnchoredSurface width={100} height={150} parent={props.surface} scaleFactor={1} {...surfaceDeps}>
          <Pamphlet cameraView={props.cameraView} setCameraView={props.setCameraView} />
        </AnchoredSurface>
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
