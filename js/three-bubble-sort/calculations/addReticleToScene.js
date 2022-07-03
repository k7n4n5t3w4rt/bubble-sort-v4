// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export default (sceneData /*: SceneData */) /*: ReticleStuff */ => {
  // const { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;
  const { stats, scene, camera, renderer } = sceneData;
  const reticleStuff = {};
  const geometry = new THREE.RingBufferGeometry(0.15, 0.2, 32).rotateX(
    -Math.PI / 2,
  );
  const material = new THREE.MeshBasicMaterial();

  reticleStuff.reticle = new THREE.Mesh(geometry, material);

  // we will calculate the position and rotation of this reticle every frame manually
  // in the render() function so matrixAutoUpdate is set to false
  reticleStuff.reticle.matrixAutoUpdate = false;
  reticleStuff.reticle.visible = false; // we start with the reticle not visible
  scene.add(reticleStuff.reticle);

  // optional axis helper you can add to an object
  // reticle.add(new THREE.AxesHelper(1));
  return reticleStuff;
};