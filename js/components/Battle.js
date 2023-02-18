import { html, useState, useMemo } from "https://unpkg.com/htm/preact/standalone.module.js"
import toPlayer from "../calculator.js";
import { getBuild, getBuildNames } from "../templates.js";
import { simulateBattle } from "../battle.js";
import Button from "./Button.js";
import SelectInput from "./SelectInput.js";
import { getSavedKeys, load } from "../storage.js";
import Display from "./Display.js";
import Carousel from "./Carousel.js";

const Battle = () => {
  const [left, setLeft] = useState(Array(4).fill("None"));
  const [right, setRight] = useState(Array(4).fill("None"));
  const [battle, setBattle] = useState();
  const [leftWins, setLeftWins] = useState(0);
  const [rightWins, setRightWins] = useState(0);

  const options = getSavedKeys();
  options.push(...getBuildNames().filter(name => !options.includes(name)));

  const getPlayer = name => {
    const newBuild = load(name) || getBuild(name);
    return toPlayer(newBuild);
  }

  const leftPlayers = left.filter(name => name !== "None").map(name => getPlayer(name));
  const rightPlayers = right.filter(name => name !== "None").map(name => getPlayer(name));

  const handleSelect = (side, position) => e => {
    if (side === "left") {
      left[position] = e.target.value;
      setLeft([...left]);
    } else {
      right[position] = e.target.value;
      setRight([...right]);
    }
    setLeftWins(0);
    setRightWins(0);
  }

  const handleBattle = rounds => {
    if (leftPlayers.length === 0 || rightPlayers.length === 0) return;
    let battleSim;
    for (let i = 0; i < rounds; ++i) {
      battleSim = simulateBattle(leftPlayers, rightPlayers);
      battleSim.winner === 0 ? setLeftWins(wins => wins + 1) : setRightWins(wins => wins + 1);
    }
    if (battleSim) setBattle(battleSim);
  }
  return html`
  <div class="row pt-3">
    <div class="col">
      ${left.map((name, i) => html`<${SelectInput} value=${name} options=${options} onChange=${handleSelect("left", i)} />`)}
    </div>
    <div class="col-auto">
      <${Button} onClick=${() => handleBattle(1)}>VS</${Button}>
    </div>
    <div class="col">
      ${right.map((name, i) => html`<${SelectInput} value=${name} options=${options} onChange=${handleSelect("right", i)} />`)}
    </div>
  </div>
  <div class="row battle-display">
    <div class="col-md-4 order-2 order-md-1">
      ${leftPlayers.length > 0 && html`<${Carousel} id="left-display" images=${leftPlayers.map(player => html`<${Display} player=${player} />`)} />`}
    </div>
    <div class="col-md order-1 order-md-2">
      <div class="row">
        <div class="col">
          <${Button} onClick=${() => handleBattle(100)}>VS 100</${Button}>
        </div>
        <div class="col-auto">
          <span class="text-center h2">${leftWins}-${rightWins}</span>
        </div>
        <div class="col">
        </div>
      </div>
      <div class="row">
        <div class="col logs">
        ${battle && battle.logs.map(line => html`<span>${line}</span>`)}
        </div>
      </div>
    </div>
    <div class="col-md-4 order-3 order-md-3">
      ${rightPlayers.length > 0 && html`<${Carousel} id="left-display" images=${rightPlayers.map(player => html`<${Display} player=${player} />`)} />`}
    </div>
  </div>
  <div class="row">
    <span>Note: Due to the nature of this game, it is impossible to 100% accurately depict certain behaviours 
    (for example crit chance and dodge chance). The best we can do is approximate them, so take the battle results with a grain a salt.</span>
    <span>In addition, there are certain interactions that haven't been implemented (either due to my laziness or lack of understanding of how they work),
    including but not limited to: Bomb bounce back; Strong Wine and Shield Wall Burst temporary stat decreases; Different level fighter skills depending on fighter level.</span>
  </div>
  `;
}

export default Battle;
