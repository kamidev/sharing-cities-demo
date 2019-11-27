import React, { useEffect, useState } from 'react';
import { ScatterplotLayer } from '@deck.gl/layers';
import axios from 'axios';
import { EAQI_COLOR_RANGE, EAQI_PM10_LABELS, pm10ColorScale } from '../scales';
import Legend from '../Legend';

// hook that returns 3 things, (i) layer, (ii) tooltip jsx, (iii) legend jsx

const legend = (
  <Legend
    title="PM10"
    colors={EAQI_COLOR_RANGE}
    labels={EAQI_PM10_LABELS}
  />
);

// NOTE: with this temporary solution, if there are multiple layers sharing data sources, it's really inefficient, could be an idea (if we keep this style) to have some sort of "data source" abstraction that a layer could subscribe to, which would only be active if some layer subscribed to it.
async function getData() {
  try {
    const response = await axios.get('http://api.luftdaten.info/v1/filter/area=59.305477,18.105203,0.50');
    console.log(response);
  } catch (error) {
    throw new Error(error);
  }
}

var intervalID = null;

function usePM10Layer(data, visible, hoverData, setHoverData) {
  const [layer, setLayer] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  // what happens if it stars fetching, then the hook is removed, then the fetch finishes?
  /*useEffect(() => {
    //intervalID = setInterval(getData, 5 * 60 * 1000); // 5 minutes
    console.log('pm2_5 ON');
    setData(processLuftData(tempData))

    //return () => clearInterval(intervalID);
    
    return () => console.log('pm2_5 OFF');
    // TODO: return stop fetch data
  }, []);*/
  /*useEffect(() => {
    setData(processLuftData(tempData));

    if (visible) console.log('sub');
    else console.log('unsub (if subbed)');
  }, [visible])*/


  useEffect(() => {
    if (!data) return; // TODO: this isn't gonna work I think... unless the data change causes an update

    setLayer(new ScatterplotLayer({
      id: 'particles-layer',
      pickable: true,
      data,
      lineWidthUnits: 'pixels',
      onHover: info => {
        if (hoverData !== info.object) {
          setHoverData(info.object);
        }
      },
      visible,
      getRadius: 30,
      getFillColor: d => pm10ColorScale(d.average_measurements.P1),
      getLineColor: [0, 0, 0, 255],
      getLineWidth: 10
    }));
  }, [data, visible, hoverData, setHoverData]);

  useEffect(() => {
    setTooltip(hoverData && (
      <div>
        P10: {hoverData.average_measurements.P1}
      </div>
    ));
  }, [hoverData])

  return { layer, tooltip, legend };
}

export default usePM10Layer;
