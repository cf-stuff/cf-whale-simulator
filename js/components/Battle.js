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
  const [leftWins, setLeftWins] = useState(0);
  const [rightWins, setRightWins] = useState(0);

  const options = getSavedKeys();
  options.push(...getBuildNames().filter(name => !options.includes(name)));

  const getPlayer = name => {
    const newBuild = load(name) || getBuild(name);
    return toPlayer(newBuild);
  }

  const leftPlayer = useMemo(() => left === "None" ? null : getPlayer(left), [left]);
  const rightPlayer = useMemo(() => right === "None" ? null : getPlayer(right), [right]);

  const handleSelect = side => e => {
    side === "left" ? setLeft(e.target.value) : setRight(e.target.value);
    setLeftWins(0);
    setRightWins(0);
  }

  const handleBattle = rounds => {
    if (!leftPlayer || !rightPlayer) return;
    let battleSim;
    for (let i = 0; i < rounds; ++i) {
      battleSim = simulateBattle([leftPlayer], [rightPlayer]);
      battleSim.winner === 0 ? setLeftWins(wins => wins + 1) : setRightWins(wins => wins + 1);
    }
    if (battleSim) setBattle(battleSim);
  }

  return html`
  <div class="row pt-3">
    <div class="col">
      <${SelectInput} value=${left} options=${options} onChange=${handleSelect("left")} />
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => handleBattle(1)}>VS</${Button}>
    </div>
    <div class="col">
      <${SelectInput} value=${right} options=${options} onChange=${handleSelect("right")} />
    </div>
  </div>
  <div class="row battle-display">
    <div class="col-md-4 order-2 order-md-1">
      ${leftPlayer && html`<${Display} player=${leftPlayer} />`}
    </div>
    <div class="col-md order-1 order-md-2">
      <div class="row">
        <div class="col">
        </div>
        <div class="col-auto">
          <span class="text-center h2">${leftWins}-${rightWins}</span>
        </div>
        <div class="col">
          <${Button} onClick=${() => handleBattle(100)}>VS 100</${Button}>
        </div>
      </div>
      <div class="row">
        <div class="col logs">
        ${battle && battle.logs.map(line => html`<span>${line}</span>`)}
        </div>
      </div>
    </div>
    <div class="col-md-4 order-3 order-md-3">
      ${rightPlayer && html`<${Display} player=${rightPlayer} />`}
    </div>
  </div>
  `;
}

export default Battle;
