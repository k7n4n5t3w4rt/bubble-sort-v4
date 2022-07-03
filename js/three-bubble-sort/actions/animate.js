// @flow
import move from "./move.js";

const animate = (
  sceneData /*: SceneData */,
  speed /*: number */,
  scale /*: number */,
  cols /*: number */,
  rows /*: number */,
) /*: SceneData  */ => {
  // const { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;
  const { stats, scene, camera, renderer, reticleStuff } = sceneData;

  // This function gets called just once to initialize a hitTestSource
  // The purpose of this function is to get a) a hit test source and b) a reference space
  async function initializeHitTestSource() {
    const session = renderer.xr.getSession();

    // Reference spaces express relationships between an origin and the world.

    // For hit testing, we use the "viewer" reference space,
    // which is based on the device's pose at the time of the hit test.
    const viewerSpace = await session.requestReferenceSpace("viewer");
    reticleStuff.hitTestSource = await session.requestHitTestSource({
      space: viewerSpace,
    });

    // We're going to use the reference space of "local" for drawing things.
    // which gives us stability in terms of the environment.
    // read more here: https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace
    reticleStuff.localSpace = await session.requestReferenceSpace("local");

    // set this to true so we don't request another hit source for the rest of the session
    reticleStuff.hitTestSourceInitialized = true;

    // In case we close the AR session by hitting the button "End AR"
    session.addEventListener("end", () => {
      reticleStuff.hitTestSourceInitialized = false;
      reticleStuff.hitTestSource = null;
    });
  }

  function render(timestamp, frame) {
    if (frame) {
      // 1. create a hit test source once and keep it for all the frames
      // this gets called only once
      // Could I move this to animate()?
      if (!reticleStuff.hitTestSourceInitialized) {
        initializeHitTestSource();
      }

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
    }
  }

  sceneData.renderer.setAnimationLoop(render);
  // return { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;
  return { stats, scene, camera, renderer, reticleStuff };
};

export default animate;
