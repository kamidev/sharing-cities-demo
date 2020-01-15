import { createContext } from 'react';

/**
 * This context contains camera info, which is convenient just about everywhere
 * to see where the camera is and to be able to move it around and stuff
 */
const CameraContext = createContext({
  cameraView: null,
  setCameraView: null
});

export default CameraContext;
