/**
 * Goal of this function is to restructure the LuftData API JSON object so that it is an array of locations,
 * rather than an array of measurements. Another goal is also to calculate the average measurements.
 * The API will return all measurements taken in the previous 5 minutes, and they can vary quite a bit,
 * so because we only want to show 1 value, the average is calculated and can then be used in maps, visualizations etc.
 *
 * Finally, some structure changes are motivated by what data is expected from deck.gl layers, e.g. the position prop.
 */
function processLuftData(jsonArray) {
  // use an object to speed this up a bit
  const locationsObj = jsonArray.reduce((locations, row) => {
    const { location, sensor, ...measurement } = row;
    if (!locations.hasOwnProperty(location.id))
      locations[location.id] = {
        sensors: {},
        average_measurements: null,
        position: [parseFloat(location.longitude), parseFloat(location.latitude), parseFloat(location.altitude)]
      };

    if (!locations[location.id].sensors.hasOwnProperty(sensor.id))
      locations[location.id].sensors[sensor.id] = { ...sensor, measurements: [] };
    locations[location.id].sensors[sensor.id].measurements.push({ ...measurement });

    return locations;
  }, {});

  // now that we got the data per location, make it into an array again (instead of an object), also calculate averages
  return Object.keys(locationsObj).map(locationId => {
    const location = locationsObj[locationId];
    location.sensors = Object.keys(location.sensors).map(sensorId => location.sensors[sensorId]);

    // calc averages
    const measurementSums = location.sensors.reduce((sumObj, sensor) => {
      sensor.measurements.forEach(measurement => {
        measurement.sensordatavalues.forEach(valueObj => {
          if(!sumObj.hasOwnProperty(valueObj.value_type))
            sumObj[valueObj.value_type] = { sum: 0, count: 0 };

          sumObj[valueObj.value_type].sum += parseFloat(valueObj.value);
          sumObj[valueObj.value_type].count += 1;
        });
      });
      return sumObj;
    }, {});

    location.average_measurements = Object.keys(measurementSums).reduce((acc, value_type) => ({
        ...acc,
        [value_type]: measurementSums[value_type].sum / measurementSums[value_type].count
    }), {});

    return location;
  });

}

export default processLuftData;
