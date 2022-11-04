import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import { ActionType } from "../state.js";
import FighterTab from "./FighterTab.js";
import NumberInput from "./NumberInput.js";
import TabLink from "./TabLink.js";
import TextInput from "./TextInput.js";

const tabs = [
  ["Fighter", "Pet", "Gear", "Phylactery", "Nexus"],
  ["Star Altar", "Totem", "Arena", "Skills"]
];

const Form = ({ state, dispatch }) => {
  const [activeTab, setActiveTab] = useState(tabs[0][0]);

  return html`
  <div class="col-md form">
    <div class="row">
      <div class="col-auto">
        <label class="col-form-label" for="player-name">Name</label>
      </div>
      <div class="col">
        <${TextInput} id="player-name" value=${state.name} onInput=${e => dispatch({ type: ActionType.name, payload: e.target.value })} />
      </div>
      <div class="col-auto">
        <label class="col-form-label" for="player-level">Level</label>
      </div>
      <div class="col-auto">
        <${NumberInput} id="player-level" value=${state.level} onInput=${e => dispatch({ type: ActionType.level, payload: e.target.value })} width="5rem" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        ${tabs.map(row => html`
        <div class="btn-group tab">
          ${row.map(tab => html`<${TabLink} key=${tab} isActive=${activeTab === tab} name=${tab} onClick=${() => setActiveTab(tab)} />`)}
        </div>`)}
      </div>
    </div>
    <${FighterTab} isActive=${activeTab === "Fighter"} fighter=${state.fighter} setFighter=${fighter => dispatch({ type: ActionType.fighter, payload: fighter })} />
  </div>
  `;
}

export default Form;
