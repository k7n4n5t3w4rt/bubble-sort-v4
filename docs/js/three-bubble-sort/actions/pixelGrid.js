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
  scale /*: number */,
  scene /*: Object */,
  reticleStuff /*: Object */,
) /*: {pixelGridGroup:Object, pixelGridCubes:Array<Cube>} */ => {
  //create a group and add the two cubes
  //These cubes can now be rotated / scaled etc as a group
  const pixelGridGroup = new THREE.Group();

  const pixelGridCubes /*: Array<Cube> */ = [];
  let pos = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cellColour = 255 - Math.ceil(255 * Math.random());
      const geometry = new THREE.BoxGeometry(1 * scale, 1 * scale, 1 * scale);

      const material = new THREE.MeshBasicMaterial({
        color: `rgb(${cellColour},${cellColour},${cellColour})`,
      });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.z = i * scale;
      cube.position.y = j * scale;
      cube.initial_pos_z = i * scale;
      cube.initial_pos_y = j * scale;
      cube.bubble_value = cellColour;
      cube.pos = pos;
      pos++;
      pixelGridGroup.add(cube);
      pixelGridCubes.push(cube);
    }
  }
  scene.add(pixelGridGroup);
  return { pixelGridGroup, pixelGridCubes };
};
