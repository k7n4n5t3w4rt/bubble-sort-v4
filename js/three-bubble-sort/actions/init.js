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
import pixelGrid from "../calculations/pixelGrid.js";
import onWindowResize from "../calculations/onWindowResize.js";

/*:: type SceneInfo =  {
      stats: Object,
      scene: Object,
      camera: Object,
      renderer: Object,
      cubes: Object
} */
export default (
  cols /*: number */,
  rows /*: number */,
  speed /*: number */,
) /*: SceneInfo */ => {
  // The stats display for AR
  const stats = createStats();
  const container = document.createElement("div");
  // $FlowFixMe - Flow doesn't know about the DOM
  document.body.appendChild(container);

  // Make the camera, scene, geometry, etc.
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(10, 5, -10);
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0000ff);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // This next line is important to to enable the renderer for WebXR
  renderer.xr.enabled = true; // New!
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  container.appendChild(stats.dom);

  const button = ARButton.createButton(renderer, {
    optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
    domOverlay: {
      root: document.body,
    },
  });

  // $FlowFixMe
  document.body.appendChild(button);

  window.addEventListener("resize", onWindowResize(camera, renderer, window));

  renderer.render(scene, camera);

  // Build the grid of pixels
  const cubes /*: Cubes */ = pixelGrid(cols, rows, geometry, scene);

  return { stats, scene, camera, renderer, cubes };
};
