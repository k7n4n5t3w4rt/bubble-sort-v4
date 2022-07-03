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
) /*: SceneData */ => {
  //
  let sceneData /*: SceneData */ = {};

  // The stats display for AR
  sceneData.stats = createStats();
  const container = document.createElement("div");
  // $FlowFixMe - Flow doesn't know about the DOM
  document.body.appendChild(container);

  // Make the scene, camera, geometry, etc.
  sceneData.scene = new THREE.Scene();
  sceneData.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    50,
  );
  sceneData.camera.position.z = 1;
  sceneData.camera.position.y = Math.abs(parseInt(rows / 2)) * scale;
  sceneData.camera.position.x = Math.abs(parseInt(cols / 2)) * scale;

  // https://threejs.org/docs/#api/en/lights/HemisphereLight
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  sceneData.scene.add(light);
  //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  //   scene.add(ambientLight);

  sceneData.reticleStuff = addReticleToScene(sceneData);

  // https://threejs.org/docs/#api/en/renderers/WebGLRenderer
  sceneData.renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  sceneData.renderer.setPixelRatio(window.devicePixelRatio);
  sceneData.renderer.setSize(window.innerWidth, window.innerHeight);
  sceneData.renderer.xr.enabled = true;
  container.appendChild(sceneData.renderer.domElement);

  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const controls = new OrbitControls(
    sceneData.camera,
    sceneData.renderer.domElement,
  );
  controls.enableZoom = false;

  container.appendChild(sceneData.stats.dom);

  const button = ARButton.createButton(sceneData.renderer, {
    optionalFeatures: ["hit-test"],
    domOverlay: {
      root: document.body,
    },
  });

  // $FlowFixMe
  document.body.appendChild(button);

  //   function onSelect() {
  // Build the grid of pixels
  // sceneData.cubes = {};
  //   sceneData.cubes.pixelGrid = pixelGrid(
  //     cols,
  //     rows,
  //     scale,
  //     sceneData.geometry,
  //     sceneData.scene,
  //   );
  //   sceneData.cubes.moving = false;
  // animate(sceneData, speed, scale, cols, rows, cubes);
  animate(sceneData, speed, scale, cols, rows);
  //   }
  //   const controller = sceneData.renderer.xr.getController(0);
  //   controller.addEventListener("select", onSelect);

  window.addEventListener(
    "resize",
    onWindowResize(sceneData.camera, sceneData.renderer, window),
  );

  return sceneData;
};
