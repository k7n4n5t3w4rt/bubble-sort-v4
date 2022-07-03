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
  geometry /*: Object */,
  scene /*: Object */,
) /*: Array<Array<Object>> */ => {
  const cubes /*: Cubes */ = [];
  let pos = 0;
  for (let i = 0; i > -cols; i--) {
    const col /*: Col */ = [];
    for (let j = 0; j > -rows; j--) {
      const cellColour = 255 - Math.ceil(255 * Math.random());
      const material = new THREE.MeshBasicMaterial({
        color: `rgb(${cellColour},${cellColour},${cellColour})`,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.z = 0;
      cube.position.x = i * scale;
      cube.position.y = j * scale;
      cube.initial_pos_x = i * scale;
      cube.initial_pos_y = j * scale;
      cube.bubble_value = cellColour;
      cube.pos = pos;
      pos++;
      scene.add(cube);
      col.push(cube);
    }
    cubes.push(col);
  }
  return cubes;
};
