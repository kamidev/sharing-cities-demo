import React, { useEffect, useState } from 'react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { EAQI_COLOR_RANGE, EAQI_PM10_LABELS, pm10ColorScale } from '../scales';
import Legend from '../Legend';

const legend = (
  <Legend
    title="PM10"
    colors={EAQI_COLOR_RANGE}
    labels={EAQI_PM10_LABELS}
  />
);

/**
 * This is a react hook which returns 3 things (in an array [(1), (2), (3)]):
 *   (1) The layer object (as defined by deck.gl) itself
 *   (2) The JSX tag for the tooltip that will be shown when hovering over layer objects
 *   (3) The JSX tag for the legend that will be shown when the layer is active.
 */
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
