import React, { useState } from 'react';
import { StaticMap, NavigationControl } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { EAQI_COLOR_RANGE, EAQI_PM10_LABELS, pm10ColorScale } from './scales';
import Legend from './Legend';
import withMainSurface from '../Surface/withMainSurface';
import processLuftData from './processLuftData';
import tempData from './tempData.json';
import 'mapbox-gl/dist/mapbox-gl.css';

// tempData.json was retrieved from the following url:
// http://api.luftdaten.info/v1/filter/area=59.305477,18.105203,0.50
// the goal eventually (once the map layers work) is to retrieve it continuously from the API, since it's real time data. 
const data = processLuftData(tempData);
console.log(data);

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 59.305477, 
    longitude: 18.105203,
    zoom: 15,
    bearing: 0,
    pitch: 0,
    width: 1000,
    height: 1000
  });

  const layers = [
    new ScatterplotLayer({
      id: 'particles-layer',
      data,
      lineWidthUnits: 'pixels',
      getRadius: 30,
      getFillColor: d => pm10ColorScale(d.average_measurements.P1),
      getLineColor: [0, 0, 0, 255],
      getLineWidth: 10
    })
  ];

  return (
    <div>
      <DeckGL
        viewState={viewport}
        onViewStateChange={({ viewState }) => setViewport(viewState)}
        layers={layers}
        controller={true}
      >
        <StaticMap
          mapStyle='http://localhost:8080/styles/klokantech-basic/style.json' // obviously temporary, running "TileServer GL" locally, mapquest billing makes me nervous
        >
          <div className='mapboxgl-ctrl-bottom-right'>
            <NavigationControl 
              onViewportChange={(viewState) => setViewport(viewState)}
            />
          </div>

          <div className='mapboxgl-ctrl-bottom-left'>
            <Legend
              title="PM10"
              colors={EAQI_COLOR_RANGE}
              labels={EAQI_PM10_LABELS}
            />
          </div>
        </StaticMap>
      </DeckGL>
    </div>
  );
};

export default withMainSurface(Map);
