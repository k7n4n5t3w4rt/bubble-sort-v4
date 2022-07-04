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
) /*: Array<Array<Object>> */ => {
  const pixelGrid /*: Array<Col> */ = [];
  let pos = 0;
  for (let i = 0; i < cols; i++) {
    const col /*: Col */ = [];
    for (let j = 0; j < rows; j++) {
      const cellColour = 255 - Math.ceil(255 * Math.random());
      const geometry = new THREE.BoxGeometry(1 * scale, 1 * scale, 1 * scale);

      const material = new THREE.MeshBasicMaterial({
        color: `rgb(${cellColour},${cellColour},${cellColour})`,
      });
      const cube = new THREE.Mesh(geometry, material);
      // set the position of the cube based on where the reticle is
      cube.position.setFromMatrixPosition(reticleStuff.reticle.matrix);
      cube.quaternion.setFromRotationMatrix(reticleStuff.reticle.matrix);

      // cube.position.z = 0;
      cube.position.x = cube.position.x + i * scale;
      cube.position.y = cube.position.y + j * scale;
      cube.initial_pos_x = cube.position.x + i * scale;
      cube.initial_pos_y = cube.position.y + j * scale;
      cube.bubble_value = cellColour;
      cube.pos = pos;
      pos++;
      scene.add(cube);
      col.push(cube);
    }
    pixelGrid.push(col);
  }
  return pixelGrid;
};
