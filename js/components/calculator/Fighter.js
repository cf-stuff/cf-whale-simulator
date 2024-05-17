import { html } from "../../lib/preact.standalone.module.js"
import { calculateFighterStats } from "../../calculator.js";
import CFDB from "../../data/CFDB.js";
import Button from "../forms/Button.js";
import EvolvedFighter from "./EvolvedFighter.js";
import NumberInput from "../forms/NumberInput.js";
import SelectInput from "../forms/SelectInput.js";

const Fighter = ({ fighter, setFighter }) => {
  const handleMax = () => setFighter({
    evolved: true,
    plus: 21,
    potentials: { str: 360, dex: 360, sta: 360 }
  });
  const fighterInfo = CFDB.getFighter(fighter.name);
  const fighterStats = fighter.name === "None" ? { str: 0, dex: 0, sta: 0 }
    : calculateFighterStats(fighter.name, fighter.evolved ? 34 : fighter.plus);

  return html`
  <div class="row">
    <div class="col-auto">
      <${Button} onClick=${handleMax}>Max</${Button}>
    </div>
    <div class="col">
      <${SelectInput} value=${fighter.name} onChange=${e => setFighter({ name: e.target.value })}
      options=${CFDB.getFighters().map(x => x.name)} />
    </div>
    <div class="col-auto">
      <div class="input-group">
        <label class="input-group-text" for="fighter-plus">+</label>
        <${NumberInput} id="fighter-plus" value=${fighter.plus} style=${{width:"4rem"}} onInput=${e => setFighter({ plus: e.target.value })} />
        <label class="input-group-text" for="fighter-evolved">Evolved</label>
        <div class="input-group-text">
          <input type="checkbox" id="fighter-evolved" checked=${fighter.evolved} onClick=${() => setFighter({ evolved: !fighter.evolved })} />
        </div>
      </div>
    </div>
  </div>
  ${fighterInfo && html`
  <div class="row">
    <div class="col">
      <span>STR: ${fighterStats.str}</span><br/>
      <span>(+${fighterInfo.growthRate[0]} per level)</span><br/>
      <span>Each ${fighterInfo.bmv[0]} STR adds 1% ATK</span>
    </div>
    <div class="col">
      <span>DEX: ${fighterStats.dex}</span><br/>
      <span>(+${fighterInfo.growthRate[1]} per level)</span><br/>
      <span>Each ${fighterInfo.bmv[1]} DEX adds 1 SPD & 1 EVA</span>
    </div>
    <div class="col">
      <span>STA: ${fighterStats.sta}</span><br/>
      <span>(+${fighterInfo.growthRate[2]} per level)</span><br/>
      <span>Each ${fighterInfo.bmv[2]} STA adds 1% HP & 1 SP</span>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <span>Master of ${fighterInfo.mastery}<br/>${fighterInfo.mastery} Skill Trigger Chance +5%</span>
    </div>
  </div>
  `}
  <${EvolvedFighter} fighter=${fighter} setFighter=${setFighter} />
  `;
}

export default Fighter;
