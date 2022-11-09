import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import { ActionType } from "../state.js";
import Arena from "./Arena.js";
import Fighter from "./Fighter.js";
import Gears from "./Gears.js";
import Nexus from "./Nexus.js";
import NumberInput from "./NumberInput.js";
import Pet from "./Pet.js";
import Phylactery from "./Phylactery.js";
import Skills from "./Skills.js";
import StarAltar from "./StarAltar.js";
import TabLink from "./TabLink.js";
import TextInput from "./TextInput.js";
import Totem from "./Totem.js";

const tabs = [
  ["Fighter", "Pet", "Gear", "Phylactery", "Nexus"],
  ["Star Altar", "Totem", "Arena", "Skills"]
];

const Form = ({ state, dispatch }) => {
  const [activeTab, setActiveTab] = useState(tabs[0][0]);

  const createDispatch = type => payload => dispatch({ type, payload });

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
    <${Fighter} isActive=${activeTab === "Fighter"} fighter=${state.fighter} setFighter=${createDispatch(ActionType.fighter)} />
    <${Pet} isActive=${activeTab === "Pet"} pet=${state.pet} setPet=${createDispatch(ActionType.pet)} />
    <${Gears} isActive=${activeTab === "Gear"} fighterWeaponType=${CFDB.getFighter(state.fighter.name)?.weaponType || "None"} gears=${state.gears} setGears=${createDispatch(ActionType.gear)} />
    <${Phylactery} isActive=${activeTab === "Phylactery"} phylactery=${state.phylactery} setPhylactery=${createDispatch(ActionType.phy)} />
    <${Nexus} isActive=${activeTab === "Nexus"} nexus=${state.nexus} setNexus=${createDispatch(ActionType.nexus)} />
    <${StarAltar} isActive=${activeTab === "Star Altar"} altar=${state.altar} setAltar=${createDispatch(ActionType.altar)} />
    <${Totem} isActive=${activeTab === "Totem"} totem=${state.totem} setTotem=${createDispatch(ActionType.totem)} />
    <${Skills} isActive=${activeTab === "Skills"} skills=${state.skills} setSkills=${createDispatch(ActionType.skills)}
    expertise=${state.expertise} setExpertise=${createDispatch(ActionType.expertise)}
    resistance=${state.resistance} setResistance=${createDispatch(ActionType.resistance)} />
    <${Arena} isActive=${activeTab === "Arena"} arenaTitle=${state.arenaTitle} setArenaTitle=${createDispatch(ActionType.arena)} />
  </div>
  `;
}

export default Form;
