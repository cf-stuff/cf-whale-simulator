import { html, render } from "https://unpkg.com/htm/preact/standalone.module.js";
import { simulateBattle } from "./battle.js";
import App from "./components/App.js";
import { Players } from "./templates.js";

render(html`<${App} />`, document.body);

// simulateBattle([Players.brkHH, Players.tank, Players.evader], [Players.brkTank, Players.evader, Players.tank]);
