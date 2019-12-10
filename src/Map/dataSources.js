import { useRef, useEffect } from 'react';

import axios from 'axios';

// NOTE: This file is currently not being used as part of the code,
// and it's also probably completely useless, since there are CORS issues with luftdaten.info,
// so it doesn't work, there probably needs to be a proxy server for real-time luftdata to avoid CORS errors.
// 
// The idea behind this file was to have a generalized way to fetch real-time data at a given interval,
// it would work on luftdata, were it not for CORS restrictions on the luftdata API.
// 
// ALSO NOTE: this file makes some assumptions about API:s that are used, 
// and will probably need to be updated to accomodate any changes in API:s used.
// e.g., polling rate restrictions.


// temporary for testing
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// how often to update in ms.
const delay = 5 * 60 * 1000;

export const DATA_SOURCES = {
  LUFT_DATA: 'luft data',
  TEST: 'test'
};

const fetch_data = {
  [DATA_SOURCES.LUFT_DATA]: async () => {
    // luft_data fetched
    try {
      await axios.get('http://api.luftdaten.info/v1/filter/area=59.305477,18.105203,0.50');
    } catch (error) {
      throw new Error(error);
    }
  },
  [DATA_SOURCES.TEST]: async () => {
    // test fetched
    await timeout(500);
    return {};
  }
};

/** Fetch data and update parent state */
async function fetchAndUpdate(dataSource, lastUpdateRef, setData) {
  const data = await fetch_data[dataSource]();
  lastUpdateRef.current[dataSource] = Date.now();
  setData((oldData) => ({
    ...oldData,
    [dataSource]: data,
  }));
}

function timeSinceLastUpdate(dataSource, lastUpdateRef) {
  return Date.now() - lastUpdateRef.current[dataSource];
}

/**
 * This function has a timeout delay and an interval delay,
 * the first call is done after timeoutDelay ms, after which the interval starts.
 *
 * This function must also be cancellable, if we're waiting for the call,
 * cancel that, if the interval is running, cancel that.
 *
 * This function returns a promise where the value is function that when called,
 * cancels any running timers.
 */
async function sub(dataSource, lastUpdateRef, delay, setData) {
  const timeoutDelay = Math.max(0, delay - timeSinceLastUpdate(dataSource, lastUpdateRef));
  let intervalRunning = false;

  let timeoutRunning = true;
  let subTimeoutID = null;
  timeoutRunning = new Promise(resolve => {
    subTimeoutID = setTimeout(async () => {
      await fetchAndUpdate(dataSource, lastUpdateRef, setData);
      resolve(false);
    }, timeoutDelay);
  });

  await timeoutRunning;

  intervalRunning = true;
  const subIntervalID = setInterval(() => fetchAndUpdate(dataSource, lastUpdateRef, setData), delay);

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

    // unsub previous
    if (unsubRef.current !== null)
      unsubRef.current.then((unsub) => unsub());

    // sub new one
    unsubRef.current = sub(dataSource, lastUpdateRef, delay, setData);
  }, [dataSource, setData]);
};
