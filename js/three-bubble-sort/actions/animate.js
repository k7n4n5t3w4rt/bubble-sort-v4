// @flow
import move from "./move.js";

const animate = (
  sceneData /*: Object */,
  speed /*: number */,
  scale /*: number */,
  cols /*: number */,
  rows /*: number */,
  cubes /*: Cubes */,
) /*: void  */ => {
  const { stats, scene, camera, renderer } = sceneData;
  // The grid of cubes
  let cubesX1Y1X2Y2 = {};
  cubesX1Y1X2Y2.cubes = cubes;
  // Values for iterating the length of the arrays
  cubesX1Y1X2Y2.x1 = cols - 1;
  cubesX1Y1X2Y2.y1 = rows - 1;
  cubesX1Y1X2Y2.x2 = 0;
  cubesX1Y1X2Y2.y2 = 0;

  function render() {
    cubesX1Y1X2Y2 = move(cubesX1Y1X2Y2, speed, scale, cols, rows);
    sceneData.stats.update();
    renderer.render(scene, camera);
  }

  sceneData.renderer.setAnimationLoop(render);
};

export default animate;
