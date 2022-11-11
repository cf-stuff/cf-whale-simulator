import { html, render } from "https://unpkg.com/htm/preact/standalone.module.js";
import { simulateBattle } from "./battle.js";
import App from "./components/App.js";
import { getPlayer } from "./templates.js";

render(html`<${App} />`, document.body);

// simulateBattle(
//   [getPlayer("Brk HH Template"), getPlayer("Tank Template"), getPlayer("Evader Template")],
//   [getPlayer("Brk Tank Template"), getPlayer("Evader Template"), getPlayer("Tank Template")]
// );
