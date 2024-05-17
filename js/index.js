import { html, render } from "./lib/preact.standalone.module.js";
import App from "./components/App.js";

render(html`<${App} />`, document.body);
