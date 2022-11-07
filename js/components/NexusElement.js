import { html } from "https://unpkg.com/htm/preact/standalone.module.js"
import CFDB from "../data/CFDB.js";
import NumberInput from "./NumberInput.js";
import SelectInput from "./SelectInput.js";

const NexusElement = ({ options, position, soul, setSoul }) => {
  const handleStatChange = e => setSoul({ stat: e.target.value, level: soul.level }, position);
  const handleLevelChange = e => setSoul({ stat: soul.stat, level: e.target.value }, position);
  return html`
  <div class="row">
    <div class="input-group">
      <${SelectInput} options=${options} value=${soul.stat} onChange=${handleStatChange} />
      <${NumberInput} value=${soul.level} onInput=${handleLevelChange} />
      <span class="input-group-text soul-stat-amount">${soul.stat === "None" ? "" : CFDB.calculateNexusStat(soul.stat, soul.level)}</span>
    </div>
  </div>
  `;
}

export default NexusElement;
