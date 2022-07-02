// @flow

export default (
  stateCubesX1Y1X2Y2 /*: CubesX1Y1X2Y2 */,
  speed /*: number */,
  scale /*: number */,
  cols /*: number */,
  rows /*: number */,
) /*: CubesX1Y1X2Y2 */ => {
  // NOTE:
  // This might not be very clear so:
  //
  // stateCubesX1Y1X2Y2.cubes is an an array of columns of cubes.
  // Each cube object is a REFERENCE to a THREE.js Mesh object that
  // was atached to the THREE.js scene in:
  //
  //		/js/three-bubble-sort/actions/pixelGrid.js (Line 34)
  //
  let next = false;
  let { cubes, x1, y1, x2, y2 } = stateCubesX1Y1X2Y2;
  if (
    cubes[x1][y1].bubble_value > cubes[x2][y2].bubble_value &&
    cubes[x1][y1].pos > cubes[x2][y2].pos
  ) {
    next = false;
    // Get the x and y differences
    const dx = cubes[x1][y1].position.x - cubes[x2][y2].initial_pos_x;
    const dy = cubes[x1][y1].position.y - cubes[x2][y2].initial_pos_y;
    // If at least one of them still has to move...
    if (dx > 0 || dy > 0) {
      const dz = 2 * scale + cubes[x1][y1].position.z;
      // Are we moving by a full "speed" jump, or by a smaller d* jump?
      const valX = Math.min(speed * scale, dx);
      let valY = Math.min(speed * scale, dy);
      const valZ = Math.min(speed * scale, dz);
      // NOT SURE
      if (valY < 0) valY = -1 * speed;

      cubes[x1][y1].position.z -= valZ;
      cubes[x2][y2].position.z -= valZ;
      // Check if we are at the max z position
      if (cubes[x1][y1].position.z <= -(2 * scale)) {
        cubes[x1][y1].position.x -= valX;
        cubes[x2][y2].position.x += valX;
        cubes[x1][y1].position.y -= valY;
        cubes[x2][y2].position.y += valY;
      }
    }

    if (dx < scale && dy < scale) {
      const dzb = cubes[x1][y1].position.z * -(1 * scale);
      let valZb = Math.abs(Math.min(speed * scale, dzb));
      cubes[x1][y1].position.z += valZb;
      cubes[x2][y2].position.z += valZb;

      if (valZb < scale) {
        next = true;
        cubes[x1][y1].pos = cubes[x2][y2].pos;
        cubes[x2][y2].pos = cubes[x1][y1].pos;
        cubes[x1][y1].initial_pos_x = cubes[x1][y1].position.x;
        cubes[x1][y1].initial_pos_y = cubes[x1][y1].position.y;
        cubes[x2][y2].initial_pos_x = cubes[x2][y2].position.x;
        cubes[x2][y2].initial_pos_y = cubes[x2][y2].position.y;
      }
    }
    if (next) {
      x1 = Math.floor(Math.random() * cols);
      y1 = Math.floor(Math.random() * rows);
      x2 = Math.floor(Math.random() * cols);
      y2 = Math.floor(Math.random() * rows);
    }
  } else {
    x1 = Math.floor(Math.random() * cols);
    y1 = Math.floor(Math.random() * rows);
    x2 = Math.floor(Math.random() * cols);
    y2 = Math.floor(Math.random() * rows);
  }
  return { cubes, x1, y1, x2, y2 };
};
