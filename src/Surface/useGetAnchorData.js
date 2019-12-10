import { useState, useLayoutEffect } from 'react';
import { Vector3 } from 'three';

/**
 * Rcursively check offset to determine position (in pixels) of the anchor relative to surface.
 * 
 * Returns null if surface isn't found
 */
function offset(element) {
  if (element.offsetParent === null) return { left: 0, top: 0};
  if (element.className === 'surface') return { left: 0, top: 0};
  const offsetParentOffset = offset(element.offsetParent);
  return {
    left: offsetParentOffset.left + element.offsetLeft, 
    top: offsetParentOffset.top + element.offsetTop
  };
}

/**
 * This hook manages the exact positioning of anchored surfaces.
 * By supplying a parent surface (which the anchored surface attaches to) and the wrapper
 * to the anchored surface (see AnchoredSurface.jsx) find exactly where the corresponding 3D object
 * should be positioned and return the spatial anchor data.
 */
export default function useGetAnchorData(surface, anchorRef, causeUpdate) {
  // anchorData should be an array containing 3 values: [position, rotation, up vector].
  const [anchorData, setAnchorData] = useState(null);

  useLayoutEffect(() => {
    // top-left corner has index := 0
    const vertices = surface.geometry.getAttribute('position');
    const i = 0;
    const topLeft = surface.mesh.localToWorld(new Vector3(vertices.getX(i), vertices.getY(i), vertices.getZ(i)))

    const origin = new Vector3();
    surface.mesh.getWorldPosition(origin);
    const rightDirection = new Vector3().subVectors(surface.mesh.localToWorld(new Vector3(1, 0, 0)), origin);
    const downDirection = new Vector3().subVectors(surface.mesh.localToWorld(new Vector3(0, -1, 0)), origin);
    const outDirection = new Vector3();
    surface.mesh.getWorldDirection(outDirection);

    rightDirection.normalize();
    downDirection.normalize();
    outDirection.normalize();
    const anchorOffset = offset(anchorRef.current);
    anchorOffset.left += anchorRef.current.offsetWidth / 2;
    anchorOffset.top += anchorRef.current.offsetHeight / 2;
    anchorOffset.left /= surface.resolutionScale;
    anchorOffset.top /= surface.resolutionScale;

    const position = topLeft.clone();
    position.addScaledVector(rightDirection, anchorOffset.left)
      .addScaledVector(downDirection, anchorOffset.top)
      .addScaledVector(outDirection, 10);

    setAnchorData({
      position,
      rotation: surface.mesh.rotation.clone(),
      up: surface.mesh.up.clone()
    });
  }, [surface, anchorRef, causeUpdate]);

  return anchorData;
}

