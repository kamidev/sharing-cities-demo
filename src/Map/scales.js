import { scaleThreshold } from 'd3';

/**
 * This file contains constants pertaining to data scales,
 * for now it's just luftdata, which is used to determine color and legend.
 */

// TODO: maybe this can be a bit nicer looking by reusing the "good", "fair" etc scales for all the crap?

// http://airindex.eea.europa.eu/
export const EAQI_COLORS = {
  good: [80, 240, 230, 255],
  fair: [80, 204, 170, 255],
  moderate: [240, 230, 65, 255],
  poor: [255, 80, 80, 255],
  veryPoor: [150, 0, 50, 255]
}

export const EAQI_COLOR_RANGE = [
  EAQI_COLORS.good,
  EAQI_COLORS.fair,
  EAQI_COLORS.moderate,
  EAQI_COLORS.poor,
  EAQI_COLORS.veryPoor
];

export const EAQI_PM2_5_DOMAIN = [10, 20, 25, 50];
export const EAQI_PM10_DOMAIN = [20, 35, 50, 100];

export const EAQI_PM2_5_LABELS = [0, ...EAQI_PM2_5_DOMAIN, '∞'];
export const EAQI_PM10_LABELS = [0, ...EAQI_PM10_DOMAIN, '∞'];

export const pm2_5ColorScale = scaleThreshold()
    .domain(EAQI_PM2_5_DOMAIN)
    .range(EAQI_COLOR_RANGE);

export const pm10ColorScale = scaleThreshold()
    .domain(EAQI_PM10_DOMAIN)
    .range(EAQI_COLOR_RANGE);
