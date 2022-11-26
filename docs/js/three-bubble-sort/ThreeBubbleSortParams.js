// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
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
// HELPERS
// --------------------------------------------------
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";

setSeed(seedString("threebubblesortparams"));

const [styles] = createStyles({
  paramsContainer: {
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    padding: "1rem",
    paddingTop: "3rem",
  },
});

rawStyles({
  label: {
    display: "block",
    padding: "0.5rem",
  },
  ["input[type=text]"]: {
    boxSizing: "border-box !important",
    backgroundColor: "white !important",
    padding: "0.5rem !important",
  },
});

/*::
type Props = {
	cols: number,
	rows: number,
	speed: number,
	scaleX: number,
	scaleY: number,
	scaleZ: number,
	dispatch: function
}
*/
export default (props /*: Props */) /*: string */ => {
  // Set some defaults for missing props
  const cols /*: number */ = props.cols;
  const rows /*: number */ = props.rows;
  const speed /*: number */ = props.speed;
  const scaleX /*: number */ = props.scaleX;
  const scaleY /*: number */ = props.scaleY;
  const scaleZ /*: number */ = props.scaleZ;
  const dispatch /*: function */ = props.dispatch;

  useEffect(() => {});

  const changeCols = (dispatch /*: function */) /*: function */ => (
    e /*: SyntheticInputEvent<HTMLInputElement> */,
  ) /*: void */ => {
    dispatch({
      type: "CHANGE_COLS",
      payload: e.target.value,
    });
  };

  return html`
    <div id="params-container" className="${styles.paramsContainer}">
      <fieldset>
        <div>
          <label for="cols">Columns:</label>
          <input
            type="text"
            id="cols"
            name="cols"
            value="${cols.toString()}"
            onChange=${changeCols(dispatch)}
          />
        </div>
        <div>
          <label for="rows">Rows:</label>
          <input type="text" id="rows" name="rows" value="${rows.toString()}" />
        </div>
        <div>
          <label for="rows">Speed:</label>
          <input
            type="text"
            id="speed"
            name="speed"
            value="${speed.toString()}"
          />
        </div>
        <div>
          <label for="scaleX">Xcm:</label>
          <input
            type="text"
            id="scaleX"
            name="scaleX"
            value="${(scaleX * 100).toString()}"
          />
        </div>
        <div>
          <label for="scaleY">Ycm:</label>
          <input
            type="text"
            id="scaleY"
            name="scaleY"
            value="${(scaleY * 100).toString()}"
          />
        </div>
        <div>
          <label for="scaleZ">Zcm:</label>
          <input
            type="text"
            id="scaleZ"
            name="scaleZ"
            value="${(scaleZ * 100).toString()}"
          />
        </div>
      </fieldset>
    </div>
  `;
};
