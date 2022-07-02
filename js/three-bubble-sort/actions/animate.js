// @flow
import move from "./move.js";

const animate = (
  cubesX1Y1X2Y2 /*: CubesX1Y1X2Y2 */,
  speed /*: number */,
  stats /*: Object */,
  cols /*: number */,
  rows /*: number */,
  render /*: function */,
) /*: ()=> void  */ => {
  return () /*: void */ => {
    // Create arrays filled with numbers
    // that are the indexes
    const cube_values_x = Array(cols)
      .fill()
      .map((x, i) => i);
    const cube_values_y = Array(rows)
      .fill()
      .map((x, i) => i);
    let next = false;

    requestAnimationFrame(() /*: void */ => {
      animate(
        move(cubesX1Y1X2Y2, speed, cube_values_x, cube_values_y, next),
        speed,
        stats,
        cols,
        rows,
        render,
      )();
    });

    stats.update();
    render();
  };
};

export default animate;
