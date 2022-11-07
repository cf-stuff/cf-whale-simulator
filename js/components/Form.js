import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import { ActionType } from "../state.js";
import Fighter from "./Fighter.js";
import Nexus from "./Nexus.js";
import NumberInput from "./NumberInput.js";
import Pet from "./Pet.js";
import StarAltar from "./StarAltar.js";
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
        </div><br/>`)}
      </div>
    </div>
    <${Fighter} isActive=${activeTab === "Fighter"} fighter=${state.fighter} setFighter=${fighter => dispatch({ type: ActionType.fighter, payload: fighter })} />
    <${Pet} isActive=${activeTab === "Pet"} pet=${state.pet} setPet=${pet => dispatch({ type: ActionType.pet, payload: pet })} />
    <${Nexus} isActive=${activeTab === "Nexus"} nexus=${state.nexus} setNexus=${nexus => dispatch({ type: ActionType.nexus, payload: nexus })} />
    <${StarAltar} isActive=${activeTab === "Star Altar"} altar=${state.altar} setAltar=${altar => dispatch({ type: ActionType.altar, payload: altar })} />
  </div>
  `;
}

export default Form;
