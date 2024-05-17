import { html, useState } from "../../lib/preact.standalone.module.js"
import CFDB from "../../data/CFDB.js";
import { ActionType } from "../../state.js";
import Arena from "./Arena.js";
import Fighter from "./Fighter.js";
import Gears from "./Gears.js";
import Nexus from "./Nexus.js";
import NumberInput from "../forms/NumberInput.js";
import Pet from "./Pet.js";
import Phylactery from "./Phylactery.js";
import Skills from "./Skills.js";
import StarAltar from "./StarAltar.js";
import Button from "../forms/Button.js";
import TextInput from "../forms/TextInput.js";
import Totem from "./Totem.js";
import BuildLoader from "../BuildLoader.js";
import Other from "./Other.js";

const tabs = [
  ["Fighter", "Pet", "Gear", "Phylactery", "Nexus"],
  ["Altar", "Totem", "Arena", "Skills", "Other"]
];

const Form = ({ state, dispatch, bg, setBg }) => {
  const [activeTab, setActiveTab] = useState(tabs[0][0]);

  const createDispatch = type => payload => dispatch({ type, payload });

  return html`
  <div class="col-md form pb-3">
    <${BuildLoader} build=${state} setBuild=${createDispatch(ActionType.import)} />
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
        <${NumberInput} id="player-level" value=${state.level} onInput=${e => dispatch({ type: ActionType.level, payload: e.target.value })} style=${{width: "5rem"}} />
      </div>
    </div>
    <div class="row">
      <div class="col">
        ${tabs.map(row => html`
        <div class="btn-group tab">
          ${row.map(tab => html`<${Button} key=${tab} isActive=${activeTab === tab} name=${tab} onClick=${() => setActiveTab(tab)}>${tab}</${Button}>`)}
        </div><br/>`)}
      </div>
    </div>
    ${activeTab === "Fighter" && html`<${Fighter} fighter=${state.fighter} setFighter=${createDispatch(ActionType.fighter)} />`}
    ${activeTab === "Pet" && html`<${Pet} pet=${state.pet} setPet=${createDispatch(ActionType.pet)} />`}
    ${activeTab === "Gear" && html`<${Gears} fighterWeaponType=${CFDB.getFighter(state.fighter.name)?.weaponType || "None"}
    gears=${state.gears} setGears=${createDispatch(ActionType.gear)} />`}
    ${activeTab === "Phylactery" && html`<${Phylactery} phylactery=${state.phylactery} setPhylactery=${createDispatch(ActionType.phy)} />`}
    ${activeTab === "Nexus" && html`<${Nexus} nexus=${state.nexus} setNexus=${createDispatch(ActionType.nexus)} />`}
    ${activeTab === "Altar" && html`<${StarAltar} altar=${state.altar} setAltar=${createDispatch(ActionType.altar)} />`}
    ${activeTab === "Totem" && html`<${Totem} totem=${state.totem} setTotem=${createDispatch(ActionType.totem)} />`}
    ${activeTab === "Arena" && html`<${Arena} arenaTitle=${state.arenaTitle} setArenaTitle=${createDispatch(ActionType.arena)} />`}
    ${activeTab === "Skills" && html`<${Skills} skills=${state.skills} setSkills=${createDispatch(ActionType.skills)}
    expertise=${state.expertise} setExpertise=${createDispatch(ActionType.expertise)}
    resistance=${state.resistance} setResistance=${createDispatch(ActionType.resistance)} />`}
    ${activeTab === "Other" && html`<${Other} state=${state} setState=${createDispatch(ActionType.import)} bg=${bg} setBg=${setBg} />`}
  </div>
  `;
}

export default Form;
