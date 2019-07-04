import React from 'react';
import PropTypes from 'prop-types';
import { BaseControl } from 'react-map-gl';
import './Legend.css';

function colorArrayToRgb(color) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`
}

const width = 250;
const height = 30;
const margin = 10;

// TODO: unit, fix margins and numbers and shit, right now it's a bit too hardcoded
class Legend extends BaseControl {
  _render() {
    const { title, unit, colors, labels } = this.props;

    if (colors.length !== labels.length - 1)
      throw new Error("With N colors, there must be N+1 labels.");

    const rectWidth = width / colors.length;
    const colorRects = colors.map((color, i) => (
      <rect width={rectWidth} height={height} x={rectWidth * i} fill={colorArrayToRgb(colors[i])} key={i} />
    ));

    const labelTexts = labels.map((label, i) => (
      <text x={rectWidth * i} dy="1.2em" textAnchor="middle" key={i}>{label}</text>
    ));

    return (
      <div className="map-legend">
        <svg width={width + margin * 2} height={height + margin * 2 + 20}>
          <g transform={`translate(${margin} ${margin})`}>
            <g>
              <text x={width / 2} dy="5" textAnchor="middle" className="map-legend__title">{title}</text>
            </g>
            <g transform={`translate(0 10)`}>
              {colorRects}
            </g>
            <g transform={`translate(0 ${height + 10})`}>
              {labelTexts}
            </g>
          </g>
        </svg>
      </div>
    );
  }
};

Legend.propTypes = {
  title: PropTypes.string.isRequired,
  unit: PropTypes.string,
  colors: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
}

export default Legend;
