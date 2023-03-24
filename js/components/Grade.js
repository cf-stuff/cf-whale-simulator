import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import toPlayer from "../calculator.js";
import { getBuild, getBuildNames, getPlayer, getPlayerNames } from "../templates.js";
import { simulateBattle } from "../battle.js";
import Button from "./Button.js";
import SelectInput from "./SelectInput.js";
import { getSavedKeys, load } from "../storage.js";
import Display from "./Display.js";
import Carousel from "./Carousel.js";

const opponents = getPlayerNames().map(name => getPlayer(name));
console.log(opponents)

const Grade = () => {
  const [build, setBuild] = useState("None");

  const options = getSavedKeys();
  options.push(...getBuildNames().filter(name => !options.includes(name)));

  const buildToPlayer = name => {
    const newBuild = load(name) || getBuild(name);
    return toPlayer(newBuild);
  }

  const player = build !== "None" && buildToPlayer(build);

  return html`
  <div class="row grade-display pt-3 justify-content-between">
    <div class="col-sm-6 order-sm-1">
      <div class="row">
        <div class="col">
          <${SelectInput} value=${build} options=${options} onChange=${e => setBuild(e.target.value)} />
        </div>
        <div class="col-auto">
          <div class="row">
            <${Button} onClick=${() => alert("This is unfinished content you fool")}>Submit</${Button}>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-6 order-sm-3">
      <${Display} player=${player} />
    </div>
    <div class="col-sm-6 order-sm-2">
      <h2 class="text-center">Opponents</h2>
    </div>
    <div class="col-sm-6 col-xl-auto order-sm-4">
      <${Carousel} id="opponents" images=${opponents.map(player => html`<${Display} player=${player} />`)} />
    </div>
  </div>
  `;
}

export default Grade;
