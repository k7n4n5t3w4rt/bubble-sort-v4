// @flow

export default (
  stateCubesX1Y1X2Y2 /*: CubesX1Y1X2Y2 */,
  speed /*: number */,
  cube_values_x /*: Array<number> */,
  cube_values_y /*: Array<number> */,
  next /*: boolean */,
) /*: CubesX1Y1X2Y2 */ => {
  let { cubes, x1, y1, x2, y2 } = stateCubesX1Y1X2Y2;
  if (
    cubes[x1][y1].bubble_value !== undefined &&
    cubes[x2][y2].bubble_value !== undefined &&
    cubes[x1][y1].bubble_value > cubes[x2][y2].bubble_value &&
    cubes[x1][y1].pos > cubes[x2][y2].pos
  ) {
    next = false;
    const dx = cubes[x1][y1].position.x - cubes[x2][y2].initial_pos_x;
    const dy = cubes[x1][y1].position.y - cubes[x2][y2].initial_pos_y;
    if (dx !== 0 || dy !== 0) {
      const dz = 2 + cubes[x1][y1].position.z;
      const valX = Math.min(speed, dx);
      let valY = Math.min(speed, dy);
      if (valY < 0) valY = -1 * speed;
      const valZ = Math.min(speed, dz);

      cubes[x1][y1].position.z -= valZ;
      cubes[x2][y2].position.z -= valZ;
      if (cubes[x1][y1].position.z === -2) {
        cubes[x1][y1].position.x -= valX;
        cubes[x2][y2].position.x += valX;
        cubes[x1][y1].position.y -= valY;
        cubes[x2][y2].position.y += valY;
      }
    }

    if (dx === 0 && dy === 0) {
      const dzb = cubes[x1][y1].position.z * -1;
      let valZb = Math.abs(Math.min(speed, dzb));
      cubes[x1][y1].position.z += valZb;
      cubes[x2][y2].position.z += valZb;

      if (valZb === 0) {
        next = true;
        let pos1 = cubes[x1][y1].pos;
        let pos2 = cubes[x2][y2].pos;
        cubes[x1][y1].pos = pos2;
        cubes[x2][y2].pos = pos1;
        cubes[x1][y1].initial_pos_x = cubes[x1][y1].position.x;
        cubes[x1][y1].initial_pos_y = cubes[x1][y1].position.y;
        cubes[x2][y2].initial_pos_x = cubes[x2][y2].position.x;
        cubes[x2][y2].initial_pos_y = cubes[x2][y2].position.y;
      }
    }
    if (next) {
      x1 = Math.floor(Math.random() * cube_values_x.length);
      y1 = Math.floor(Math.random() * cube_values_y.length);
      x2 = Math.floor(Math.random() * cube_values_x.length);
      y2 = Math.floor(Math.random() * cube_values_y.length);
    }
  } else {
    x1 = Math.floor(Math.random() * cube_values_x.length);
    y1 = Math.floor(Math.random() * cube_values_y.length);
    x2 = Math.floor(Math.random() * cube_values_x.length);
    y2 = Math.floor(Math.random() * cube_values_y.length);
  }
  return { cubes, x1, y1, x2, y2 };
};
