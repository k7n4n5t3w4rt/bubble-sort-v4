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

  function render() {
    sceneData.stats.update();
    cubes = move(cubes, speed, cols, rows);
    renderer.render(scene, camera);
  }

  sceneData.renderer.setAnimationLoop(render);
};

export default animate;
