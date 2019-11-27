import { useRef, useEffect } from 'react';

import axios from 'axios';

// TODO, better filename? Data?
// NOTE: this file makes some assumptions about API:s that are used, 
// and will probably need to be updated to accomodate any changes in API:s used.
// e.g., polling rate restrictions.

// TODO: maybe try having this as a ref instead? Would that even work?
let intervalID = null;

// temporary for testing
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// how often to update in ms.
const delay = 5 * 60 * 3600;

export const DATA_SOURCES = {
  LUFT_DATA: 'luft data',
  TEST: 'test'
};

const fetch_data = {
  [DATA_SOURCES.LUFT_DATA]: async () => {
    await timeout(500);
    return "luft_data fetched.";
    /*try {
      return await axios.get('http://api.luftdaten.info/v1/filter/area=59.305477,18.105203,0.50');
    } catch (error) {
      throw new Error(error);
    }*/
  },
  [DATA_SOURCES.TEST]: async () => {
    await timeout(500);
    return "test fetched.";
  }
};

async function fetchAndUpdate(dataSource, lastUpdateRef) {
  const data = await fetch_data[dataSource]();
  //setData(oldData => { ...oldData, dataSource: data });
  lastUpdateRef.current[dataSource] = Date.now();
  console.log(data);
  console.log('calling setData(data)');
}

function timeSinceLastUpdate(lastUpdateRef) {
  return Date.now() - lastUpdateRef.current;
}

// TODO: a function that has a callDelay and an intervalDelay, the first call is done after callDelay ms, after which the interval starts.
// This function must also be cancellable, if we're waiting for the call, cancel that, if the interval is running, cancel that.
// HERE'S AN IDEA: Instead of a class (which would be one obvious way to make the cancelling work), have the function return a function that when called, cancels any running timers.
async function sub(dataSource, lastUpdateRef, delay) {
  const timeoutDelay = Math.max(0, delay - timeSinceLastUpdate(lastUpdateRef));
  let intervalRunning = false;

  let timeoutRunning = true;
  let subTimeoutID = null;
  timeoutRunning = new Promise(resolve => {
    subTimeoutID = setTimeout(async () => {
      await fetchAndUpdate(dataSource, lastUpdateRef);
      resolve(false);
    }, timeoutDelay);
  });

  await timeoutRunning;

  intervalRunning = true;
  const subIntervalID = setInterval(() => fetchAndUpdate(dataSource, lastUpdateRef), delay);

  // call to cancel
  return () => {
    if (timeoutRunning)
      clearTimeout(subTimeoutID);
    if (intervalRunning)
      clearInterval(subIntervalID);
  };
}


export function useSubscribeToDataSource(dataSource, setData) {
  // keeps track of when the last update happened, given in ms (since 1970), since we don't want unnecesary updates
  const lastUpdateRef = useRef((() => {
    const now = Date.now();
    return Object.keys(DATA_SOURCES).reduce((acc, key) => ({ ...acc, [DATA_SOURCES[key]]: now - delay}), {});
  })());

  const unsubRef = useRef(null);

  useEffect(() => {
    if (!dataSource || !(dataSource in fetch_data))
      throw new Error(`Source: ${dataSource} is not a valid data source.`);

    // unsub
    if (unsubRef.current !== null)
      unsubRef.current();
    /*if (intervalID !== null) {
      clearInterval(intervalID);
      intervalID = null;
    }*/

    // sub
    unsubRef.current = sub(dataSource, lastUpdateRef, delay);
    /*fetchAndUpdate(dataSource, lastUpdateRef);
    intervalID = setInterval(fetchAndUpdate, 10 * 1000, dataSource, lastUpdateRef);*/
  }, [dataSource]);
};
