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
import init from "./actions/init.js";
import animate from "./actions/animate.js";
import render from "./actions/render.js";

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
    let initialStateCubesX1Y1X2Y2 /*: CubesX1Y1X2Y2 */ = {};
    const cols = Math.abs(parseInt(props.cols) || 8);
    const rows = Math.abs(parseInt(props.rows) || 4);
    const speed = Math.abs(parseFloat(props.speed) || 0.05);

    let camera, scene, renderer, cubes;
    let stats = createStats();

    const sceneData /*: SceneData */ = init(cols, rows, speed);
    stats = sceneData.stats;
    scene = sceneData.scene;
    camera = sceneData.camera;
    renderer = sceneData.renderer;
    // The grid of cubes
    initialStateCubesX1Y1X2Y2.cubes = sceneData.cubes;
    // Values for iterating the length of the arrays
    initialStateCubesX1Y1X2Y2.x1 = cols - 1;
    initialStateCubesX1Y1X2Y2.y1 = rows - 1;
    initialStateCubesX1Y1X2Y2.x2 = 0;
    initialStateCubesX1Y1X2Y2.y2 = 0;

    animate(
      initialStateCubesX1Y1X2Y2,
      speed,
      stats,
      cols,
      rows,
      render(scene, camera, renderer),
    )();
  });

  return html`
    <div>
      <div id="console-ui"></div>
    </div>
  `;
};
