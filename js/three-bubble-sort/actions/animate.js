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
  // const { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;
  const { stats, scene, camera, renderer, reticleStuff } = sceneData;

  sceneData.renderer.setAnimationLoop(render(sceneData));
  // return { stats, scene, camera, renderer, reticleStuff, cubes };
  return { stats, scene, camera, renderer, reticleStuff };
};

export default animate;
