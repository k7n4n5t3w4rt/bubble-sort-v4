// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../web_modules/three.js";
import Stats from "../../web_modules/three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import { TGALoader } from "../../web_modules/three/examples/jsm/loaders/TGALoader.js";
// --------------------------------------------------
// PREACT
// --------------------------------------------------
import { useEffect, useState } from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import { ARButton } from "../vendor/ARButton.js";
import setupMobileDebug from "../setup_mobile_debug.js";
import createStats from "../create_stats.js";

/*::
type Props = {
	cols: string,
	rows: string,
	speed: string,
}
*/
export default (props /*: Props */) /*: string */ => {
  useEffect(() => {
    setupMobileDebug();

    const cols = Math.abs(parseInt(props.cols) || 4);
    const rows = Math.abs(parseInt(props.rows) || 4);
    const speed = Math.abs(parseFloat(props.speed) || 0.05);

    let camera, scene, renderer, cubes;
    let stats = createStats();

    let x1 = cols - 1,
      y1 = rows - 1,
      x2 = 0,
      y2 = 0;
    let next = false;
    const cube_values_x = Array(cols)
      .fill()
      .map((x, i) => i);
    const cube_values_y = Array(rows)
      .fill()
      .map((x, i) => i);

    init();
    animate();

    function init() {
      const container = document.createElement("div");
      // $FlowFixMe
      document.body.appendChild(container);

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.set(10, 5, -10);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0000ff);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

      cubes = [];
      let pos = 0;
      for (let i = 0; i < cols; i++) {
        const xRow = [];
        for (let j = 0; j < rows; j++) {
          const cellColour = 255 - Math.ceil(255 * Math.random());
          const material = new THREE.MeshBasicMaterial({
            color: `rgb(${cellColour},${cellColour},${cellColour})`,
          });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.z = 0;
          cube.position.x = i;
          cube.position.y = j;
          cube.initial_pos_x = i;
          cube.initial_pos_y = j;
          cube.bubble_value = cellColour;
          cube.pos = pos;
          pos++;
          scene.add(cube);
          xRow.push(cube);
        }
        cubes.push(xRow);
      }

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1);
      scene.add(light);

      renderer = new THREE.WebGLRenderer({ antialias: true });
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

      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      move(speed);
      stats.update();
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    function move(speed) {
      if (
        cubes[x1][y1].bubble_value !== undefined &&
        cubes[x2][y2].bubble_value !== undefined &&
        cubes[x1][y1].bubble_value > cubes[x2][y2].bubble_value &&
        cubes[x1][y1].pos > cubes[x2][y2].pos
      ) {
        next = false;
        const dx = cubes[x1][y1].position.x - cubes[x2][y2].initial_pos_x;
        const dy = cubes[x1][y1].position.y - cubes[x2][y2].initial_pos_y;
        if (dx !== 0 || dy !== 0) {
          const dz = 2 + cubes[x1][y1].position.z;
          const valX = Math.min(speed, dx);
          let valY = Math.min(speed, dy);
          if (valY < 0) valY = -1 * speed;
          const valZ = Math.min(speed, dz);

          cubes[x1][y1].position.z -= valZ;
          cubes[x2][y2].position.z -= valZ;
          if (cubes[x1][y1].position.z === -2) {
            cubes[x1][y1].position.x -= valX;
            cubes[x2][y2].position.x += valX;
            cubes[x1][y1].position.y -= valY;
            cubes[x2][y2].position.y += valY;
          }
        }

        if (dx === 0 && dy === 0) {
          const dzb = cubes[x1][y1].position.z * -1;
          let valZb = Math.abs(Math.min(speed, dzb));
          cubes[x1][y1].position.z += valZb;
          cubes[x2][y2].position.z += valZb;

          if (valZb === 0) {
            next = true;
            let pos1 = cubes[x1][y1].pos;
            let pos2 = cubes[x2][y2].pos;
            cubes[x1][y1].pos = pos2;
            cubes[x2][y2].pos = pos1;
            cubes[x1][y1].initial_pos_x = cubes[x1][y1].position.x;
            cubes[x1][y1].initial_pos_y = cubes[x1][y1].position.y;
            cubes[x2][y2].initial_pos_x = cubes[x2][y2].position.x;
            cubes[x2][y2].initial_pos_y = cubes[x2][y2].position.y;
          }
        }
        if (next) {
          x1 = Math.floor(Math.random() * cube_values_x.length);
          y1 = Math.floor(Math.random() * cube_values_y.length);
          x2 = Math.floor(Math.random() * cube_values_x.length);
          y2 = Math.floor(Math.random() * cube_values_y.length);
        }
      } else {
        x1 = Math.floor(Math.random() * cube_values_x.length);
        y1 = Math.floor(Math.random() * cube_values_y.length);
        x2 = Math.floor(Math.random() * cube_values_x.length);
        y2 = Math.floor(Math.random() * cube_values_y.length);
      }
    }
  });

  return html`
    <div>
      <div id="console-ui"></div>
    </div>
  `;
};
