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

/*::
type Props = {
	cols: string,
	rows: string,
	speed: string,
	scale: string,
}
*/
export default (props /*: Props */) /*: string */ => {
  const cols = Math.abs(parseInt(props.cols) || 8);
  const rows = Math.abs(parseInt(props.rows) || 4);
  const speed = Math.abs(parseFloat(props.speed) || 0.05);
  const scale = Math.abs(parseFloat(props.scale) || 0.1);

  useEffect(() => {
    setupMobileDebug();
    let stats = createStats();
    const sceneData = init(cols, rows, speed, scale);
  });

  return html`
    <div>
      <div id="console-ui"></div>
    </div>
  `;
};
