import { createContext } from 'react';

const CameraContext = createContext({
  cameraView: null,
  setCameraView: null
});

export default CameraContext;
