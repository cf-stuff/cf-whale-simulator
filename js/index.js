import { html, render } from "https://unpkg.com/htm/preact/standalone.module.js";
import { simulateBattle } from "./battle.js";
import App from "./components/App.js";
import CFDB from "./data/CFDB.js";
import { getImagePath, ImageType, preload } from "./image.js";
import { getPlayer } from "./templates.js";

render(html`<${App} />`, document.body);

CFDB.getSkills().filter(skill => skill.name !== "Normal Attack")
  .forEach(skill => preload(getImagePath(ImageType.skill, skill.iconId)));

// simulateBattle(
//   [getPlayer("Brk HH Template"), getPlayer("Tank Template"), getPlayer("Evader Template")],
//   [getPlayer("Brk Tank Template"), getPlayer("Evader Template"), getPlayer("Tank Template")]
// );
