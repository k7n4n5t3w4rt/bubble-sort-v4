// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import ARButton from "./ARButton.js";
import { OrbitControls } from "../../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import createStats from "../../create_stats.js";
import onWindowResize from "../calculations/onWindowResize.js";
import onSelectBuildPixelGrid from "./onSelectBuildPixelGrid.js";
import animate from "./animate.js";
import addReticleToScene from "../calculations/addReticleToScene.js";

export default (
  cols /*: number */,
  rows /*: number */,
  speed /*: number */,
  scaleX /*: number */,
  scaleY /*: number */,
  scaleZ /*: number */,
) /*: void */ => {
  // Initialise some objects for the global state
  let sceneData /*: SceneData */ = {};
  const cubes /*: Cubes */ = {
    pixelGridGroup: {},
    pixelGrid: [],
    moving: false,
    active: false,
    currentIndex: 0,
  };

  // The stats display for AR
  const stats = createStats();
  const ARContainer = document.createElement("div");
  ARContainer.id = "ar-container";
  const bubbleSort = document.getElementById("bubble-sort");
  // document.body.appendChild(container);
  // $FlowFixMe - Flow doesn't know about the DOM
  bubbleSort.appendChild(ARContainer);

  // Make the scene, camera, geometry, etc.
  const scene /*: Object */ = new THREE.Scene();
  const camera /*: Object */ = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    50,
  );
  camera.position.z = 1;
  camera.position.y = Math.abs(parseInt(rows / 2)) * scaleY;
  camera.position.x = Math.abs(parseInt(cols / 2)) * scaleX;

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
  ARContainer.appendChild(renderer.domElement);

  const reticleStuff = addReticleToScene({ stats, scene, camera, renderer });

  const controller = renderer.xr.getController(0);
  // On select (tap in AR mode), build the pixel grid and start
  // calling the move() function on each render to animate the pixels
  controller.addEventListener(
    "select",
    onSelectBuildPixelGrid(
      reticleStuff,
      cubes,
      cols,
      rows,
      scaleX,
      scaleY,
      scaleZ,
      scene,
      camera,
    ),
  );
  scene.add(controller);

  //   // https://threejs.org/docs/#examples/en/controls/OrbitControls
  //   const controls = new OrbitControls(camera, renderer.domElement);
  //   controls.enableZoom = false;

  ARContainer.appendChild(stats.dom);

  const domOverlayDiv = document.getElementById("dom-overlay");
  const button = ARButton.createButton(
    `/?speed=${speed}&scalex=${scaleX}&scaley=${scaleY}&scalez=${scaleZ}&cols=${cols}&rows=${rows}`,
    renderer,
    {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: {
        root: domOverlayDiv,
      },
    },
  );

  // document.body.appendChild(button);
  // $FlowFixMe
  domOverlayDiv.appendChild(button);

  animate(
    { stats, scene, camera, renderer, reticleStuff, cubes },
    speed,
    scaleX,
    scaleY,
    scaleZ,
    cols,
    rows,
  );
  window.addEventListener("resize", onWindowResize(camera, renderer, window));
};
