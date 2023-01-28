// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export default (
  cols /*: number */,
  rows /*: number */,
  scaleXm /*: number */,
  scaleYm /*: number */,
  scaleZm /*: number */,
  scene /*: Object */,
  reticleStuff /*: Object */,
) /*: {pixelGridGroup:Object, pixelGridCubes:Array<Cube>} */ => {
  const scaleX /*: number */ = scaleXm / 100;
  const scaleY /*: number */ = scaleYm / 100;
  const scaleZ /*: number */ = scaleZm / 100;
  //create a group and add the two cubes
  //These cubes can now be rotated / scaled etc as a group
  const pixelGridGroup = new THREE.Group();

  const pixelGridCubes /*: Array<Cube> */ = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cellColour = 255 - Math.ceil(255 * Math.random());
      const geometry = new THREE.BoxGeometry(scaleX, scaleY, scaleZ);

      const material = new THREE.MeshBasicMaterial({
        color: `rgb(${cellColour},${cellColour},${cellColour})`,
      });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.z = j * scaleZ;
      cube.position.y = i * scaleY;
      cube.bubble_value = cellColour;
      cube.castShadow = true;
      pixelGridGroup.add(cube);
      pixelGridCubes.push(cube);
    }
  }
  scene.add(pixelGridGroup);
  return { pixelGridGroup, pixelGridCubes };
};
