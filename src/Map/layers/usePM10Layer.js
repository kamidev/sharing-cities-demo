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

function usePM10Layer(data, visible, hoverData, setHoverData) {
  const [layer, setLayer] = useState(null);
  const [tooltip, setTooltip] = useState(null);


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
