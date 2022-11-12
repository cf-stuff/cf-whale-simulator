import { html, useState, useMemo } from "https://unpkg.com/htm/preact/standalone.module.js"
import toPlayer from "../calculator.js";
import { getBuild, getBuildNames } from "../templates.js";
import { simulateBattle } from "../battle.js";
import Button from "./Button.js";
import SelectInput from "./SelectInput.js";
import { getSavedKeys, load } from "../storage.js";
import Display from "./Display.js";

const Battle = () => {
  const [left, setLeft] = useState("None");
  const [right, setRight] = useState("None");
  const [battle, setBattle] = useState();

  const options = getSavedKeys();
  options.push(...getBuildNames().filter(name => !options.includes(name)));

  const getPlayer = name => {
   const newBuild = load(name) || getBuild(name);
   return toPlayer(newBuild);
  }

  const leftPlayer = useMemo(() => left === "None" ? null : getPlayer(left), [left]);
  const rightPlayer = useMemo(() => right === "None" ? null : getPlayer(right), [right]);

  const handleBattle = () => {
    if (!leftPlayer || !rightPlayer) return;
    setBattle(simulateBattle([leftPlayer], [rightPlayer]));
  }

  return html`
  <div class="row pt-3">
    <div class="col">
      <${SelectInput} value=${left} options=${options} onChange=${e => setLeft(e.target.value)} />
    </div>
    <div class="col-auto">
      <${Button} onClick=${handleBattle}>VS</${Button}>
    </div>
    <div class="col">
      <${SelectInput} value=${right} options=${options} onChange=${e => setRight(e.target.value)} />
    </div>
  </div>
  <div class="row battle-display">
    <div class="col-md-4 order-2 order-md-1">
      ${leftPlayer && html`<${Display} player=${leftPlayer} />`}
    </div>
    <div class="col-md order-1 order-md-2 logs">
    ${battle && battle.map(line => html`<span>${line}</span>`)}
    </div>
    <div class="col-md-4 order-3 order-md-3">
      ${rightPlayer && html`<${Display} player=${rightPlayer} />`}
    </div>
  </div>
  `;
}

export default Battle;
