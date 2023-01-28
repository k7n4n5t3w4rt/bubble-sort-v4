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
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
// --------------------------------------------------
// COMPONENTS
// --------------------------------------------------
import Params from "./ThreeBubbleSortParams.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import AppReducer from "../appReducer.js";
import setupMobileDebug from "../setup_mobile_debug.js";
import createStats from "../create_stats.js";
import init from "./actions/init.js";
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";

setSeed(seedString("bubblesort"));

const [styles] = createStyles({
  bubbleSort: {
    width: "100%",
    height: "100%",
    backgroundImage: "url(/img/bg1.png)",
    backgroundClip: "border-box",
    backgroundSize: "cover",
    backgroundRepeat: "none",
    position: "absolute",
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
  const scaleX = Math.abs(Math.floor(parseFloat(props.scalex)) || 10);
  const scaleY = Math.abs(Math.floor(parseFloat(props.scaley)) || 10);
  const scaleZ = Math.abs(Math.floor(parseFloat(props.scalez)) || 10);

  const [state /*: AppState */, dispatch] = useReducer(AppReducer, {
    cols,
    rows,
    speed,
    scaleX,
    scaleY,
    scaleZ,
  });

  useEffect(() => {
    // setupMobileDebug();
    let stats = createStats();
    init(
      state.cols,
      state.rows,
      state.speed,
      state.scaleX,
      state.scaleY,
      state.scaleZ,
    );
  });

  return html`
    <div id="bubble-sort" className="${styles.bubbleSort}">
      <div id="dom-overlay">
        <div id="console-ui"></div>
      </div>
      <${Params}
        cols="${state.cols}"
        rows="${state.rows}"
        speed="${state.speed}"
        scaleX="${state.scaleX}"
        scaleY="${state.scaleY}"
        scaleZ="${state.scaleZ}"
        dispatch="${dispatch}"
      />
    </div>
  `;
};
