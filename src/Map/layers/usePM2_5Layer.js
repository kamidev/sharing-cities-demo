import React, { useEffect, useState } from 'react';
import { IconLayer } from '@deck.gl/layers';
import { EAQI_COLOR_RANGE, EAQI_PM2_5_LABELS, pm2_5ColorScale } from '../scales';
import Legend from '../Legend';
import icons from '../../assets/img/icon-atlas.png';

// This layer uses an icon instead of a circle shape,
// the ICON_MAPPING object defines the boundary for the icon used in the given spritesheet (icon-atlas.png)
const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

const legend = (
  <Legend
    title="PM 2.5"
    colors={EAQI_COLOR_RANGE}
    labels={EAQI_PM2_5_LABELS}
  />
);

/**
 * This is a react hook which returns 3 things (in an array [(1), (2), (3)]):
 *   (1) The layer object (as defined by deck.gl) itself
 *   (2) The JSX tag for the tooltip that will be shown when hovering over layer objects
 *   (3) The JSX tag for the legend that will be shown when the layer is active.
 */
function usePM2_5Layer(data, visible, hoverData, setHoverData) {
  const [layer, setLayer] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!data) return; // TODO: this isn't gonna work I think... unless the data change causes an update

    setLayer(new IconLayer({
      id: 'particles-icon-layer',
      pickable: true,
      data,
      onHover: info => {
        if (hoverData !== info.object) {
          setHoverData(info.object);
        }
      },
      visible,
      iconAtlas: icons, // this expects a string or a Texture2D object (luma.gl class) so might not work
      iconMapping: ICON_MAPPING,
      sizeScale: 20,
      getIcon: d => 'marker',
      getSize: 5,
      getColor: d => pm2_5ColorScale(d.average_measurements.P2),
    }));
  }, [data, visible, hoverData, setHoverData]);

  useEffect(() => {
    setTooltip(hoverData && (
      <div>
        PM 2.5: {hoverData.average_measurements.P2}
      </div>
    ));
  }, [hoverData]);

  return { layer, tooltip, legend };
}

export default usePM2_5Layer;
