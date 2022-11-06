import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import EvolvedFighter from "./EvolvedFighter.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const FighterTab = ({ isActive, fighter, setFighter }) => {
  if (!isActive) return html``;

  const handleMax = () => setFighter({
    evolved: true,
    plus: 21,
    potentials: { str: 360, dex: 360, sta: 360 }
  });

  return html`
  <div class="row">
    <div class="col-auto">
      <button class="btn btn-outline-secondary" onClick=${handleMax}>Max</button>
    </div>
    <div class="col">
      <${SelectInput} value=${fighter.name} onChange=${e => setFighter({ name: e.target.value })}
      options=${CFDB.getFighters().map(x => x.name)} />
    </div>
    <div class="col-auto">
      <div class="input-group">
        <label class="input-group-text" for="fighter-plus">+</label>
        <${NumberInput} id="fighter-plus" value=${fighter.plus} width="4rem" onInput=${e => setFighter({ plus: e.target.value })} />
        <label class="input-group-text" for="fighter-evolved">Evolved</label>
        <div class="input-group-text">
          <input type="checkbox" id="fighter-evolved" checked=${fighter.evolved} onClick=${() => setFighter({ evolved: !fighter.evolved })} />
        </div>
      </div>
    </div>
  </div>
  <${EvolvedFighter} fighter=${fighter} setFighter=${setFighter} />
  `;
}

export default FighterTab;
