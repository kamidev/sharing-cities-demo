import React, { useState } from 'react';
import MapWrapper from './MapWrapper';
import withMainSurface from '../Surface/withMainSurface';
import usePM10Layer from './layers/usePM10Layer';
import usePM2_5Layer from './layers/usePM2_5Layer';
import LayerSelector from './LayerSelector';
import processLuftData from './processLuftData';
import { DATA_SOURCES, useSubscribeToDataSource } from './dataSources';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

// tempData.json was retrieved from the following url:
// http://api.luftdaten.info/v1/filter/area=59.305477,18.105203,0.50
// the goal eventually is to retrieve it continuously from the API, since it's real time data.
import tempData from './tempData.json';

// layers must be custom hooks that take four arguments (data, visible, hoverData, setHoverData)
// and that must return [layer, tooltip, legend]
const layers = {
  pm10: {
    hook: usePM10Layer,
    dataSource: DATA_SOURCES.LUFT_DATA
  },
  pm2_5: {
    hook: usePM2_5Layer,
    dataSource: DATA_SOURCES.LUFT_DATA
  }
}

let layerResults = {};

function Map() {
  const [hoverData, setHoverData] = useState(null);
  const [pickedLayer, setPickedLayer] = useState('pm10');

  // temporarily this is just an array of temp luftdata, but once functional it should be
  // an object with a prop for each data source.
  const [data, setData] = useState({
    [DATA_SOURCES.LUFT_DATA]: processLuftData(tempData),
  });

  // this hook will update the data state used by the picked layer by fetching at regular intervals
  // NOTE: This isn't actually used right now because of CORS issues, it was never finished.
  //useSubscribeToDataSource(layers[pickedLayer].dataSource, setData);

  // create an array of {layer, tooltip, legend} using the layerHooks
  Object.keys(layers).forEach(layer => {
    layerResults[layer] = layers[layer].hook(data[layers[layer].dataSource], pickedLayer === layer, hoverData, setHoverData);
  });

  const layerSelector = (
    <LayerSelector
      layers={Object.keys(layers)}
      pickedLayer={pickedLayer}
      setPickedLayer={setPickedLayer}
    />
  );

  return (
    <MapWrapper
      hoverData={hoverData}
      layers={Object.keys(layerResults).map(layer => layerResults[layer].layer)}
      tooltip={layerResults[pickedLayer].tooltip}
      legend={layerResults[pickedLayer].legend}
      layerSelector={layerSelector}
    />
  );
};

export default withMainSurface(Map);
