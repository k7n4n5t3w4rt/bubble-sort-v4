// @flow
import { h, render } from "../web_modules/preact.js";
import App from "./App.js";
import { html } from "../web_modules/htm/preact.js";

render(html` <${App} /> `, document.getElementById("goodthing"));
