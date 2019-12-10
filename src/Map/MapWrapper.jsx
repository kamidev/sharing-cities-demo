import React, { useState } from 'react';
import { StaticMap, NavigationControl, Popup } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import PropTypes from 'prop-types';

/** 
 * Component to render all the deck.gl map and react-map-gl stuff
 *
 * The purpose of this MapWrapper is to enclose the state that is specific to the map,
 * i.e. the viewport, which will be updatet A LOT. The Map itself has other state
 * and logic which doesn't need to update as often, which is why the wrapper makes sense
 * from a performance perspective.
 */
function MapWrapper({ hoverData, layers, tooltip, legend, layerSelector }) {
  const [viewport, setViewport] = useState({
    latitude: 59.305477, 
    longitude: 18.105203,
    zoom: 15,
    bearing: 0,
    pitch: 0,
    width: 1000,
    height: 1000
  });

  // NOTE: add a file .env in the root directory with the line
  // REACT_APP_MAPBOX_API_KEY=
  // followed with the api key for this to work!
  // ALSO NOTE: This isn't actually 100% secure, see, for more security create a key with url restrictions:
  // https://create-react-app.dev/docs/adding-custom-environment-variables/
  const mapboxApiKey = process.env.REACT_APP_MAPBOX_API_KEY;

  return (
    <div className="map">
      <DeckGL
        viewState={viewport}
        onViewStateChange={({ viewState }) => setViewport(viewState)}
        layers={layers}
        controller={true}
        getCursor={({isDragging}) => isDragging ? 'move' : (hoverData ? 'pointer' : 'auto')}
      >
        <StaticMap
          mapboxApiAccessToken={mapboxApiKey}
          //mapStyle='http://localhost:8080/styles/klokantech-basic/style.json' // obviously temporary, running "TileServer GL" locally, mapquest billing makes me nervous
        >
          <div className="map__controls">
            {hoverData && (
              <Popup
                longitude={hoverData.position[0]}
                latitude={hoverData.position[1]}
                closeButton={false}
                anchor="top"
              >
                {tooltip}
              </Popup>
            )}

            <div className='mapboxgl-ctrl-top-left'>
              {layerSelector}
            </div>

            
            <div className='mapboxgl-ctrl-bottom-right'>
              <NavigationControl 
                onViewportChange={(viewState) => setViewport(viewState)}
              />
            </div>

            <div className='mapboxgl-ctrl-bottom-left'>
              {legend}
            </div>
          </div>
        </StaticMap>
      </DeckGL>
    </div>
  );
}

MapWrapper.propTypes = {
  hoverData: PropTypes.object,
  layers: PropTypes.array,
  tooltip: PropTypes.element,
  legend: PropTypes.element,
  layerSelector: PropTypes.element,
}

export default MapWrapper;
