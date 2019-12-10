import React from 'react';
import PropTypes from 'prop-types';

import './LayerSelector.css';

/**
 * A UI element for the map which appears in the top-left corner and allows the user
 * to select which map layer should be active.
 *
 * This should easily be rewritable to allow for multiple map layers to visible at once
 * (clicks instead toggling visibility), if that is wanted.
 */
function LayerSelector({ layers, pickedLayer, setPickedLayer }) {
  const layerItems = layers.map((layer, i) => (
    <li
      key={i}
      className={`layer-selector__list-item ${pickedLayer === layer ? 'layer-selector__list-item--picked' : ''}`}
      onClick={() => {
        if (pickedLayer !== layer) setPickedLayer(layer);
      }}
    >
      {layer}
    </li>
  ));

  return (
    <div className="layer-selector">
      <ul className="layer-selector__list">
        {layerItems}
      </ul>
    </div>
  );
}

LayerSelector.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  pickedLayer: PropTypes.string.isRequired,
  setPickedLayer: PropTypes.func.isRequired
};

export default LayerSelector;
