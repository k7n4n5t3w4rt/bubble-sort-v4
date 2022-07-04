// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import { ARButton } from "../../vendor/ARButton.js";
import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import createStats from "../../create_stats.js";
import pixelGrid from "./pixelGrid.js";
import onWindowResize from "../calculations/onWindowResize.js";
import animate from "./animate.js";
import addReticleToScene from "../calculations/addReticleToScene.js";

export default (
  cols /*: number */,
  rows /*: number */,
  speed /*: number */,
  scale /*: number */,
) /*: void */ => {
  //
  let sceneData /*: SceneData */ = {};

  // The stats display for AR
  const stats = createStats();
  const container = document.createElement("div");
  // $FlowFixMe - Flow doesn't know about the DOM
  document.body.appendChild(container);

  // Make the scene, camera, geometry, etc.
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    50,
  );
  camera.position.z = 1;
  camera.position.y = Math.abs(parseInt(rows / 2)) * scale;
  camera.position.x = Math.abs(parseInt(cols / 2)) * scale;

  // https://threejs.org/docs/#api/en/lights/HemisphereLight
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);
  //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  //   scene.add(ambientLight);

  // https://threejs.org/docs/#api/en/renderers/WebGLRenderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  const reticleStuff = addReticleToScene({ stats, scene, camera, renderer });

  const controller = renderer.xr.getController(0);
  controller.addEventListener("select", onSelect);
  scene.add(controller);

  //   // https://threejs.org/docs/#examples/en/controls/OrbitControls
  //   const controls = new OrbitControls(camera, renderer.domElement);
  //   controls.enableZoom = false;

  container.appendChild(stats.dom);

  const button = ARButton.createButton(renderer, {
    optionalFeatures: ["hit-test"],
    domOverlay: {
      root: document.body,
    },
  });

  // $FlowFixMe
  document.body.appendChild(button);

  const cubes = {};

  function onSelect() {
    if (reticleStuff.reticle.visible) {
      reticleStuff.active = false;
    }
    // Build the grid of pixels
    const { pixelGridGroup, pixelGridCubes } = pixelGrid(
      cols,
      rows,
      scale,
      scene,
      reticleStuff,
    );
    cubes.pixelGrid = pixelGridCubes;
    cubes.pixelGridGroup = pixelGridGroup;
    cubes.moving = false;

    // const vector = new THREE.Vector3(); // create once and reuse it!
    // camera.getWorldDirection(vector);
    // const radians = Math.atan2(vector.x, vector.z);
    // cubes.pixelGridGroup.rotateY(radians);
    cubes.pixelGridGroup.lookAt(0, 0, 0);
  }

  animate(
    { stats, scene, camera, renderer, reticleStuff, cubes },
    speed,
    scale,
    cols,
    rows,
  );
  window.addEventListener("resize", onWindowResize(camera, renderer, window));
};
