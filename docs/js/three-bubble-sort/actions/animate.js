// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import render from "./render.js";

const animate = (
  sceneData /*: SceneData */,
  speed /*: number */,
  scale /*: number */,
  cols /*: number */,
  rows /*: number */,
) /*: SceneData  */ => {
  const { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;
  // const { stats, scene, camera, renderer, reticleStuff } = sceneData;

  sceneData.renderer.setAnimationLoop(
    render(sceneData, speed, scale, cols, rows),
  );
  return { stats, scene, camera, renderer, reticleStuff, cubes };
};

export default animate;