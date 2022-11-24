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
import setupMobileDebug from "../setup_mobile_debug.js";
import createStats from "../create_stats.js";
import init from "./actions/init.js";

import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";

const seed /*: number */ = parseInt(
  "bubblesort".split("").reduce(
    (acc /*: string */, letter /*: string */) /*: string */ => {
      const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
      return acc + letterCode.toString();
    },
    "",
  ),
);
setSeed(seed);

const [styles] = createStyles({
  bubbleSort: {
    width: "100%",
    height: "100%",
    backgroundImage: "url(/img/bg1.png)",
    backgroundClip: "border-box",
    backgroundSize: "cover",
    backgroundRepeat: "none",
  },
});

/*::
type Props = {
	cols: string,
	rows: string,
	speed: string,
	scalex: string,
	scaley: string,
	scalez: string,
}
*/
export default (props /*: Props */) /*: string */ => {
  // Set some defaults for missing props
  const cols = Math.abs(parseInt(props.cols) || 5);
  const rows = Math.abs(parseInt(props.rows) || 4);
  const speed = Math.abs(parseFloat(props.speed) || 1);
  const scaleX = Math.abs(Math.floor(parseFloat(props.scalex)) / 100 || 0.01);
  const scaleY = Math.abs(Math.floor(parseFloat(props.scaley)) / 100 || 0.01);
  const scaleZ = Math.abs(Math.floor(parseFloat(props.scalez)) / 100 || 0.01);

  useEffect(() => {
    setupMobileDebug();
    let stats = createStats();
    init(cols, rows, speed, scaleX, scaleY, scaleZ);
  });

  return html`
    <div className="${styles.bubbleSort}">
      <div id="console-ui"></div>
    </div>
  `;
};
