// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import initializeHitTestSource from "./initializeHitTestSource";

export default (
  sceneData /*: SceneData */,
) /*: () => Promise<SceneData>  */ => {
  return async (timestamp, frame) /*: Promise<SceneData> */ => {
    if (frame) {
      // 1. create a hit test source once and keep it for all the frames
      // this gets called only once
      // Could I move this to animate()?
      if (!sceneData.reticleStuff.hitTestSourceInitialized) {
        sceneData = await initializeHitTestSource(sceneData);
      }
      // const { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;
      const { stats, scene, camera, renderer, reticleStuff } = sceneData;

      // 2. get hit test results
      if (reticleStuff.hitTestSourceInitialized) {
        // we get the hit test results for a particular frame
        const hitTestResults = frame.getHitTestResults(
          reticleStuff.hitTestSource,
        );

        // XRHitTestResults The hit test may find multiple surfaces. The first one in the array is the one closest to the camera.
        if (hitTestResults.length > 0) {
          const hit = hitTestResults[0];
          // Get a pose from the hit test result. The pose represents the pose of a point on a surface.
          const pose = hit.getPose(reticleStuff.localSpace);

          reticleStuff.reticle.visible = true;
          // Transform/move the reticle image to the hit test position
          reticleStuff.reticle.matrix.fromArray(pose.transform.matrix);
        } else {
          reticleStuff.reticle.visible = false;
        }
      }
      sceneData.stats.update();
      // cubes = move(cubes, speed, cols, rows);
      renderer.render(scene, camera);
      // return { stats, scene, camera, renderer, reticleStuff, cubes };
      return { stats, scene, camera, renderer, reticleStuff };
    }
    return sceneData;
  };
};
